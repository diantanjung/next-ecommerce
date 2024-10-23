import  { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  export interface User {
    password: string
  }
  export interface Session {
    user: {
      role: string
    } & DefaultSession['user']
  }
}

