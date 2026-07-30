# AI 医疗前沿文献追踪

这是一个由 Markdown 驱动的 Astro 静态网站，面向医学 AI 研究者阅读年度报告、月度报告并检索三大领域的前沿文献。

## 站点结构

- `/`：全站总览
- `/annual/`：年度报告目录，包含医学视觉与基础模型、手术与围手术期 AI、医疗 LLM / Agent 三大领域
- `/monthly/`：独立月度报告目录；月报快照导入后按年月、领域和二级分类生成页面
- `/search/`：三大领域统一文献检索

原有 `/report/`、`/vlm/`、`/surgery/`、`/medical-agent/` 及专题检索路径继续保留，旧的 npj Digital Medicine 报告作为医疗 LLM / Agent 下的单刊子报告。

## 本地运行

项目使用 Node.js 与 pnpm。安装依赖后执行：

```bash
pnpm validate
pnpm test
pnpm check
pnpm dev --host 127.0.0.1
```

本地地址：<http://127.0.0.1:4321/>

## 更新年度报告

编辑 Obsidian 笔记后，将新的 Markdown 快照导入项目：

```bash
pnpm report:import -- "/absolute/path/to/医学LLM与Agent_文献追踪报告.md"
pnpm validate
pnpm test
pnpm build
```

导入脚本会在写入项目快照前校验主题和文献数量，原始 Obsidian 笔记不会被修改。

## 导入独立月报

月报必须是独立的 Markdown 快照，并显式指定领域和年月：

```bash
pnpm report:import -- --monthly --domain vlm --period 2026-08 "/absolute/path/to/monthly-report.md"
pnpm validate:monthly
```

快照会写入 `src/content/monthly/<domain>/<YYYY-MM>.md`，随后由 Astro 自动生成 `/monthly/<YYYY-MM>/<domain>/`。没有通过校验的笔记不会写入项目，原始 Obsidian 文件始终只读。

## 现有专题报告

- `/vlm/`：深度学习、视觉语言模型与扩散生成
- `/surgery/`：手术、外科、围手术期与人工智能
- `/medical-agent/`：医疗 LLM、生成式 AI、对话式 AI 与智能体
- `/report/`：npj Digital Medicine 单刊子报告

各报告均保留原始全文、分类、外部文献链接和专题检索页。附录完整清单只保留在全文中，不会重复进入检索索引。
