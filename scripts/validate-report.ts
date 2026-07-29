import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseReport } from '../src/lib/report-parser';
import { validateParsedReport } from './report-validation';

const sourcePath = resolve(process.argv[2] ?? 'src/content/report.md');
const markdown = readFileSync(sourcePath, 'utf8');
const parsed = parseReport(markdown);
const errors = validateParsedReport(parsed);

if (errors.length > 0) {
  console.error(`Report validation failed for ${sourcePath}`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Report validation passed: ${parsed.papers.length} papers, ${parsed.categories.length} categories`);
