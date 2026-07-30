import type { ReportData } from '../src/lib/report-parser';

const expectedCategories = new Map([
  ['临床决策支持与诊断/鉴别诊断/分诊推理', 62],
  ['医学智能体（Agentic AI）与多智能体系统', 83],
  ['多模态与视觉-语言医学大模型', 66],
  ['临床文书、环境记录（Scribe）与EHR信息抽取', 59],
  ['面向患者的沟通、教育与问答', 39],
  ['精神心理健康与行为干预', 67],
  ['基准测试、评估方法与模型性能评价', 53],
  ['安全性、偏倚、公平性、幻觉与红队', 51],
  ['治理、监管、伦理与政策', 51],
  ['预测建模与EHR表示学习', 28],
  ['模型开发与技术方法', 29],
  ['科研辅助与循证医学', 34],
  ['医学教育与培训', 16],
  ['公共卫生、流行病学监测与健康公平', 12],
  ['【边缘相关】基础模型/生成式AI/经典NLP等', 483]
]);

export function validateMedicalAgentReport(report: ReportData): string[] {
  const errors: string[] = [];
  const core = report.papers.filter((paper) => paper.scope === 'core').length;
  const edge = report.papers.filter((paper) => paper.scope === 'edge').length;
  const slugs = new Set(report.papers.map((paper) => paper.slug));
  const identifiers = report.papers.map((paper) => paper.pmid ? `pmid:${paper.pmid}` : paper.doi ? `doi:${paper.doi.toLowerCase()}` : `title:${paper.titleZh.toLocaleLowerCase()}|${paper.date}`);
  if (report.categories.length !== expectedCategories.size) errors.push(`expected ${expectedCategories.size} categories, got ${report.categories.length}`);
  for (const [title, count] of expectedCategories) {
    const category = report.categories.find((item) => item.title === title);
    const actual = report.papers.filter((paper) => paper.category === title).length;
    if (!category || category.count !== count) errors.push(`${title}: expected category count ${count}, got ${category?.count ?? 0}`);
    if (actual !== count) errors.push(`${title}: expected ${count} papers, got ${actual}`);
  }
  if (report.papers.length !== 1133) errors.push(`expected 1133 unique papers, got ${report.papers.length}`);
  if (core !== 650) errors.push(`expected 650 core papers, got ${core}`);
  if (edge !== 483) errors.push(`expected 483 edge papers, got ${edge}`);
  if (slugs.size !== report.papers.length) errors.push('paper slugs are not unique');
  if (new Set(identifiers).size !== identifiers.length) errors.push('paper identifiers are not unique');
  if (report.papers.some((paper) => !paper.titleZh || !paper.journal || !paper.date || !paper.summary || !paper.takeaway)) errors.push('one or more papers are missing required fields');
  if (report.papers.some((paper) => !paper.pmidUrl && !paper.doiUrl)) errors.push('one or more papers are missing PMID/DOI links');
  if (report.papers.some((paper) => paper.isAppendix)) errors.push('appendix records were included in the searchable inventory');
  return errors;
}
