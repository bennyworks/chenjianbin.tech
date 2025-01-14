export interface WordType {
  id: number
  name: string
  parentTypeId: number | null
  description?: string | null
  words?: Word[]
  createdAt: Date
  updatedAt: Date
}

export interface Word {
  id: number
  typeId: number
  word: string
  parseJson?: any
  relatedImage?: string | null
  wordType?: WordType
  createdAt: Date
  updatedAt: Date
}
