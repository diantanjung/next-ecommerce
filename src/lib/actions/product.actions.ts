import prisma from '../db'

export async function getLatestProducts() {
  const products = await prisma.product.findMany({})
  return products
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  })
}
