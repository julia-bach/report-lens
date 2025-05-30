import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE, TOKEN_DURATION } from "@/utils/constants";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function POST(request: Request) {
  const { username, password, rememberUser } = await request.json();

  if (
    username === process.env.APP_USERNAME &&
    password === process.env.APP_PASSWORD
  ) {
    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: rememberUser ? "30d" : "1h"
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberUser ? TOKEN_DURATION.LONG : TOKEN_DURATION.SHORT
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
