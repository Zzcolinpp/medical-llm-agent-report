import { buildCatalogPapers, type ReportDomain } from '../src/lib/report-catalog-core';

export function validateCatalog(reportDomains: ReportDomain[]): string[] {
  const errors: string[] = [];
  const catalogPapers = buildCatalogPapers(reportDomains);
  const reportDomainMap = new Map(reportDomains.map((domain) => [domain.id, domain]));
  if (reportDomains.length !== 3) errors.push(`expected 3 report domains, got ${reportDomains.length}`);
  if (new Set(reportDomains.map((domain) => domain.id)).size !== reportDomains.length) errors.push('report domain ids are not unique');
  for (const domain of reportDomains) {
    for (const category of domain.report.categories) {
      const actual = domain.report.papers.filter((paper) => paper.categoryId === category.id).length;
      if (actual !== category.count) errors.push(`${domain.id}/${category.title}: expected ${category.count}, got ${actual}`);
    }
  }
  if (new Set(catalogPapers.map((paper) => paper.key)).size !== catalogPapers.length) errors.push('catalog paper keys are not unique');
  for (const paper of catalogPapers) {
    if (paper.memberships.length === 0) errors.push(`${paper.key}: has no report membership`);
    for (const membership of paper.memberships) {
      const domain = reportDomainMap.get(membership.domainId);
      if (!domain) {
        errors.push(`${paper.key}: unknown report domain ${membership.domainId}`);
        continue;
      }
      if (!domain.report.categories.some((category) => category.id === membership.categoryId)) errors.push(`${paper.key}: unknown category ${membership.categoryId}`);
      if (!domain.report.papers.some((candidate) => candidate.slug === membership.slug)) errors.push(`${paper.key}: broken report slug ${membership.slug}`);
    }
  }
  return errors;
}
