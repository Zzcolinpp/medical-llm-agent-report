import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildMedicalAgentReport } from '../src/lib/medical-agent-report-parser';
import { validateMedicalAgentReport } from './medical-agent-report-validation';

const sourcePath = resolve(process.argv[2] ?? 'src/content/medical-agent-report.md');
const report = buildMedicalAgentReport(readFileSync(sourcePath, 'utf8'));
const errors = validateMedicalAgentReport(report);
if (errors.length > 0) {
  console.error(`Medical agent report validation failed for ${sourcePath}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Medical agent report validation passed: ${report.papers.length} papers, ${report.categories.length} categories`);
