import type { Category, Paper, PaperScope, ReportData } from './report-parser';

export type ReportDomainId = 'vlm' | 'surgery' | 'medical-agent';

export interface ReportMembership {
  domainId: ReportDomainId;
  domainLabel: string;
  category: string;
  categoryId: string;
  reportPath: string;
  slug: string;
  scope: PaperScope;
  articleType: string;
}

export interface CatalogPaper extends Paper {
  key: string;
  memberships: ReportMembership[];
}

export interface ReportDomain {
  id: ReportDomainId;
  label: string;
  shortLabel: string;
  description: string;
  landingPath: string;
  reportPath: string;
  literaturePath: string;
  report: ReportData;
}

function normalizeIdentifier(value: string): string {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function paperKey(paper: Paper): string {
  if (paper.doi) return `doi:${paper.doi.toLocaleLowerCase()}`;
  if (paper.pmid) return `pmid:${paper.pmid}`;
  return `title:${normalizeIdentifier(paper.titleEn || paper.titleZh)}|${paper.date}`;
}

export function buildCatalogPapers(domains: ReportDomain[]): CatalogPaper[] {
  const catalog = new Map<string, CatalogPaper>();

  for (const domain of domains) {
    for (const paper of domain.report.papers) {
      const key = paperKey(paper);
      const membership: ReportMembership = {
        domainId: domain.id,
        domainLabel: domain.label,
        category: paper.category,
        categoryId: paper.categoryId,
        reportPath: domain.reportPath,
        slug: paper.slug,
        scope: paper.scope,
        articleType: paper.articleType
      };
      const existing = catalog.get(key);
      if (existing) {
        existing.memberships.push(membership);
        continue;
      }
      catalog.set(key, { ...paper, key, memberships: [membership] });
    }
  }

  return [...catalog.values()].sort((a, b) => b.date.localeCompare(a.date) || a.titleZh.localeCompare(b.titleZh, 'zh-CN'));
}

export function categoriesForDomain(domains: ReportDomain[], domainId: ReportDomainId): Category[] {
  return domains.find((domain) => domain.id === domainId)?.report.categories ?? [];
}
