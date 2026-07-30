import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseReport } from '../src/lib/report-parser';
import { validateMonthlyReport } from './monthly-report-validation';
import { validateParsedReport } from './report-validation';

const args = process.argv.slice(2);
const monthly = args.includes('--monthly');
const domain = args.find((_arg, index) => args[index - 1] === '--domain');
const period = args.find((_arg, index) => args[index - 1] === '--period');
const inputPath = [...args].reverse().find((arg) => !arg.startsWith('--') && arg !== domain && arg !== period);
if (!inputPath) {
  console.error('Usage: pnpm report:import -- "/absolute/path/to/report.md"');
  console.error('   or: pnpm report:import -- --monthly --domain vlm --period 2026-08 "/absolute/path/to/monthly.md"');
  process.exit(1);
}

const sourcePath = resolve(inputPath);
const markdown = readFileSync(sourcePath, 'utf8');
const parsed = parseReport(markdown);
const errors = monthly
  ? validateMonthlyReport({ ...parsed, html: '' }, period ?? '', domain ?? '')
  : validateParsedReport(parsed);

if (errors.length > 0) {
  console.error(`Import stopped; source report failed validation: ${sourcePath}`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const targetPath = monthly
  ? resolve(`src/content/monthly/${domain}/${period}.md`)
  : resolve('src/content/report.md');
mkdirSync(dirname(targetPath), { recursive: true });
copyFileSync(sourcePath, targetPath);
console.log(`Imported ${parsed.papers.length} papers from ${sourcePath} to ${targetPath}`);
