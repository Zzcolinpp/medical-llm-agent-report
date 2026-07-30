import { validateMonthlyReport } from './monthly-report-validation';

import { loadMonthlyReportsFromDisk } from './monthly-input';

const monthlyReports = loadMonthlyReportsFromDisk();
const errors = monthlyReports.flatMap((entry) => validateMonthlyReport(entry.report, entry.period, entry.domainId));
if (errors.length > 0) {
  console.error('Monthly report validation failed');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Monthly report validation passed: ${monthlyReports.length} reports`);
