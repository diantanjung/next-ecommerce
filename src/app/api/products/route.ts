import prisma from "@/lib/db";
// import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({});

  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  // const user = await getCurrentUser();

  try {
    // if (!user?.email) {
    //   return NextResponse.json(
    //     { message: "Not Authenticated!" },
    //     { status: 401 }
    //   );
    // }

    const { name, description, category, price, stock, images, slug, banner, brand, isFeatured, rating } =
      await req.json();
    const newPost = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price,
        stock,
        images,
        slug,
        banner,
        brand,
        isFeatured,
        rating
      },
    });
    return NextResponse.json({ newPost }, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
