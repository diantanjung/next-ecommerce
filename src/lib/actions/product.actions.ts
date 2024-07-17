import prisma from "../db";

export async function getLatestProducts() {
    const products = await prisma.product.findMany({});
    return products;
}