import source from '../content/medical-agent-report.md?raw';
import { buildMedicalAgentReport } from './medical-agent-report-parser';

export const medicalAgentReport = buildMedicalAgentReport(source);
