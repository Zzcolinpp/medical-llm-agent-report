import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildSurgeryReport } from '../src/lib/surgery-report-parser';
import { validateSurgeryReport } from './surgery-report-validation';

const sourcePath = resolve(process.argv[2] ?? 'src/content/surgery-report.md');
const markdown = readFileSync(sourcePath, 'utf8');
const parsed = buildSurgeryReport(markdown);
const errors = validateSurgeryReport(parsed);

if (errors.length > 0) {
  console.error(`Surgery report validation failed for ${sourcePath}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Surgery report validation passed: ${parsed.papers.length} papers, ${parsed.categories.length} categories`);
