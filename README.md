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

## 2026-10-05 报告更新

已导入六份独立月报，按固定窗口的截止月份归档为 2026-08 和 2026-09；页面显示真实窗口、实际检索日期和源报告的部分完成状态。统一检索包含年度与月度记录；月报中的“检索本报告文献”按报告归属筛选，不用自然月替代跨月窗口。前沿索引包含预印本、会议与版本记录，不表示新增独立研究数量。

年度目录新增肺癌证据报告与 LLM/Agent 前瞻性研究集合；月报目录新增 2026-07-15—2026-10-04 医疗 LLM/Agent 增量全文。补充报告仅供全文阅读，尚未进入三领域文献检索索引。

所有导入的 Markdown 均保留源文件原文。源报告引用的审计附件不在提供的目录内，页面将这些本地链接标记为“本地附件未上传”。源目录只读；线上使用导入时的快照。

## 医学前沿追踪门户

首页优先展示最新报告和医学主题。医学主题分为疾病与诊疗、数字医学与 AI；报告库按年度报告、月度报告（含独立增量报告）、专题报告、作者追踪四类组织，支持标题和主题筛选。作者追踪尚未收录资料，显示明确空状态。原有年度、月度、文献索引和全文深链接保持可用。
