import test from 'node:test';
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

test('does not manufacture monthly reports without imported snapshots', () => {
  assert.deepEqual(loadMonthlyReportsFromDisk(), []);
});
