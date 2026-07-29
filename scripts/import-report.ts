import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseReport } from '../src/lib/report-parser';
import { validateParsedReport } from './report-validation';

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: pnpm report:import -- "/absolute/path/to/report.md"');
  process.exit(1);
}

const sourcePath = resolve(inputPath);
const targetPath = resolve('src/content/report.md');
const markdown = readFileSync(sourcePath, 'utf8');
const parsed = parseReport(markdown);
const errors = validateParsedReport(parsed);

if (errors.length > 0) {
  console.error(`Import stopped; source report failed validation: ${sourcePath}`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

mkdirSync(dirname(targetPath), { recursive: true });
copyFileSync(sourcePath, targetPath);
console.log(`Imported ${parsed.papers.length} papers from ${sourcePath}`);
