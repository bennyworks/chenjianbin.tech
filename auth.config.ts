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
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig
