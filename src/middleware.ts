export { auth as middleware } from '@/auth'
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_next/assets|favicon.ico).*)'],
}

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export default function myMiddleware(_request: NextRequest) {
//     console.log("Run Middleware!");
    
//   // Your Middleware logic here
//   return NextResponse.next(); // Pass control to the next Middleware or route handler
// }


// export const config = { matcher: ["/product"] }