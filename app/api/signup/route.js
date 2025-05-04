import { connectDB } from "@/lib/db";
import  Admin  from "@/lib/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    try {
        await connectDB()

        // take body
        const body = await request.json()

        // hash user password
        const currentPassword = body.password
        const salt = await bcrypt.genSalt(14)
        const hashedPassword = await bcrypt.hash(currentPassword,salt)


        // create User model with body
        const adminModel = await new Admin({
            username: body.username,
            password: hashedPassword
        })

        await adminModel.save()

        return NextResponse.json({ mes: "Admin added successfully!" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ mes: error.message }, { status: 500 });
    }
}