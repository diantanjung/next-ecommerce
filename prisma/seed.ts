import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

// type-guard
// narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html

const salt = process.env.SALT_ROUND;

function parseEnvToInt(key: keyof Environment) {
  const env = process.env[key];
  if (typeof env == "string") {
    return parseInt(env);
  }
  return 0;
}

async function main() {
  const password = "password";
  const salt_round = parseEnvToInt("SALT_ROUND");
  console.log("Salt: " + typeof salt_round);

  const salt = bcrypt.genSaltSync(salt_round);
  const admin = await prisma.user.upsert({
    where: { email: "admin@user.com" },
    update: {},
    create: {
      name: "admin",
      email: "admin@user.com",
      password: bcrypt.hashSync(password, salt),
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
