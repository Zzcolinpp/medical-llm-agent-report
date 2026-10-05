# 医学前沿追踪

以文献卡片为核心的医学研究门户。年度追踪、月度追踪、专题摘选与医学专题共用同一张卡片，作者追踪暂时留白。原始报告独立备份，卡片修订不会改写报告或 Obsidian 源文件。

## 页面

- `/`：追踪入口、医学专题及文献分布。
- `/library/`：检索全部卡片，可按主题、追踪批次、阅读状态、收录状态及年份筛选。
- `/topics/<topic>/`：跨报告的医学专题集合；左侧专题／期刊索引用数量与色条展示分布，点击后定位到右侧结果。
- `/tracking/annual/`、`/tracking/monthly/`、`/tracking/selection/`：各批次中有文献的主题和卡片。
- `/tracking/author/`：留白，等待补充作者资料。
- `/backups/`：13 份原始报告全文。原有报告阅读路径保持可用。

DOI 和 PMID 用于去重，报告归属及原始基础信息保留在卡片来源中。预印本、版本和更正记录按原来源保留，不将记录数解释为独立研究数量。待核验记录明确标记。

## 阅读与导航

文献采用单列长条布局，完整显示题录、摘要、分类、笔记、自定义字段与报告来源。阅读不依赖详情弹窗；编辑及对照原始记录保留独立入口。

列表上下均有翻页按钮和页码，支持每页 10／20／50 篇。翻页和索引筛选后定位到结果标题，显示当前范围与序号；网址保留筛选及页码，刷新和浏览器返回可恢复阅读范围。手机上的索引可展开或收起。

## 编辑与保存

卡片可编辑基础题录、医学主题、细分专题、摘要、标签、阅读状态、笔记和自定义字段。Sites D1 保存修订；各页面及设备读取相同修订。浏览器本地存储不承担数据保存。并发保存以版本号检测冲突，失败时保留当前输入。

`src/generated/card-library.json` 是从报告快照生成的基础题录与来源；D1 的 `card_edits` 是独立修订层。重新导入沿用已有标识，不覆盖笔记。原始记录可在详情中查看。

## 本地验证

使用 Node.js 24 和 pnpm 安装锁定依赖：

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm test
pnpm check
pnpm build
pnpm preview:cards
```

完整卡片预览位于 <http://127.0.0.1:4322/>，使用 `.sites-local/cards.sqlite` 测试保存。`pnpm dev` 仅预览 Astro 页面，不提供卡片存储 API。预览数据库不会上传。

## 报告更新

```bash
pnpm report:import -- "/absolute/path/to/report.md"
pnpm report:import -- --monthly --domain vlm --period 2026-09 "/absolute/path/to/monthly-report.md"
pnpm cards:import
pnpm validate
pnpm test
pnpm check
pnpm build
```

导入器只写入项目快照，源文件只读。新增报告类型需明确登记来源与解析方式。源报告引用但未提供的本地附件显示“本地附件未上传”。

## 部署

保持既有 Sites 项目与访问范围，使用 Sites 标准保存、打包和发布流程。构建生成 `dist/server/index.js`，包含报告静态页面和 D1 卡片 API；`.openai/hosting.json` 声明 `DB` 绑定。`db/schema.ts` 定义修订表，Drizzle 的 `drizzle/*.sql` 及 `drizzle/meta/` 随版本保存并由平台部署前应用。迁移只修改结构，不导入题录，也不在请求中创建表。

已发布的迁移不得改写；后续结构变化应生成新的迁移并检查 SQL。共享源卡片、原始报告和独立修订层的关系应在更新时保持。

## GitHub Pages 阅读版

GitHub Pages 使用同一份页面与报告，提供完整卡片、检索、专题／期刊索引、翻页及原始报告备份。编辑入口跳转到现有 Sites 在线版；GitHub Pages 不托管写入 API，也不自动复制 D1 中的个人笔记与在线修订。

```bash
PUBLIC_BASE_PATH=/medical-llm-agent-report SITE_URL=https://zzcolinpp.github.io pnpm build:pages
pnpm preview
```

`build:pages` 导出报告基础卡片（含每条来源的说明），不打包 Worker、数据库迁移或绑定配置。推送 `main` 后，GitHub Actions 验证、构建并发布到 <https://zzcolinpp.github.io/medical-llm-agent-report/>。Sites 仍使用原来的 `build` 与部署流程。
