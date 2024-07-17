import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

type Params = {
    params: {
        id: string;
    }
};

export async function GET(_request: NextRequest, { params } : Params) {

    console.log(params.id);

  const products = await prisma.product.findUnique({ where:  { id: params.id }});

  return NextResponse.json({ message: products });
}
