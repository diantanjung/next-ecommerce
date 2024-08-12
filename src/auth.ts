import NextAuth, { NextAuthConfig, User } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Resend from 'next-auth/providers/resend'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { compareSync } from 'bcrypt-ts-edge'

import prisma from './lib/db'
import { Env } from './lib/constants'
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null

        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        })

        if (
          dbUser &&
          compareSync(credentials.password as string, dbUser.password)
        ) {
          const { password, createdAt, ...dbUserWithoutPassword } = dbUser
          return dbUserWithoutPassword as User
        }

        return null
      },
    }),
    Resend({
        name: 'Email',
        from: `${Env.APP_NAME} <${Env.SENDER_EMAIL}>`,
        id: 'email',
      }),
    GoogleProvider({
      clientId: Env.GOOGLE_CLIENT_ID as string,
      clientSecret: Env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: Env.GITHUB_CLIENT_ID as string,
      clientSecret: Env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        if (trigger === 'signIn' || trigger === 'signUp') {
          const sessionCartId = cookies().get('sessionCartId')?.value
          if (!sessionCartId) throw new Error('Session Cart Not Found')
          const sessionCartExists = await prisma.cart.findFirst({
            where: { sessionCartId: sessionCartId },
          })
      
          if (sessionCartExists && !sessionCartExists.userId) {
            const userCartExists = await prisma.cart.findFirst({
              where: { userId: user.id },
            })
            
            if (userCartExists) {
              cookies().set('beforeSigninSessionCartId', sessionCartId)
              cookies().set('sessionCartId', userCartExists.sessionCartId)
            } else {
              prisma.cart.update({
                where: { id: sessionCartExists.id },
                data: { userId: user.id },
              })
            }
          }
        }
      }

      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    session: async ({ session, user, trigger, token }: any) => {
      session.user.id = token.sub
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false
      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()
        const newRequestHeaders = new Headers(request.headers)
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        })
        response.cookies.set('sessionCartId', sessionCartId)
        return response
      } else {
        return true
      }
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
