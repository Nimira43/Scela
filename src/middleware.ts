import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const token = request.cookies.get(`jwt_token`)?.value || ''

    const isPrivate = pathname.startsWith('/user') || pathname.startsWith('/admin')

    // If route is private, but there is no token, redirect to login page.

    if (isPrivate && !token) {
      return NextResponse.redirect(new URL('/?form-login', request.url))
    }

    // If route is public, but there is a token, redirect to particular dashboard
  
    const role = request.cookies.get('user_role')?.value || ''

    if (token && !isPrivate) {
      return NextResponse.redirect(
        new URL(`/${role}/dashboard`, request.url)
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/?form-login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}