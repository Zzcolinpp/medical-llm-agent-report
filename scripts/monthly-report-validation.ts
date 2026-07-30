import type { ReportData } from '../src/lib/report-parser';

export function validateMonthlyReport(report: ReportData, period: string, domain: string): string[] {
  const errors: string[] = [];
  if (!/^20\d{2}-\d{2}$/.test(period)) errors.push(`invalid period: ${period}`);
  if (!['vlm', 'surgery', 'medical-agent'].includes(domain)) errors.push(`invalid domain: ${domain}`);
  if (!report.meta.retrievalDate) errors.push('missing retrieval date');
  if (report.categories.length === 0) errors.push('monthly report has no categories');
  if (report.papers.length === 0) errors.push('monthly report has no papers');
  if (new Set(report.papers.map((paper) => paper.slug)).size !== report.papers.length) errors.push('paper slugs are not unique');
  if (report.papers.some((paper) => !paper.titleZh || !paper.date || !paper.summary || !paper.takeaway)) {
    errors.push('one or more papers are missing required fields');
  }
  if (report.papers.some((paper) => !paper.pmidUrl && !paper.doiUrl && !paper.sourceUrl)) {
    errors.push('one or more papers are missing an external source link');
  }
  return errors;
}
