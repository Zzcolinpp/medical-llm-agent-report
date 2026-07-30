import { report } from './report';
import { medicalAgentReport } from './medical-agent-report';
import { surgeryReport } from './surgery-report';
import { vlmReport } from './vlm-report';
import {
  buildCatalogPapers
} from './report-catalog-core';
import type { CatalogPaper, ReportDomain } from './report-catalog-core';
import type { Category } from './report-parser';

export type { CatalogPaper, ReportDomain, ReportDomainId, ReportMembership } from './report-catalog-core';
export { buildCatalogPapers, categoriesForDomain, paperKey } from './report-catalog-core';

export const reportDomains: ReportDomain[] = [
  {
    id: 'vlm',
    label: '医学视觉与基础模型',
    shortLabel: 'VLM / 扩散',
    description: '医学基础模型、视觉语言模型、多模态、扩散生成、影像与生物医学 AI。',
    landingPath: 'vlm/',
    reportPath: 'vlm/report/',
    literaturePath: 'vlm/literature/',
    report: vlmReport
  },
  {
    id: 'surgery',
    label: '手术与围手术期 AI',
    shortLabel: '手术 AI',
    description: '术中导航、手术视频、机器人、围手术期流程、外科风险和治理研究。',
    landingPath: 'surgery/',
    reportPath: 'surgery/report/',
    literaturePath: 'surgery/literature/',
    report: surgeryReport
  },
  {
    id: 'medical-agent',
    label: '医疗 LLM / Agent',
    shortLabel: 'LLM / Agent',
    description: '医学大语言模型、生成式 AI、对话式 AI、智能体与临床落地证据。',
    landingPath: 'medical-agent/',
    reportPath: 'medical-agent/report/',
    literaturePath: 'medical-agent/literature/',
    report: medicalAgentReport
  }
];

export const legacyReport = {
  label: 'npj Digital Medicine 单刊子报告',
  landingPath: 'report/',
  reportPath: 'report/',
  literaturePath: 'literature/',
  report
};

export const reportDomainMap = new Map(reportDomains.map((domain) => [domain.id, domain]));

export const domainCategoryOptions = reportDomains.flatMap((domain) =>
  domain.report.categories.map((category: Category) => ({
    ...category,
    domainId: domain.id,
    domainLabel: domain.label
  }))
);

export const catalogPapers: CatalogPaper[] = buildCatalogPapers(reportDomains);

export const catalogStats = {
  sourceRecords: reportDomains.reduce((total, domain) => total + domain.report.papers.length, 0),
  uniqueRecords: catalogPapers.length,
  domains: reportDomains.length
};
