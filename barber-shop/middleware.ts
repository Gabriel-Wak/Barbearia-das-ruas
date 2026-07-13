import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret"
);

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("barber-shop-token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
