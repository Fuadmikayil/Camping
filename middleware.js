// middleware.js
import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  try {
    await verifyJWT(token);
    return NextResponse.next();
  } catch {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/signin";
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/adminPanel"],
};
//adddadad