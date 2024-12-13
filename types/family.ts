export type MemberType = 'Parent' | 'Child'
export type LifeStage = 'PrimaryStudent' | 'JuniorStudent' | 'SeniorStudent' | 'Parent'

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
  age?: number
}
