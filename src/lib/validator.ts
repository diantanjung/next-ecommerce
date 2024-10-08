import * as z from 'zod'
import { formatNumberWithDecimal } from './utils'
import { Env } from './constants'

// USER
export const signInFormSchema = z.object({
  email: z.string().email().min(3, 'Email must be at least 3 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
})

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email().min(3, 'Email must be at least 3 characters'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    confirmPassword: z
      .string()
      .min(3, 'Confirm password must be at least 3 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.number().int().nonnegative('Quantity must be a non-negative number'),
  image: z.string().min(1, 'Image is required'),
  price: z.string().refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      'Price must have exactly two decimal places (e.g., 49.99)'
    ),
})

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  streetAddress: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'city must be at least 3 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  lat: z.string().optional().nullable(),
  lng: z.string().optional().nullable(),
})

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment method is required'),
  })
  .refine((data) => Env.PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
  })

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
})

export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  shippingPrice: z.string().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
    'Price must have exactly two decimal places (e.g., 49.99)'
  ),
  taxPrice: z.string().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
    'Price must have exactly two decimal places (e.g., 49.99)'
  ),
  totalPrice: z.string().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
    'Price must have exactly two decimal places (e.g., 49.99)'
  ),
  ispaid: z.boolean().optional(),
  paidAt: z.string().optional(),
  isdelivered: z.boolean().optional(),
  deliveredAt: z.string().optional(),
  shippingAddress: shippingAddressSchema,
  paymentResult: paymentResultSchema.optional(),
  paymentMethod: z.string(),
  itemsPrice: z.string().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
    'Price must have exactly two decimal places (e.g., 49.99)'
  ),
})

export const insertOrderItemSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  price: z.number().transform((val) => {
    return val.toString()
  }),
  qty: z.number(),
})
