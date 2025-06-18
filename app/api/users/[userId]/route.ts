import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { userNameSchema } from '@/lib/validations/user'

import { auth } from '@/auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const userId = (await params).userId

    // Ensure user is authentication and has access to this user.
    const session = await auth()
    if (!session?.user || userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    // Update the user.
    await prisma.user.update({
      where: {
        id: userId,
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
