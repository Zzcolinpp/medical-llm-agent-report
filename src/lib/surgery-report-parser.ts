import { buildReport, type ReportData } from './report-parser';

const preprintHeadingPattern = /^(###) ((?:（[一二三四五六七八九十]+）).+（\d+ 篇）)$/gmu;
const preprintPaperPattern = /^(####) (\d+\.\s+.+)$/gmu;

function compactPreprintRows(markdown: string): string {
  const start = markdown.indexOf('### （边缘预印本，104 篇');
  const end = markdown.indexOf('## 附录一：完整清单');
  if (start < 0 || end < 0) {
    throw new Error('Unable to locate the compact preprint inventory');
  }

  const table = markdown.slice(start, end);
  const rows = table
    .split('\n')
    .filter((line) => /^\| \d{4}-\d{2}-\d{2} \|/.test(line))
    .map((line, index) => {
      const cells = line.slice(1, -1).split('|').map((cell) => cell.trim());
      const [date, server, category, title, linkCell] = cells;
      const linkMatch = linkCell.match(/\[([^\]]+)\]\(([^)]+)\)/u);
      const link = linkMatch?.[2] ?? '';
      const linkLabel = linkMatch?.[1] ?? linkCell;
      return [
        `### ${index + 1}. ${title}`,
        '',
        `*${title}*`,
        '',
        `**${server}** · ${date} · 预印本 · ${category} · [${linkLabel}](${link})`,
        '',
        '紧凑目录条目，原报告未展开摘要；该条目属于外科邻接的边缘预印本。',
        '',
        '> **要点**：边缘预印本，保留在专题索引中供检索。',
        ''
      ].join('\n');
    });

  return [
    '## 十七、【边缘相关】预印本紧凑目录（104 篇）',
    '',
    ...rows,
    ''
  ].join('\n');
}

export function normalizeSurgeryMarkdown(markdown: string): string {
  const preprintStart = markdown.indexOf('## 十六、【预印本】');
  const appendixStart = markdown.indexOf('## 附录一：完整清单');
  if (preprintStart < 0 || appendixStart < 0) {
    throw new Error('Unable to locate the preprint or appendix sections');
  }

  const beforePreprints = markdown.slice(0, preprintStart);
  const preprintBody = markdown.slice(preprintStart, appendixStart)
    .replace(preprintHeadingPattern, '## 预印本 · $2')
    .replace(preprintPaperPattern, '### $2');
  const compactStart = preprintBody.indexOf('### （边缘预印本，104 篇');
  const normalizedPreprints = compactStart >= 0
    ? `${preprintBody.slice(0, compactStart)}${compactPreprintRows(markdown)}`
    : preprintBody;

  return `${beforePreprints}${normalizedPreprints}${markdown.slice(appendixStart)}`;
}

export function buildSurgeryReport(markdown: string): ReportData {
  return buildReport(normalizeSurgeryMarkdown(markdown));
}
