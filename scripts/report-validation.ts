import type { ParsedReportData } from '../src/lib/report-parser';

export function validateParsedReport(report: ParsedReportData): string[] {
  const errors: string[] = [];
  const coreCount = report.papers.filter((paper) => paper.scope === 'core').length;
  const edgeCount = report.papers.filter((paper) => paper.scope === 'edge').length;
  const sisterCount = report.papers.filter((paper) => paper.scope === 'sister').length;
  const mainCount = coreCount + edgeCount;

  if (report.categories.length !== 15) {
    errors.push(`expected 15 categories, got ${report.categories.length}`);
  }
  if (coreCount !== 265) {
    errors.push(`expected 265 core papers, got ${coreCount}`);
  }
  if (edgeCount !== 85) {
    errors.push(`expected 85 edge papers, got ${edgeCount}`);
  }
  if (sisterCount !== 3) {
    errors.push(`expected 3 sister-journal papers, got ${sisterCount}`);
  }
  if (mainCount !== 350) {
    errors.push(`expected 350 main papers, got ${mainCount}`);
  }

  const slugs = new Set(report.papers.map((paper) => paper.slug));
  if (slugs.size !== report.papers.length) {
    errors.push('paper slugs are not unique');
  }

  for (const category of report.categories) {
    const categoryCount = report.papers.filter((paper) => paper.categoryId === category.id).length;
    if (categoryCount !== category.count) {
      errors.push(`${category.title}: expected ${category.count} papers, got ${categoryCount}`);
    }
  }

  const missingRequiredFields = report.papers.filter(
    (paper) => !paper.titleZh || !paper.titleEn || !paper.date || !paper.summary || !paper.takeaway
  );
  if (missingRequiredFields.length > 0) {
    errors.push(`${missingRequiredFields.length} papers are missing required parsed fields`);
  }

  const pmidless = report.papers.filter((paper) => !paper.pmid).length;
  if (pmidless !== 2) {
    errors.push(`expected 2 papers without PMID, got ${pmidless}`);
  }

  return errors;
}
