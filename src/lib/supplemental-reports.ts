import lungCancer from '../content/supplemental/lung-cancer.md?raw';
import prospective from '../content/supplemental/prospective-llm-agent.md?raw';
import increment from '../content/supplemental/medical-agent-increment.md?raw';
import { buildSourceReport } from './source-report-parser';

export const supplementalReports = [
  { slug: 'lung-cancer', collection: 'annual', label: '肺癌预防、早筛与全阶段诊疗', source: lungCancer },
  { slug: 'prospective-llm-agent', collection: 'annual', label: 'LLM / Agent 前瞻性研究集合', source: prospective },
  { slug: 'medical-agent-increment', collection: 'monthly', label: '医疗 LLM / Agent 增量报告（2026-07-15—2026-10-04）', source: increment }
].map(({ source, ...entry }) => ({ ...entry, report: buildSourceReport(source) }));
