export type MemberType = 'parent' | 'child'
export type LifeStage = 'adult' | 'elementary' | 'junior-high' | 'senior-high'

export interface FamilyMember {
  id: string
  name: string
  type: MemberType
  birthday: string // ISO date string
  lunarBirthday?: string
  lifeStage: LifeStage
}

export interface FamilyMemberFormData {
  name: string
  type: MemberType
  birthday: string
  lifeStage: LifeStage
}
