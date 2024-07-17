import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function myMiddleware(_request: NextRequest) {
    console.log("Run Middleware!");
    
  // Your Middleware logic here
  return NextResponse.next(); // Pass control to the next Middleware or route handler
}


export const config = { matcher: ["/product"] }

// import { withAuth } from "next-auth/middleware"

// export default withAuth({
//   pages: {
//     signIn: "/",
//     error: "/error",
//   },
// })