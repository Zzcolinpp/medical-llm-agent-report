import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildMedicalAgentReport } from '../src/lib/medical-agent-report-parser';
import { buildSurgeryReport } from '../src/lib/surgery-report-parser';
import { parseReport } from '../src/lib/report-parser';
import type { ReportDomain } from '../src/lib/report-catalog-core';

const read = (file: string) => readFileSync(resolve(file), 'utf8');

export const catalogDomains: ReportDomain[] = [
  {
    id: 'vlm',
    label: '医学视觉与基础模型',
    shortLabel: 'VLM / 扩散',
    description: '',
    landingPath: 'vlm/',
    reportPath: 'vlm/report/',
    literaturePath: 'vlm/literature/',
    report: { ...parseReport(read('src/content/vlm-report.md')), html: '' }
  },
  {
    id: 'surgery',
    label: '手术与围手术期 AI',
    shortLabel: '手术 AI',
    description: '',
    landingPath: 'surgery/',
    reportPath: 'surgery/report/',
    literaturePath: 'surgery/literature/',
    report: buildSurgeryReport(read('src/content/surgery-report.md'))
  },
  {
    id: 'medical-agent',
    label: '医疗 LLM / Agent',
    shortLabel: 'LLM / Agent',
    description: '',
    landingPath: 'medical-agent/',
    reportPath: 'medical-agent/report/',
    literaturePath: 'medical-agent/literature/',
    report: buildMedicalAgentReport(read('src/content/medical-agent-report.md'))
  }
];
