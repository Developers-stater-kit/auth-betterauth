import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";  // fix acc to you auth dir

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route

  if (!session && pathname !== '/login' && pathname !== '/signup' && pathname !== '/') {
    return NextResponse.redirect(
      new URL(`/login?next=${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

// The matcher defines which routes the middleware will run on.
// This is an optimized way to protect specific paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - public (public folder)
     * - And your public pages like /, /login, /signup
     */
    '/((?!_next/static|_next/image|favicon.ico|api|public|login|signup|forgotpassword|reset-password).*)',
  ],
}