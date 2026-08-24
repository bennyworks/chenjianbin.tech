# chenjiabin.tech blog

陈剑彬的个人文章系统，使用 [Dante Astro Theme](https://github.com/JustGoodUI/dante-astro-theme) 构建。

## 本地开发

```bash
npm ci
npm run dev
```

生产构建：

```bash
npm run check
npm run build
```

文章发布稿位于 `src/content/blog/`。需要从 knowledge-base 重新生成时运行 `npm run migrate-content`，该脚本会复制三组哲学与技术文章，排除审校、合规和归档文档，并转换 Obsidian 双链。

博客通过仓库根目录的 `.github/workflows/deploy-blog.yml` 部署到 GitHub Pages：

`https://bennyworks.github.io/chenjianbin.tech/`

主题版权与许可见 `LICENSE`。
