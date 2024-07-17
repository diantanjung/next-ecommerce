import { NextAuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

import prisma from "./db";
import { Env } from "./constants";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (dbUser && bcrypt.compareSync(credentials.password, dbUser.password)) {
          const { password, createdAt, ...dbUserWithoutPassword } = dbUser;
          return dbUserWithoutPassword as User;
        }

        return null;
      },
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
};
