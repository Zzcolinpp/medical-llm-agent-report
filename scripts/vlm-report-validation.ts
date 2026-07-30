import type { ParsedReportData } from '../src/lib/report-parser';

const expectedCategories = new Map([
  ['医学基础模型与自监督表示学习', 112],
  ['视觉-语言 / 多模态模型', 225],
  ['扩散与生成式合成', 191],
  ['影像诊断 / 检测 / 分类', 275],
  ['分割 / 配准 / 重建 / 超分', 526],
  ['数字病理与空间组学', 198],
  ['基因组 / 蛋白 / 分子 / 单细胞', 624],
  ['生理信号与可穿戴', 154],
  ['预后 / 风险预测与多模态 EHR', 346],
  ['手术 / 机器人 / 介入', 49],
  ['方法学与架构创新（医学场景）', 281],
  ['联邦学习 / 隐私 / 公平 / 鲁棒', 84],
  ['临床验证与部署', 236],
  ['治理 / 监管 / 伦理 / 政策', 262],
  ['【边缘相关】非医学方法学前沿', 417]
]);

export function validateVlmReport(report: ParsedReportData): string[] {
  const errors: string[] = [];
  const coreCount = report.papers.filter((paper) => paper.scope === 'core').length;
  const edgeCount = report.papers.filter((paper) => paper.scope === 'edge').length;
  const categoryCounts = new Map(report.categories.map((category) => [category.title, category.count]));
  const slugs = new Set(report.papers.map((paper) => paper.slug));

  if (report.categories.length !== expectedCategories.size) {
    errors.push(`expected ${expectedCategories.size} categories, got ${report.categories.length}`);
  }
  for (const [title, count] of expectedCategories) {
    if (categoryCounts.get(title) !== count) {
      errors.push(`${title}: expected ${count} papers, got ${categoryCounts.get(title) ?? 0}`);
    }
  }
  if (report.papers.length !== 3980) {
    errors.push(`expected 3980 papers, got ${report.papers.length}`);
  }
  if (coreCount !== 3563) {
    errors.push(`expected 3563 medical papers, got ${coreCount}`);
  }
  if (edgeCount !== 417) {
    errors.push(`expected 417 peripheral papers, got ${edgeCount}`);
  }
  if (slugs.size !== report.papers.length) {
    errors.push('paper slugs are not unique');
  }

  const missingRequiredFields = report.papers.filter(
    (paper) => !paper.titleZh || !paper.titleEn || !paper.journal || !paper.date || !paper.summary || !paper.takeaway
  );
  if (missingRequiredFields.length > 0) {
    errors.push(`${missingRequiredFields.length} papers are missing required parsed fields`);
  }
  if (report.papers.some((paper) => paper.isAppendix)) {
    errors.push('appendix records were included in the searchable inventory');
  }
  if (report.papers.some((paper) => !paper.pmidUrl && !paper.doiUrl)) {
    errors.push('one or more papers are missing both PMID and DOI links');
  }

  return errors;
}
