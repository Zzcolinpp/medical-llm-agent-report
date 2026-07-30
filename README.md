# 医学 LLM / Agent 文献追踪报告

这是一个由 Markdown 驱动的 Astro 静态网站，面向医学 AI 研究者阅读多套专题文献追踪报告。

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

## VLM / 扩散专题报告

深度学习、视觉语言模型、扩散与生成式模型专题报告独立发布在：

- `/vlm/`：专题总览
- `/vlm/report/`：报告全文
- `/vlm/literature/`：结构化文献检索

校验该报告时执行：

```bash
pnpm validate:vlm
```

## 手术 + AI 专题报告

手术、外科、围手术期与人工智能交叉研究独立发布在：

- `/surgery/`：专题总览
- `/surgery/report/`：报告全文
- `/surgery/literature/`：结构化文献检索

该专题包含 1323 篇唯一文献，其中期刊论文 782 篇、预印本 541 篇。附录完整清单只保留在全文中，不会重复进入检索索引。校验该报告时执行：

```bash
pnpm validate:surgery
```
