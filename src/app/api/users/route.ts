import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import hashPassword from "@/lib/hashPassword";

export async function POST(req: Request) {
    // const user = await getCurrentUser();

    try {

        const { name, email, password } = await req.json();

        const newPost = await prisma.user.create({
            data: {
                name, email, password: hashPassword(password), role:"user"
            }
        })
        return NextResponse.json({ newPost }, { status: 200 })

    } catch (_error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
    }
}