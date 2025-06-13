import { NextRequest, NextResponse } from "next/server";
import { getPassword, getUsername } from "@/utils/get-env-server-side";
import { AUTH_COOKIE } from "@/utils/constants";
import jwt, { JwtPayload } from "jsonwebtoken";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const [username, password] = await Promise.all([getUsername(), getPassword()]);
  const loginEnabled = [username, password].every(value => value && value !== "none");

  const publicPaths = ["/login"];

  if (publicPaths.includes(pathname) || !loginEnabled) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  const decodedToken = jwt.decode(token) as JwtPayload | null;
  const isTokenExpired = decodedToken?.exp ? Math.floor(Date.now() / 1000) > decodedToken.exp : true;

  if (isTokenExpired) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
};

const redirectToLogin = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|assets|.*\\.svg$|.*\\.png$|.*\\.css$|.*\\.js$).*)"
  ]
};