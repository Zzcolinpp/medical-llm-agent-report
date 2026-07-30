import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { catalogDomains } from './catalog-input';
import { parseReport } from '../src/lib/report-parser';
import { validateMedicalAgentReport } from './medical-agent-report-validation';
import { validateCatalog } from './catalog-validation';
import { validateMonthlyReport } from './monthly-report-validation';
import { validateParsedReport } from './report-validation';
import { validateSurgeryReport } from './surgery-report-validation';
import { validateVlmReport } from './vlm-report-validation';
import { loadMonthlyReportsFromDisk } from './monthly-input';

const monthlyReports = loadMonthlyReportsFromDisk();
const errors = [
  ...validateParsedReport(parseReport(readFileSync(resolve('src/content/report.md'), 'utf8'))).map((error) => `main: ${error}`),
  ...validateVlmReport(parseReport(readFileSync(resolve('src/content/vlm-report.md'), 'utf8'))).map((error) => `vlm: ${error}`),
  ...validateSurgeryReport(catalogDomains[1].report).map((error) => `surgery: ${error}`),
  ...validateMedicalAgentReport(catalogDomains[2].report).map((error) => `medical-agent: ${error}`),
  ...validateCatalog(catalogDomains).map((error) => `catalog: ${error}`)
];
for (const entry of monthlyReports) errors.push(...validateMonthlyReport(entry.report, entry.period, entry.domainId).map((error) => `${entry.domainId}/${entry.period}: ${error}`));
if (errors.length > 0) {
  console.error('Full validation failed');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Full validation passed: 4 annual reports, ${monthlyReports.length} monthly reports`);
