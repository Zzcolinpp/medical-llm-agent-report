import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReport } from '../src/lib/report-parser';
import { validateParsedReport } from '../scripts/report-validation';

const markdown = readFileSync(resolve('src/content/report.md'), 'utf8');
const parsed = parseReport(markdown);

test('parses the complete report inventory', () => {
  assert.deepEqual(validateParsedReport(parsed), []);
});

test('keeps article links and special indexing states', () => {
  const unindexed = parsed.papers.filter((paper) => !paper.indexed);
  assert.equal(unindexed.length, 2);
  assert.ok(parsed.papers.every((paper) => paper.doiUrl || paper.pmidUrl));
  assert.ok(parsed.papers.some((paper) => paper.scope === 'sister'));
});

test('creates stable, unique deep-link ids', () => {
  const ids = parsed.papers.map((paper) => paper.slug);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => id.startsWith('paper-')));
});
