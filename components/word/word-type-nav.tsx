import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WordType } from '@/types/word'

interface WordTypeNavProps {
  wordTypes: WordType[]
  onSelectType: (typeId: number) => void
}

export function WordTypeNav({ wordTypes, onSelectType }: WordTypeNavProps) {
  const level1Types = React.useMemo(() => {
    return wordTypes.filter((type) => !type.parentTypeId)
  }, [wordTypes])

  const [level1, setLevel1] = React.useState(() => level1Types[0]?.id || 0)
  const [level2, setLevel2] = React.useState<number | null>(null)
  const [level3, setLevel3] = React.useState<number | null>(null)

  const level2Types = React.useMemo(() => {
    return wordTypes.filter((type) => type.parentTypeId === level1)
  }, [wordTypes, level1])

  const level3Types = React.useMemo(() => {
    return wordTypes.filter((type) => type.parentTypeId === level2)
  }, [wordTypes, level2])

  const handleLevel1Change = (value: string) => {
    const newLevel1 = Number(value)
    setLevel1(newLevel1)
    setLevel2(null)
    setLevel3(null)
  }

  const handleLevel2Change = (value: string) => {
    const newLevel2 = Number(value)
    setLevel2(newLevel2)
    setLevel3(null)
  }

  const handleLevel3Change = (value: string) => {
    const newLevel3 = Number(value)
    setLevel3(newLevel3)
    onSelectType(newLevel3)
  }

  React.useEffect(() => {
    if (level1Types.length > 0) {
      const defaultLevel2 = level2Types[0]?.id || null
      setLevel2(defaultLevel2)

      if (defaultLevel2) {
        const defaultLevel3 =
          wordTypes.find((type) => type.parentTypeId === defaultLevel2)?.id || null
        setLevel3(defaultLevel3)
        if (defaultLevel3) onSelectType(defaultLevel3)
      }
    }
  }, [level1Types, level2Types, wordTypes, onSelectType])

  return (
    <div className="flex space-x-2 mb-6">
      <Select onValueChange={handleLevel1Change} value={level1.toString()}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="名词家族" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {level1Types.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={handleLevel2Change}
        value={level2?.toString() || ''}
        disabled={!level1}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择二级分类" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {level2Types.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={handleLevel3Change}
        value={level3?.toString() || ''}
        disabled={!level2}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择三级分类" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {level3Types.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
