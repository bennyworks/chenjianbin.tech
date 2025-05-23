import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import Email from 'next-auth/providers/email'
import { env } from '@/env.mjs'
import { db } from '@/lib/db'

/**
 * NextAuth v5 配置
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Email({
      from: env.SMTP_FROM,
    }),
  ],
  callbacks: {
    // 处理会话信息
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    // 处理 JWT 令牌
    async jwt({ token, user }) {
      // 初次登录时，user 对象会包含用户信息
      if (user) {
        token.sub = user.id
        return token
      }

      // 后续请求中，从数据库获取最新的用户信息
      if (token.email) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email,
          },
        })

        if (dbUser) {
          token.sub = dbUser.id
          token.name = dbUser.name
          token.email = dbUser.email
          token.picture = dbUser.image
        }
      }

      return token
    },
  },
}
