import source from '../content/vlm-report.md?raw';
import { buildReport } from './report-parser';

export const vlmReport = buildReport(source);
