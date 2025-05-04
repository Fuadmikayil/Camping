import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { createJWT } from "@/lib/auth";

export async function POST(request) {
    try {
        await connectDB()

        const body = await request.json()
        const { username, password } = body

        if (!username || !password)
            return NextResponse.json({ mes: "username or password is empty" }, { status: 400 })

        // find user by username
        const adminData = await Admin.findOne({ username: username })
        if (!adminData)
            return NextResponse.json({ mes: "username or password is wrong" }, { status: 400 })

        const checkPasword = await bcrypt.compare(password, adminData.password)
        if (!checkPasword)
            return NextResponse.json({ mes: "username or password is wrong" }, { status: 400 })

        const token = await createJWT({ _id: adminData._id.toString() });

        return new Response(JSON.stringify({ mes: "Welcome" }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
            },
          });
    } catch (error) {
        return NextResponse.json({ mes: error.message }, { status: 500 });
    }
}