import test from 'node:test';
import { readFileSync } from 'node:fs';
import { buildSourceReport } from '../src/lib/source-report-parser';
import assert from 'node:assert/strict';
import { catalogDomains } from '../scripts/catalog-input';
import { validateCatalog } from '../scripts/catalog-validation';
import { buildCatalogPapers } from '../src/lib/report-catalog-core';
import { loadMonthlyReportsFromDisk } from '../scripts/monthly-input';

test('builds a three-domain de-duplicated catalogue', () => {
  const papers = buildCatalogPapers(catalogDomains);
  assert.equal(catalogDomains.length, 3);
  assert.equal(catalogDomains.reduce((total, domain) => total + domain.report.papers.length, 0), 6436);
  assert.equal(papers.length, 5700);
  assert.ok(papers.some((paper) => paper.memberships.length > 1));
  assert.deepEqual(validateCatalog(catalogDomains), []);
});

test('indexes supplied monthly reports without counting pending journal records', () => {
  const reports = loadMonthlyReportsFromDisk();
  assert.equal(reports.length, 6);
  const expected = new Map([
    ['vlm/2026-08', [32, 4]], ['vlm/2026-09', [25, 4]],
    ['surgery/2026-08', [70, 44]], ['surgery/2026-09', [34, 39]],
    ['medical-agent/2026-08', [129, 308]], ['medical-agent/2026-09', [109, 338]]
  ]);
  for (const entry of reports) {
    const report = entry.report;
    assert.deepEqual([report.papers.filter((paper) => !paper.isAppendix).length, report.papers.filter((paper) => paper.isAppendix).length], expected.get(`${entry.domainId}/${entry.period}`));
    assert.equal(report.meta.retrievalDate, '2026-10-04');
    assert.ok(report.meta.trackingWindow.endsWith(entry.period + '-14'));
    assert.ok(report.papers.every((paper) => report.html.includes(`id="${paper.slug}"`)));
    assert.ok(report.papers.every((paper) => !/<a id=/.test(paper.summary)));
    assert.ok(!/href="(?:\/Users\/|[^"#]*附件\/)/.test(report.html));
  }
});

test('de-duplicates annual and monthly records while preserving report memberships', () => {
  const monthlyDomains = loadMonthlyReportsFromDisk().map((entry) => ({ ...catalogDomains.find((domain) => domain.id === entry.domainId)!, reportPath: `monthly/${entry.period}/${entry.domainId}/`, report: entry.report }));
  const papers = buildCatalogPapers([...catalogDomains, ...monthlyDomains]);
  assert.equal(new Set(papers.map((paper) => paper.key)).size, papers.length);
  assert.ok(papers.some((paper) => paper.memberships.some((membership) => membership.reportPath.startsWith('monthly/')) && paper.memberships.some((membership) => !membership.reportPath.startsWith('monthly/'))));
});

test('preserves supplemental report reading anchors', () => {
  for (const slug of ['lung-cancer', 'prospective-llm-agent', 'medical-agent-increment']) {
    const report = buildSourceReport(readFileSync(`src/content/supplemental/${slug}.md`, 'utf8'));
    for (const [, id] of report.html.matchAll(/href="#([^"\s]+)"/g)) {
      assert.ok(report.html.includes(`id="${id}"`), `${slug}: missing anchor ${id}`);
    }
  }
});
