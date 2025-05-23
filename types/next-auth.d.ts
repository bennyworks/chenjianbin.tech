import type { DefaultSession } from "next-auth"

type UserId = string

declare module "next-auth" {
  /**
   * 扩展 Session 类型，添加用户 ID
   */
  interface Session {
    user: {
      id: UserId
    } & DefaultSession["user"]
  }

  /**
   * 扩展 User 类型，确保它有 ID 字段
   */
  interface User {
    id: UserId
  }
}
