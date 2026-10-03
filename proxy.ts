import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const gated =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/account") ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/");
  if (gated && !req.auth) {
    const url = new URL("/signin", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout", "/checkout/:path*"],
};
