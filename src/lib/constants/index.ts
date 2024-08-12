let salt_round = 0
if (typeof process.env.SALT_ROUND == 'string') {
  salt_round = parseInt(process.env.SALT_ROUND)
}

export const Env = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Sneakers',
  APP_DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Next JS Sneakers Ecommerce',
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUND: salt_round,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  PAYMENT_METHODS: process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(', ') : ['PayPal', 'Stripe', 'CashOnDelivery'],
  DEFAULT_PAYMENT_METHOD: process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'
}

export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
}
