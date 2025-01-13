import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  // 读取 JSON 文件
  const filePath = path.join(__dirname, 'words.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  // 递归插入单词类型和单词
  async function insertWordTypes(categories, parentTypeId = null) {
    for (const [categoryName, subCategories] of Object.entries(categories)) {
      // 插入单词类型
      const wordType = await prisma.wordType.create({
        data: {
          name: categoryName,
          parentTypeId: parentTypeId,
          description: `Category: ${categoryName}`,
        },
      })

      console.log(`Inserted word type: ${wordType.name}`)

      // 如果子分类是对象，递归插入
      if (typeof subCategories === 'object' && !Array.isArray(subCategories)) {
        await insertWordTypes(subCategories, wordType.id)
      } else if (Array.isArray(subCategories)) {
        // 如果子分类是数组，插入单词
        for (const word of subCategories) {
          await prisma.word.create({
            data: {
              word: word,
              typeId: wordType.id,
            },
          })

          console.log(`Inserted word: ${word}`)
        }
      }
    }
  }

  // 开始插入数据
  await insertWordTypes(data)

  console.log('Data insertion completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
