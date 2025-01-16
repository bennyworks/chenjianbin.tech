import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const typeId = searchParams.get('typeId')

  if (!typeId) {
    return new NextResponse('Missing typeId', { status: 400 })
  }

  const words = await db.word.findMany({
    where: {
      typeId: parseInt(typeId)
    },
    orderBy: {
      id: 'asc'
    }
  })

  return NextResponse.json(words)
}
