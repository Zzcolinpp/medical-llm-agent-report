import { buildReport, type ReportData } from './report-parser';
import type { ReportDomainId } from './report-catalog';

export interface MonthlyReportEntry {
  period: string;
  domainId: ReportDomainId;
  sourcePath: string;
  report: ReportData;
}

const monthlySources = import.meta.glob('../content/monthly/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

function parseMonthlySource(sourcePath: string, markdown: string): MonthlyReportEntry | null {
  const match = sourcePath.match(/\/monthly\/(vlm|surgery|medical-agent)\/(20\d{2}-\d{2})\.md$/);
  if (!match) return null;
  return {
    period: match[2],
    domainId: match[1] as ReportDomainId,
    sourcePath,
    report: buildReport(markdown)
  };
}

export const monthlyReports = Object.entries(monthlySources)
  .map(([sourcePath, markdown]) => parseMonthlySource(sourcePath, markdown))
  .filter((entry): entry is MonthlyReportEntry => Boolean(entry))
  .sort((a, b) => b.period.localeCompare(a.period) || a.domainId.localeCompare(b.domainId));

export const monthlyPeriods = [...new Set(monthlyReports.map((entry) => entry.period))].sort().reverse();

export function monthlyReportFor(period: string, domainId: ReportDomainId): MonthlyReportEntry | undefined {
  return monthlyReports.find((entry) => entry.period === period && entry.domainId === domainId);
}

export function monthlyEntriesFor(period: string): MonthlyReportEntry[] {
  return monthlyReports.filter((entry) => entry.period === period);
}
