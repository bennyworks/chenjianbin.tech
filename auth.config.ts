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
    signOut: '/', // 添加登出页面配置
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
        callbackUrl: {
          name: `next-auth.callback-url`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
            domain: '.chenjianbin.tech'
          }
        },
        csrfToken: {
          name: `next-auth.csrf-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
            domain: '.chenjianbin.tech'
          }
        },
        pkceCodeVerifier: {
          name: `next-auth.pkce.code_verifier`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
            domain: '.chenjianbin.tech'
          }
        },
        state: {
          name: `next-auth.state`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
            domain: '.chenjianbin.tech'
          }
        },
        nonce: {
          name: `next-auth.nonce`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: true,
            domain: '.chenjianbin.tech'
          }
        }
      }
    : {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false,
            //domain: '.p.local'
          }
        },
        callbackUrl: {
          name: `next-auth.callback-url`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false,
            //domain: '.p.local'
          }
        },
        csrfToken: {
          name: `next-auth.csrf-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false,
            //domain: '.p.local'
          }
        },
        pkceCodeVerifier: {
          name: `next-auth.pkce.code_verifier`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false,
            //domain: '.p.local'
          }
        },
        state: {
          name: `next-auth.state`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false,
            //domain: '.p.local'
          }
        },
        nonce: {
          name: `next-auth.nonce`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: false,
            //domain: '.p.local'
          }
        }
      },
} satisfies NextAuthConfig
