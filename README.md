# 医学 LLM / Agent 文献追踪报告

这是一个由 Markdown 驱动的 Astro 静态网站，面向医学 AI 研究者阅读 npj Digital Medicine 文献追踪报告。

## 本地运行

项目使用 Node.js 与 pnpm。安装依赖后执行：

```bash
pnpm validate
pnpm test
pnpm check
pnpm dev --host 127.0.0.1
```

本地地址：<http://127.0.0.1:4321/>

## 更新报告

编辑 Obsidian 笔记后，将新的 Markdown 快照导入项目：

```bash
pnpm report:import -- "/absolute/path/to/医学LLM与Agent_文献追踪报告.md"
pnpm validate
pnpm test
pnpm build
```

导入脚本会在写入 `src/content/report.md` 前校验主题和文献数量，原始 Obsidian 笔记不会被修改。
