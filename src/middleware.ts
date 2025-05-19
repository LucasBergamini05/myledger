import { NextRequest, NextResponse } from 'next/server';

import { getCurrentUser } from '@/utils/auth';

export const middleware = async (request: NextRequest) => {
  const isUserLogged = !!(await getCurrentUser());

  switch (request.nextUrl.pathname) {
    case '/':
      // If user is logged in, redirect to /home
      if (isUserLogged) return NextResponse.redirect(new URL('/home', request.url));

      // If user is not logged in, redirect to /login
      return NextResponse.redirect(new URL('/login', request.url));

    case '/login':
    case '/register':
      // If user is logged in, redirect to /home
      if (isUserLogged) return NextResponse.redirect(new URL('/home', request.url));

    default:
      // If user is not logged in, redirect to /login
      if (!isUserLogged) return NextResponse.redirect(new URL('/login', request.url));
  }
};
