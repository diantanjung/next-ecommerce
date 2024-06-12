import hashPassword from "@/lib/hashPassword";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const password = "password";
  const admin = await prisma.user.upsert({
    where: { email: "admin@user.com" },
    update: {},
    create: {
      name: "admin",
      email: "admin@user.com",
      password: hashPassword(password),
    },
  });
  console.log({ admin });

  const macbook = await prisma.product.create({
    data: {
      name: "Macbook Pro",
      description: "Macbook Pro",
      category: "Laptop",
      price: 20000000,
      stock: 100,
    },
  });

  console.log({ macbook });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/**
 * deleting records on database
 */
// (async () => {
//   await Promise.all([
//     prisma.user.deleteMany({}),
//     prisma.product.deleteMany({}),
//   ]);
// })();
