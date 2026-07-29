import source from '../content/report.md?raw';

export { parseReport } from './report-parser';
export type {
  Category,
  Paper,
  PaperScope,
  ReportData,
  ReportMeta,
  ReportSection
} from './report-parser';

import { buildReport as buildReportFromMarkdown } from './report-parser';

export function buildReport(markdown = source) {
  return buildReportFromMarkdown(markdown);
}

export const report = buildReport();
