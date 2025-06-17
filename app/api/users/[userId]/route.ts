import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { userNameSchema } from '@/lib/validations/user'

import { auth } from '@/auth'

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // 参数已经通过路由系统验证

    // Ensure user is authentication and has access to this user.
    const session = await auth()
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    // Update the user.
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: payload.name,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
