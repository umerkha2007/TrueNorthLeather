import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add the paths that should be protected
const protectedPaths = [
  '/account',
  '/checkout',
  '/orders',
  '/admin',
];

// Add the paths that should only be accessible to non-authenticated users
const authPaths = [
  '/auth/signin',
  '/auth/signup',
];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );

  // Check if the path is auth-only
  const isAuthPath = authPaths.some(authPath => 
    path.startsWith(authPath)
  );

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
} 