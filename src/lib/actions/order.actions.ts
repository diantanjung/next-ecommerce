'use server'

import { auth } from '@/auth'
import { getMyCart } from './cart.actions'
import { getUserById } from './user.actions'
import { redirect } from 'next/navigation'
import { insertOrderSchema } from '../validator'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { formatError } from '../utils'
import prisma from "../db"

// GET
export async function getOrderById(orderId: string) {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      items: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      }
    },
  })
}

// CREATE
export const createOrder = async () => {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')
    const cart = await getMyCart()
    const user = await getUserById(session?.user.id!)
    if (!cart || cart.items.length === 0) redirect('/cart')
    if (!user.shippingAddress) redirect('/shipping-address')
    if (!user.paymentMethod) redirect('/payment-method')

    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.shippingAddress,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    const insertedOrderId = await prisma.$transaction(async (prisma) => {
      const insertedOrder = await prisma.order.create({
        data: order,
        select: {
          id: true,
        },
      });
      for (const item of cart.items) {
        await prisma.orderItem.create({
          data: {
            ...item,
            price: Number(item.price).toFixed(2),
            orderId: insertedOrder.id,
          },
        });
      }
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: [],
          totalPrice: '0',
          shippingPrice: '0',
          taxPrice: '0',
          itemsPrice: '0',
        },
      });
    
      return insertedOrder.id;
    });
    if (!insertedOrderId) throw new Error('Order not created')
    redirect(`/order/${insertedOrderId}`)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: formatError(error) }
  }
}
