export type MemberType = 'Parent' | 'Child'
export type LifeStage = 'PrimaryStudent' | 'JuniorStudent' | 'SeniorStudent' | 'Parent'

export interface Member {
  id: string
  name: string
  type: MemberType
  birthday: string // ISO date string
  lunarBirthday?: string
  lifeStage: LifeStage
}

export interface MemberFormData {
  name: string
  type: MemberType
  birthday: string
  lifeStage: LifeStage
  age?: number
}
