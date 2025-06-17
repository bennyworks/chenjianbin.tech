import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // 重定向到登录页面
      }

      if (isLoggedIn) {
        return true
      }
      return true
    },
    // 添加session回调以确保子域名可以访问会话信息
    session({ session, token }) {
      if (token && session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    // 添加JWT回调以确保令牌包含必要信息
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  // 配置cookies以允许在父域名及其子域名之间共享
  cookies: process.env.NODE_ENV === 'production' 
    ? {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
            domain: '.chenjianbin.tech'
          }
        },
      }
    : {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false
            // 开发环境不设置domain
          }
        },
      },
} satisfies NextAuthConfig
