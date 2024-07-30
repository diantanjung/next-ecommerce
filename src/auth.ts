import NextAuth, { NextAuthConfig, User } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Resend from 'next-auth/providers/resend'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { compareSync } from 'bcrypt-ts-edge'

import prisma from './lib/db'
import { Env } from './lib/constants'

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
    session: async ({ session, user, trigger, token }: any) => {
        session.user.id = token.sub
        if (trigger === 'update') {
          session.user.name = user.name
        }
        return session
      },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
