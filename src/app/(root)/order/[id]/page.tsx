import { getOrderById } from '@/lib/actions/order.actions'
import { notFound } from 'next/navigation'
import OrderDetailsForm from './order-details-form'
import { Env } from "@/lib/constants"

export const metadata = {
  title: `Order Details - ${Env.APP_NAME}`,
}

const OrderDetailsPage = async ({
  params: { id },
}: {
  params: {
    id: string
  }
}) => {
  const order = await getOrderById(id)
  if (!order) notFound()
  order.user
  return <OrderDetailsForm order={order} />
}

export default OrderDetailsPage
