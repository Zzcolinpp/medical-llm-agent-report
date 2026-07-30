import type { ParsedReportData, ReportData } from '../src/lib/report-parser';

export function validateSurgeryReport(report: ParsedReportData | ReportData): string[] {
  const errors: string[] = [];
  const coreCount = report.papers.filter((paper) => paper.scope === 'core').length;
  const edgeCount = report.papers.filter((paper) => paper.scope === 'edge').length;
  const preprintCount = report.papers.filter((paper) => /arXiv|medRxiv|bioRxiv/i.test(paper.journal)).length;
  const slugs = new Set(report.papers.map((paper) => paper.slug));
  const appendixPapers = report.papers.filter((paper) => paper.isAppendix);

  if (report.papers.length !== 1323) errors.push(`expected 1323 papers, got ${report.papers.length}`);
  if (coreCount !== 863) errors.push(`expected 863 core papers, got ${coreCount}`);
  if (edgeCount !== 460) errors.push(`expected 460 edge papers, got ${edgeCount}`);
  if (preprintCount !== 541) errors.push(`expected 541 preprints, got ${preprintCount}`);
  if (report.categories.length !== 30) errors.push(`expected 30 categories, got ${report.categories.length}`);
  if (slugs.size !== report.papers.length) errors.push('paper slugs are not unique');
  if (appendixPapers.length > 0) errors.push('appendix records were included in the searchable inventory');

  for (const category of report.categories) {
    const categoryCount = report.papers.filter((paper) => paper.categoryId === category.id).length;
    if (categoryCount !== category.count) {
      errors.push(`${category.title}: expected ${category.count} papers, got ${categoryCount}`);
    }
  }

  const missingRequiredFields = report.papers.filter(
    (paper) => !paper.titleZh || !paper.titleEn || !paper.journal || !paper.date || !paper.summary || !paper.takeaway
  );
  if (missingRequiredFields.length > 0) errors.push(`${missingRequiredFields.length} papers are missing required parsed fields`);
  if (report.papers.some((paper) => !paper.sourceUrl && !paper.pmidUrl && !paper.doiUrl)) {
    errors.push('one or more papers are missing an external source link');
  }

  return errors;
}
