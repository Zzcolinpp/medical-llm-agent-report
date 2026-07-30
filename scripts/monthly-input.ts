import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildReport, type ReportData } from '../src/lib/report-parser';
import type { ReportDomainId } from '../src/lib/report-catalog-core';

export interface DiskMonthlyReportEntry {
  period: string;
  domainId: ReportDomainId;
  sourcePath: string;
  report: ReportData;
}

function filesIn(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : path.endsWith('.md') ? [path] : [];
  });
}

export function loadMonthlyReportsFromDisk(): DiskMonthlyReportEntry[] {
  return filesIn(resolve('src/content/monthly'))
    .map((sourcePath) => {
      const match = sourcePath.match(/\/monthly\/(vlm|surgery|medical-agent)\/(20\d{2}-\d{2})\.md$/);
      if (!match) return null;
      return {
        period: match[2],
        domainId: match[1] as ReportDomainId,
        sourcePath,
        report: buildReport(readFileSync(sourcePath, 'utf8'))
      };
    })
    .filter((entry): entry is DiskMonthlyReportEntry => Boolean(entry))
    .sort((a, b) => b.period.localeCompare(a.period) || a.domainId.localeCompare(b.domainId));
}
