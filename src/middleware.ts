import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// RBAC configuration - define which roles can access which routes
const ROLE_BASED_ROUTES: Record<string, string[]> = {
  '/dashboard/analytics': ['admin', 'manager'],
  '/dashboard/team-management': ['admin'],
  '/dashboard/settings/team': ['admin', 'manager'],
  '/api/team/': ['admin', 'manager'],
  '/api/analytics/': ['admin', 'manager'],
  '/api/export/': ['admin', 'manager'],
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Get security headers response
  const response = NextResponse.next()

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  )

  // CSP (Content Security Policy)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  )

  // RBAC check for protected routes
  const token = await getToken({ req: request })
  
  // Check if route requires specific roles
  for (const [route, requiredRoles] of Object.entries(ROLE_BASED_ROUTES)) {
    if (pathname.startsWith(route)) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }

      const userRole = token.role as string
      if (!requiredRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
