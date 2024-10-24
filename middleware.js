// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    // Handle CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Allow all origins, or replace '*' with a specific domain
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    };

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { headers: corsHeaders });
    }

    const response = NextResponse.next();

    // Add CORS headers to all responses
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Role-based redirection for /admin routes
    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
        return true; // Ensure the user is authorized
      },
    },
  }
);
