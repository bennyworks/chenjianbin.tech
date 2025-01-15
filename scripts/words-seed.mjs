import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

// Progress tracking file
const PROGRESS_FILE = path.join(__dirname, 'seed-progress.json')

// Load or initialize progress
function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
    }
  } catch (error) {
    console.warn('Failed to load progress file:', error)
  }
  return { processedTypes: {}, processedWords: {} }
}

// Save progress
function saveProgress(progress) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

async function main() {
  // 读取 JSON 文件
  const filePath = path.join(__dirname, 'words.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  
  // 加载进度
  const progress = loadProgress()

  // 递归插入单词类型和单词
  async function insertWordTypes(categories, parentTypeId = null, currentPath = '') {
    for (const [categoryName, subCategories] of Object.entries(categories)) {
      const categoryPath = currentPath ? `${currentPath}.${categoryName}` : categoryName
      
      try {
        // 检查类型是否已存在
        let wordType
        if (!progress.processedTypes[categoryPath]) {
          // 检查是否已存在相同名称的类型
          const existingType = await prisma.wordType.findFirst({
            where: { name: categoryName }
          })

          if (!existingType) {
            wordType = await prisma.wordType.create({
              data: {
                name: categoryName,
                parentTypeId: parentTypeId,
                description: `Category: ${categoryName}`,
              },
            })
            console.log(`Inserted word type: ${wordType.name}`)
          } else {
            wordType = existingType
            console.log(`Using existing word type: ${wordType.name}`)
          }
          
          progress.processedTypes[categoryPath] = wordType.id
          saveProgress(progress)
        } else {
          wordType = { id: progress.processedTypes[categoryPath] }
          console.log(`Skipping already processed type: ${categoryName}`)
        }

        // 如果子分类是对象，递归插入
        if (typeof subCategories === 'object' && !Array.isArray(subCategories)) {
          await insertWordTypes(subCategories, wordType.id, categoryPath)
        } else if (Array.isArray(subCategories)) {
          // 如果子分类是数组，插入单词
          for (const word of subCategories) {
            const wordKey = `${categoryPath}:${word}`
            
            try {
              if (!progress.processedWords[wordKey]) {
                // 检查是否已存在相同的单词
                const existingWord = await prisma.word.findFirst({
                  where: { word: word }
                })

                if (!existingWord) {
                  await prisma.word.create({
                    data: {
                      word: word,
                      typeId: wordType.id,
                    },
                  })
                  console.log(`Inserted word: ${word}`)
                } else {
                  console.log(`Skipping duplicate word: ${word}`)
                }
                
                progress.processedWords[wordKey] = true
                saveProgress(progress)
              } else {
                console.log(`Skipping already processed word: ${word}`)
              }
            } catch (error) {
              console.error(`Error processing word ${word}:`, error)
              // Continue with next word
            }
          }
        }
      } catch (error) {
        console.error(`Error processing category ${categoryName}:`, error)
        // Continue with next category
      }
    }
  }

  // 开始插入数据
  await insertWordTypes(data)

  console.log('Data insertion completed.')
  
  // Clear progress file after successful completion
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      fs.unlinkSync(PROGRESS_FILE)
      console.log('Progress file cleared.')
    } catch (error) {
      console.warn('Failed to clear progress file:', error)
    }
  }
}

main()
  .catch((e) => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
