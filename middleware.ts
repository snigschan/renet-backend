import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const startTime = Date.now()

  // Add performance headers
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  // Add cache control for static assets
  if (request.nextUrl.pathname.startsWith("/images") || request.nextUrl.pathname.startsWith("/_next/static")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Log request duration
  const duration = Date.now() - startTime
  console.log(`[v0] ${request.method} ${request.nextUrl.pathname} - ${duration}ms`)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
