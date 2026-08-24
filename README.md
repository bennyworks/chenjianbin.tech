# chenjianbin.tech

陈剑彬的个人文章系统，使用 Astro 与 Dante 主题构建。

博客通过 GitHub Actions 部署到 GitHub Pages：

https://bennyworks.github.io/chenjianbin.tech/

本地开发：

```bash
npm ci
npm run dev
```

文章发布稿位于 `src/content/blog/`。重新从 knowledge-base 生成三组文章时运行：

```bash
npm run migrate-content
```

主题许可见 [`LICENSE`](./LICENSE)。
