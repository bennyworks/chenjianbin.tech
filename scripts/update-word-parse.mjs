import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// Load environment variables from .env and .env.local
dotenv.config({ path: path.join(rootDir, '.env') })
dotenv.config({ path: path.join(rootDir, '.env.local') })

const prisma = new PrismaClient()

async function queryDeepseekAPI(word) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is not set in environment variables')
  }

  const prompt = `
  # 角色

你是一名中英文双语教育专家，拥有帮助将中文视为母语的用户理解和记忆英语单词的专长，请根据提供的英语单词 ${word} 完成下列任务。

## 任务

### 分析词义

- 系统地分析用户提供的英文单词的各种词义，并以简单易懂的方式解答；

### 列举例句

- 根据所需，为该单词列出全部词义场景下的使用方法和例句，对应的单词高亮显示。并且附上中文翻译，以帮助用户更深入地理解单词意义。

### 词根分析

- 分析并展示单词的词根；
- 列出由词根衍生出来的其他单词，词根部分高亮显示；

### 词缀分析

- 分析并展示单词的词缀，例如：单词 individual，前缀 in- 表示否定，-divid- 是词根，-u- 是中缀，用于连接和辅助发音，-al 是后缀，表示形容词；
- 列出相同词缀的的其他单词，词缀部分高亮显示；
- 如果没有词缀，则显示“无”


### 单词变形

- 列出单词对应的名词、单复数、动词、不同时态、形容词、副词等的变形以及对应的中文翻译。
- 列出单词对应的固定搭配、组词以及对应的中文翻译。


以下是返回格式示例，内容上如果有双引号，注意进行反义处理：

{
  "word": "agent",
  "pronunciation": {
    "uk": "/ˈeɪ.dʒənt/",
    "us": "/ˈeɪ.dʒənt/"
  },
  "meaning": "代理人；中介；特工；作用物",
  "analysis": "Agent是一个英文名词，意为“代理人”或“中介”。它可以指代表某人或某个组织行事的人或机构，例如商业中的销售代理或房地产代理。此外，它还可以指“特工”（如秘密特工）或“作用物”（如化学试剂）。",
  "examples": [
    {
      "context": "中介",
      "sentence": "The real estate **agent** helped us find a beautiful house.",
      "translation": "房地产代理帮助我们找到了一所漂亮的房子。"
    },
    {
      "context": "作用物",
      "sentence": "The chemical **agent** was used to clean the laboratory equipment.",
      "translation": "这种化学试剂被用来清洁实验室设备。"
    },
    {
      "context": "特工",
      "sentence": "The secret **agent** worked undercover to gather information.",
      "translation": "特工秘密潜伏以收集信息。"
    }
  ],
  "root_analysis": {
    "root": "-ag-",
    "derived_words": [
      {
        "word": "agency",
        "translation": "代理机构"
      },
      {
        "word": "agentive",
        "translation": "代理的"
      },
      {
        "word": "agenda",
        "translation": "议程"
      }
    ]
  },
  "affix_analysis": {
    "prefix": "无",
    "root": "-ag-",
    "suffix": "-ent",
    "similar_words": [
      {
        "word": "agency",
        "translation": "代理机构"
      },
      {
        "word": "agentive",
        "translation": "代理的"
      },
      {
        "word": "agenda",
        "translation": "议程"
      }
    ]
  },
  "word_forms": {
    "noun": {
      "word": "agent",
      "translation": "代理人；特工；作用物"
    },
    "plural": {
      "word": "agents",
      "translation": "代理人；特工；作用物"
    },
    "adjective": {
      "word": "agentive",
      "translation": "代理的"
    },
    "phrases": [
      {
        "phrase": "secret **agent**",
        "translation": "特工"
      },
      {
        "phrase": "travel **agent**",
        "translation": "旅行社"
      },
      {
        "phrase": "cleaning **agent**",
        "translation": "清洁剂"
      }
    ]
  }
}
  `

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error querying Deepseek API for word "${word}":`, error)
    return null
  }
}

async function main() {
  // Find all words where parseJson is null
  const words = await prisma.word.findMany({
    where: {
      parseJson: {
        is: undefined,
      },
    },
  })

  console.log(`Found ${words.length} words with null parseJson`)

  for (const row of words) {
    try {
      console.log(`Processing word: ${row.word}`)

      const parseResult = await queryDeepseekAPI(row.word)

      if (parseResult) {
        await prisma.word.update({
          where: { id: row.id },
          data: {
            parseJson: parseResult,
          },
        })
        console.log(`Updated word: ${row.word}`)

        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500))
      } else {
        console.log(`Failed to get parse result for word: ${row.word}`)
      }
    } catch (error) {
      console.error(`Error processing word ${row.word}:`, error)
      continue
    }
  }

  console.log('Word update process completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
