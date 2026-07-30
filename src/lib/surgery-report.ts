import source from '../content/surgery-report.md?raw';
import { buildSurgeryReport } from './surgery-report-parser';

export const surgeryReport = buildSurgeryReport(source);

export const surgeryReportStats = {
  journalCore: 426,
  journalEdge: 356,
  preprintCore: 437,
  preprintEdge: 104,
  total: surgeryReport.papers.length
};

export const isSurgeryPreprint = (journal: string) => /arXiv|medRxiv|bioRxiv/i.test(journal);
