import WordAnalysis from '@/components/word/word-analysis'
import { db } from '@/lib/db'

export const metadata = {
  title: '口语单词',
  description: '只要理解这1368个单词，你就能说一口流利的英语了。',
}

export const dynamic = 'force-static'

export default async function WordsPage() {
  const wordTypes = await db.wordType.findMany()

  const words = await db.word.findMany({ orderBy: { id: 'asc' } })

  return (
    <main className="min-h-screen bg-background">
      <WordAnalysis initialWordTypes={wordTypes} initialWords={words} />
    </main>
  )
}
