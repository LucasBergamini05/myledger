import { NextRequest, NextResponse } from 'next/server';

import { getCurrentUser } from '@/utils/auth';

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname !== '/') return NextResponse.next();

  const isUserLogged = !!(await getCurrentUser());

  // Changes base URL to /app when user is logged in
  if (isUserLogged) return NextResponse.rewrite(new URL('/home', request.url));

  // Changes base URL to /login when user is not logged in
  return NextResponse.rewrite(new URL('/login', request.url));
};
