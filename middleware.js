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

    // Check if accessing the admin route without admin privileges
    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Handle CORS headers
    const resp = NextResponse.next();
    resp.headers.append("Access-Control-Allow-Credentials", "true");
    resp.headers.append("Access-Control-Allow-Origin", "*");
    resp.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
    resp.headers.append("Access-Control-Allow-Headers", "*");

    return resp;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if the token exists, otherwise false
        return !!token;
      },
    },
  }
);
