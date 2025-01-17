'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Volume2, BookOpen, FileQuestion } from 'lucide-react'
import { WordTypeNav } from '@/components/word/word-type-nav'
import { WordButtonList } from '@/components/word/word-button-list'
import { Word, WordType } from '@/types/word'
import { useState, useEffect, useCallback } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface WordAnalysisProps {
  initialWordTypes: WordType[]
}

export default function WordAnalysis({ initialWordTypes }: WordAnalysisProps) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [currentWords, setCurrentWords] = useState<Word[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleTypeSelect = useCallback(async (typeId: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/words?typeId=${typeId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch words')
      }
      const words = await response.json()
      setCurrentWords(words)
      setSelectedWord(null)
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const firstLevel3Type = initialWordTypes.find(
      (type) =>
        type.parentTypeId && initialWordTypes.find((t) => t.id === type.parentTypeId)?.parentTypeId
    )
    if (firstLevel3Type) {
      handleTypeSelect(firstLevel3Type.id)
    }
  }, [initialWordTypes, handleTypeSelect])

  const handleWordSelect = useCallback((word: Word) => {
    setSelectedWord(word)
  }, [])

  // 辅助函数：处理分析文本中的目标词
  const highlightTargetWord = (text: string, targetWord: string) => {
    if (!text || !targetWord) return text

    const regex = new RegExp(targetWord, 'gi')
    return text.split(regex).reduce(
      (prev, current, i, arr) => {
        if (i === arr.length - 1) return [...prev, current]
        return [
          ...prev,
          current,
          <span key={i} className="font-serif font-bold text-red-500">
            {targetWord.toLowerCase()}
          </span>,
        ]
      },
      [] as (string | JSX.Element)[]
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <WordTypeNav wordTypes={initialWordTypes} onSelectType={handleTypeSelect} />
        <div className="space-y-3">
          <Skeleton className="h-[40px] w-full" />
          <div>
            <Skeleton className="w-full min-h-[360px] h-[calc(100vh-360px)]" />
          </div>
        </div>
      </div>
    )
  }

  if (currentWords.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1200px]">
        <WordTypeNav wordTypes={initialWordTypes} onSelectType={handleTypeSelect} />
        <div className="text-center py-12">
          <FileQuestion className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <div>该分类下暂无单词</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <WordTypeNav wordTypes={initialWordTypes} onSelectType={handleTypeSelect} />

      <WordButtonList words={currentWords} onSelectWord={handleWordSelect} />

      {!selectedWord ? (
        <div className="h-[calc(100vh-400px)] flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">请选择一个单词查看详细信息</p>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold font-serif tracking-wide mb-4">
              {selectedWord.word}
            </CardTitle>
            <div className="flex justify-center space-x-4 text-base">
              <div className="flex items-center font-serif">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 px-2 mr-2"
                  onClick={() => {
                    const audio = new Audio(
                      `https://dict.youdao.com/dictvoice?type=1&audio=${selectedWord.word}`
                    )
                    audio.play()
                  }}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                UK: {selectedWord.parseJson?.pronunciation?.uk || 'N/A'}
              </div>
              <div className="flex items-center font-serif">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 px-2 mr-2"
                  onClick={() => {
                    const audio = new Audio(
                      `https://dict.youdao.com/dictvoice?type=2&audio=${selectedWord.word}`
                    )
                    audio.play()
                  }}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                US: {selectedWord.parseJson?.pronunciation?.us || 'N/A'}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-[1fr,400px] gap-8">
              {/* Left Column - Word Analysis */}
              <div className="space-y-6">
                <section>
                  <h4 className="text-md font-semibold mb-3">分析词义</h4>
                  <p className="text-base leading-relaxed">
                    {highlightTargetWord(selectedWord.parseJson?.analysis, selectedWord.word)}
                  </p>
                </section>

                <section>
                  <h4 className="text-md font-semibold mb-3">词根分析</h4>
                  <p className="mb-2">
                    <span className="font-medium text-gray-500">词根：</span>
                    <span className="font-medium font-serif">
                      {selectedWord.parseJson?.root_analysis?.root || 'N/A'}
                    </span>
                  </p>
                  <p className="font-medium mb-2 text-gray-500">衍生词：</p>
                  <div className="flex flex-wrap gap-4">
                    {selectedWord.parseJson?.root_analysis?.derived_words?.map(
                      (word: any, index: number) => (
                        <div key={index} className="text-center">
                          <Badge variant="secondary" className="text-base mb-1 font-serif">
                            {word.word}
                          </Badge>
                          <p className="text-sm text-gray-500">{word.translation}</p>
                        </div>
                      )
                    ) || <p>No derived words available</p>}
                  </div>
                </section>

                <section>
                  <h4 className="text-md font-semibold mb-3">词缀分析</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-gray-500">前缀：</span>
                      <span className="font-medium font-serif">
                        {selectedWord.parseJson?.affix_analysis?.prefix || 'N/A'}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">后缀：</span>
                      <span className="font-medium font-serif">
                        {selectedWord.parseJson?.affix_analysis?.suffix || 'N/A'}
                      </span>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium mb-2 text-gray-500">相关词：</p>
                    <div className="flex flex-wrap gap-4">
                      {selectedWord.parseJson?.affix_analysis?.similar_words?.map(
                        (word: any, index: number) => (
                          <div key={index} className="text-center">
                            <Badge variant="secondary" className="text-base mb-1 font-serif">
                              {word.word}
                            </Badge>
                            <p className="text-sm text-gray-500">{word.translation}</p>
                          </div>
                        )
                      ) || <p>No similar words available</p>}
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-md font-semibold mb-3">单词变形</h4>
                  <div className="space-y-2">
                    {selectedWord.parseJson?.word_forms?.noun?.word && (
                      <div>
                        <p>
                          <span className="font-medium text-gray-500">名词：</span>
                          <span className="font-medium font-serif">
                            {selectedWord.parseJson.word_forms.noun.word}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 ml-12">
                          {selectedWord.parseJson.word_forms.noun.translation}
                        </p>
                      </div>
                    )}
                    {selectedWord.parseJson?.word_forms?.plural?.word && (
                      <div>
                        <p>
                          <span className="font-medium text-gray-500">复数：</span>
                          <span className="font-medium font-serif">
                            {selectedWord.parseJson.word_forms.plural.word}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 ml-12">
                          {selectedWord.parseJson.word_forms.plural.translation}
                        </p>
                      </div>
                    )}
                    {selectedWord.parseJson?.word_forms?.adjective?.word && (
                      <div>
                        <p>
                          <span className="font-medium text-gray-500">形容词：</span>
                          <span className="font-medium font-serif">
                            {selectedWord.parseJson.word_forms.adjective.word}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 ml-12">
                          {selectedWord.parseJson.word_forms.adjective.translation}
                        </p>
                      </div>
                    )}
                    {selectedWord.parseJson?.word_forms?.adverb?.word && (
                      <div>
                        <p>
                          <span className="font-medium text-gray-500">副词：</span>
                          <span className="font-medium font-serif">
                            {selectedWord.parseJson.word_forms.adverb.word}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 ml-12">
                          {selectedWord.parseJson.word_forms.adverb.translation}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="font-medium mb-2 text-gray-500">常见短语：</p>
                    <div className="space-y-2 font-serif">
                      {selectedWord.parseJson?.word_forms?.phrases?.map(
                        (phrase: any, index: number) => (
                          <Card key={index} className="shadow-none border-none bg-muted">
                            <CardContent className="p-3">
                              <p>
                                {phrase.phrase.split(/\*\*(.*?)\*\*/).map((part: any, i: number) =>
                                  i % 2 === 0 ? (
                                    part
                                  ) : (
                                    <strong className="text-red-500" key={i}>
                                      {part}
                                    </strong>
                                  )
                                )}
                              </p>
                              <p className="text-sm text-gray-500">{phrase.translation}</p>
                            </CardContent>
                          </Card>
                        )
                      ) || <p>No common phrases available</p>}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Examples */}
              <div>
                <h4 className="text-md font-semibold mb-3">列举例句</h4>
                <div className="space-y-4">
                  {selectedWord.parseJson?.examples?.map((example: any, index: number) => (
                    <Card key={index}>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base font-semibold">{example.context}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="font-serif">
                          {example.sentence.split(/\*\*(.*?)\*\*/).map((part: any, i: number) =>
                            i % 2 === 0 ? (
                              part
                            ) : (
                              <strong className="text-red-500" key={i}>
                                {part}
                              </strong>
                            )
                          )}
                        </p>
                        <p className="text-gray-500">{example.translation}</p>
                      </CardContent>
                    </Card>
                  )) || 'No examples available.'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
