
export const Env = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Sneakers',
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Next JS Sneakers Ecommerce',
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUND: process.env.SALT_ROUND,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
}

export const signInDefaultValues = {
  email: '',
  password: '',
}

  