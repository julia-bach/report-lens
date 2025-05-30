import { NextRequest, NextResponse } from "next/server";
import { getPassword, getUsername } from "@/utils/get-env-server-side";
import { AUTH_COOKIE } from "@/utils/constants";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const username = await getUsername();
  const password = await getPassword();
  const loginEnabled = username || password || username !== "none" || password !== "none";

  const publicPaths = ["/login"];

  if (publicPaths.includes(pathname) || !loginEnabled) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE);
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|assets|.*\\.svg$|.*\\.png$|.*\\.css$|.*\\.js$).*)"
  ]
};