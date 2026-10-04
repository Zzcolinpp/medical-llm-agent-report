import { reportDomains, legacyReport } from './report-catalog';
import { monthlyReports } from './monthly-reports';
import { supplementalReports } from './supplemental-reports';

export const medicalTopics = [
  { id: 'lung-cancer', group: '疾病与诊疗', label: '肺癌预防与诊疗', description: '从预防与早筛，到局部、晚期及全阶段诊疗的证据追踪。' },
  ...reportDomains.map(d => ({ id: d.id, group: '数字医学与 AI', label: d.label, description: d.description }))
];
export const reportLibrary = [
  ...reportDomains.map(d => ({ title: d.label + '年度报告', topic: d.id, kind: '年度报告', href: d.reportPath, date: d.report.meta.retrievalDate, window: d.report.meta.trackingWindow })),
  { title: legacyReport.label, topic: '', kind: '专题报告', href: legacyReport.reportPath, date: legacyReport.report.meta.retrievalDate, window: legacyReport.report.meta.trackingWindow },
  ...monthlyReports.map(e => ({ title: reportDomains.find(d => d.id === e.domainId)!.label + ' · ' + e.period, topic: e.domainId, kind: '月度报告', href: `monthly/${e.period}/${e.domainId}/`, date: e.report.meta.retrievalDate, window: e.report.meta.trackingWindow })),
  ...supplementalReports.map(e => ({ title: e.label, topic: e.slug === 'lung-cancer' ? 'lung-cancer' : 'medical-agent', kind: e.slug === 'medical-agent-increment' ? '月度报告' : e.slug === 'lung-cancer' ? '年度报告' : '专题报告', href: `reports/${e.slug}/`, date: e.report.meta.retrievalDate, window: e.report.meta.trackingWindow }))
].sort((a, b) => b.date.localeCompare(a.date) || b.window.localeCompare(a.window) || a.title.localeCompare(b.title));
export const libraryDate = reportLibrary.map(r => r.date).sort().at(-1)!;

export const reportKinds = ['年度报告', '月度报告', '专题报告', '作者追踪'];
