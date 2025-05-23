import { NextResponse, type NextRequest } from "next/server"
import { auth } from "./auth"

export default async function middleware(req: NextRequest) {
  const session = await auth({ req })
  const isAuth = !!session
  const isAuthPage = 
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register")

  // 如果用户已经登录但访问登录页，重定向到管理页面
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  // 如果用户未登录但访问需要认证的页面，重定向到登录页
  if (!isAuth && req.nextUrl.pathname.startsWith("/admin")) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  // 其他情况下继续正常访问
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
}
