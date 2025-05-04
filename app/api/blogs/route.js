import { verifyJWT } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    // CHECK TOKEN
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ mes: "aut error" }, { status: 401 });
    }
    // is token real
    await verifyJWT(token);

    // create User model with body
    const { title, subtitle } = await request.json();
    const blogModel = await new Blog({
      title: title,
      subtitle: subtitle,
    });
    await blogModel.save();

    return NextResponse.json(
      { mes: "Blog added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "ERR_JWS_INVALID")
      return NextResponse.json({ mes: "aut error" }, { status: 401 });

    return NextResponse.json({ mes: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find();
    if (!blogs) {
      return NextResponse.json({ mes: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ mes: err.message }, { status: 500 });
  }
}
