import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const events = await db.event.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        location: true,
        repeat: true,
        memberId: true,
        formData: true,
      },
    })

    return new Response(JSON.stringify(events))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
