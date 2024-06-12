import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import hashPassword from "@/lib/hashPassword";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    try {

        const { name, email, password } = await req.json();

        const newPost = await prisma.user.create({
            data: {
                name, email, password: hashPassword(password)
            }
        })
        return NextResponse.json({ newPost }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
    }
}