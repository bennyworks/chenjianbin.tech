'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { MemberFormData } from '@/types/family'
import { EventFormData } from '@/types/event'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function handleAddMember(data: MemberFormData) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  let family = await db.family.findFirst({
    where: {
      ownerId: user.id,
    },
  })

  if (!family) {
    family = await db.family.create({
      data: {
        ownerId: user.id,
        name: `${user.name || 'My'}'s Family`,
      },
    })
  }

  await db.member.create({
    data: {
      name: data.name,
      type: data.type,
      age: data.age,
      birthday: data.birthday,
      lifeStage: data.lifeStage,
      userId: user.id,
      familyId: family.id,
    },
  })

  revalidatePath('/dashboard/scheduler')
}

export async function handleEditMember(id: string, data: MemberFormData) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  await db.member.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      name: data.name,
      type: data.type,
      age: data.age,
      lifeStage: data.lifeStage,
    },
  })

  revalidatePath('/dashboard/scheduler')
}

export async function handleDeleteMember(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  await db.member.delete({
    where: {
      id: id,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard/scheduler')
}

export async function handleAddEvent(data: EventFormData) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  try {
    const newEvent = {
      title: data.title,
      startTime: new Date(`${data.startDate}T${data.startTime}`),
      endTime: new Date(`${data.endDate}T${data.endTime}`),
      location: data.location,
      repeat: data.repeat,
      memberId: data.memberId,
      formData: JSON.stringify(data),
      userId: user.id,
    }

    await db.event.create({
      data: newEvent,
    })
    revalidatePath('/dashboard/scheduler')
  } catch (error) {
    console.error('Failed to add event:', error)
  }
}

export async function handleEditEvent(id: string, data: EventFormData) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  try {
    const newEvent = {
      title: data.title,
      startTime: new Date(`${data.startDate}T${data.startTime}`),
      endTime: new Date(`${data.endDate}T${data.endTime}`),
      location: data.location,
      repeat: data.repeat,
      memberId: data.memberId,
      formData: JSON.stringify(data),
    }

    await db.event.update({
      where: { id: id },
      data: newEvent,
    })
    revalidatePath('/dashboard/scheduler')
  } catch (error) {
    console.error('Failed to edit event:', error)
  }
}

export async function handleDeleteEvent(id: string) {
  try {
    await db.event.delete({
      where: { id },
    })
    revalidatePath('/dashboard/scheduler')
  } catch (error) {
    console.error('Failed to delete event:', error)
  }
}
