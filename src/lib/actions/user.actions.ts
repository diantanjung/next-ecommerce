'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'

import { auth, signIn, signOut } from '@/auth'
import { paymentMethodSchema, shippingAddressSchema, signInFormSchema, signUpFormSchema } from '../validator'
import { hashSync } from "bcrypt-ts-edge"
import prisma from "../db"
import { formatError } from "../utils"
import { Env } from "../constants"
import { revalidatePath } from "next/cache"
import { ShippingAddress } from "@prisma/client"
import { z } from "zod"

export async function signInWithCredentials(
  _prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    await signIn('credentials', user)
    return { success: true, message: 'Sign in successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: 'Invalid email or password' }
  }
}

export const SignOut = async () => {
  await signOut()
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })
  if (!user) throw new Error('User not found')
  return user
}

export async function signUp(_prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    })
    const { confirmPassword, ...userWithoutConfirmPassword } = user;
    const values = {
      ...userWithoutConfirmPassword,
      password: hashSync(user.password, Env.SALT_ROUND),
    }
    await prisma.user.create({ data: values})
    await signIn('credentials', {
      email: user.email,
      password: user.password,
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return {
      success: false,
      message: formatError(error).includes(
        'duplicate key value violates unique constraint "user_email_idx"'
      )
        ? 'Email is already exist'
        : formatError(error),
    }
  }
}


export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user.id,
      },
    })
  
    if (!currentUser) throw new Error('User not found')

    const address = shippingAddressSchema.parse(data)
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        shippingAddress: address,
      },
    })
    
    revalidatePath('/place-order')
    return {
      success: true,
      message: 'User updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user.id,
      },
    })
    
    if (!currentUser) throw new Error('User not found')
    const paymentMethod = paymentMethodSchema.parse(data)
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        paymentMethod: paymentMethod.type,
      },
    })
    revalidatePath('/place-order')
    return {
      success: true,
      message: 'User updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}