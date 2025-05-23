import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = 
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }

      return null
    }

    if (!isAuth && req.nextUrl.pathname.startsWith("/admin")) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // 这是处理身份验证页面重定向的解决方案
        // 我们在这里返回 true，以便始终调用上面的中间件函数
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
}
