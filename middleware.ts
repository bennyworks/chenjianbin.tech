import { NextResponse } from 'next/server'
import authConfig from './auth.config'
import NextAuth from 'next-auth'

// 获取 auth 函数
const { auth } = NextAuth(authConfig)

// 使用类型断言绕过类型检查
// @ts-ignore - 忽略类型错误，允许在运行时正常工作
export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth
  const isAuthPage =
    nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')

  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return null
  }

  if (!isAuthenticated) {
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }

    return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
  }
})

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
