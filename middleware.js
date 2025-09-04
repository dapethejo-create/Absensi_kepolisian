import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();
  if (!token) {
    url.pathname = "/api/auth/signin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
