import { Prisma } from '@prisma/client'

const orderWithItems = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: { items: true },
})

export type OrderWithItems = Prisma.OrderGetPayload<typeof orderWithItems>
