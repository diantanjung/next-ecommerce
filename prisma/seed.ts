import sampleData from "../src/lib/sample-data"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.createMany({
    data: sampleData.users,
  })
  console.log({ admin })

  const macbook = await prisma.product.createMany({
    data: sampleData.products
  })

  console.log({ macbook })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/**
 * deleting records on database
 */
// (async () => {
//   await Promise.all([
//     prisma.user.deleteMany({}),
//     prisma.product.deleteMany({}),
//   ]);
// })();
