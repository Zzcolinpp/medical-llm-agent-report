import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReport } from '../src/lib/report-parser';
import { validateParsedReport } from '../scripts/report-validation';
import { validateVlmReport } from '../scripts/vlm-report-validation';

const markdown = readFileSync(resolve('src/content/report.md'), 'utf8');
const parsed = parseReport(markdown);
const vlmMarkdown = readFileSync(resolve('src/content/vlm-report.md'), 'utf8');
const vlmParsed = parseReport(vlmMarkdown);

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

test('validates the VLM and diffusion report inventory', () => {
  assert.deepEqual(validateVlmReport(vlmParsed), []);
});

test('keeps the VLM report metadata and first article intact', () => {
  assert.equal(vlmParsed.meta.retrievalDate, '2026-07-17');
  assert.equal(vlmParsed.meta.targetJournal, '24 刊，分三层（Tier A 综合刊 5 · Tier B 顶级子刊 12 · Tier C 医学AI/影像旗舰 7）。');
  assert.equal(vlmParsed.papers[0].titleEn, 'Transparent chest radiograph foundation model enables explainable human disease profiling');
  assert.equal(vlmParsed.papers[0].scope, 'core');
  assert.equal(vlmParsed.papers.at(-1)?.scope, 'edge');
});
