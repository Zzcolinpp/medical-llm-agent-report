import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { buildReport, type Paper, type ReportData } from './report-parser';

type MdNode = {
  type: string;
  depth?: number;
  value?: string;
  url?: string;
  children?: MdNode[];
};

const monthMap: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
};

function textOf(node: MdNode): string {
  if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

function linksOf(node: MdNode): string[] {
  const links: string[] = [];
  if (node.type === 'link' && node.url) links.push(node.url);
  for (const child of node.children ?? []) links.push(...linksOf(child));
  return links;
}

function normalizeDate(value: string): string {
  const match = value.match(/^(20\d{2})-([A-Za-z]{3}|\d{1,2})(?:-(\d{1,2}))?$/i);
  if (!match) return value;
  const [, year, monthValue, dayValue] = match;
  const month = monthMap[monthValue.toLowerCase()] ?? monthValue.padStart(2, '0');
  return `${year}-${month}-${(dayValue ?? '01').padStart(2, '0')}`;
}

function canonicalKey(paper: Paper): string {
  if (paper.pmid) return `pmid:${paper.pmid}`;
  if (paper.doi) return `doi:${paper.doi.toLowerCase()}`;
  return `title:${paper.titleZh.toLocaleLowerCase()}|${normalizeDate(paper.date)}`;
}

function normalizeReportMarkdown(markdown: string): string {
  return markdown.replace(/^(\*\*[^\n]+\*\* · [^\n]+)$/gmu, '$1\n');
}

function tableRows(markdown: string): MdNode[][] {
  const root = unified().use(remarkParse).use(remarkGfm).parse(markdown) as unknown as MdNode;
  let inEdgeSection = false;
  const rows: MdNode[][] = [];
  visit(root as never, (node: MdNode) => {
    if (node.type === 'heading' && node.depth === 2) {
      inEdgeSection = textOf(node).includes('【边缘相关】基础模型/生成式AI/经典NLP等');
    }
    if (inEdgeSection && node.type === 'table') {
      const tableRows = node.children ?? [];
      for (const row of tableRows) {
        const cells = row.children ?? [];
        if (/^\d+$/.test(textOf(cells[0] ?? {}).trim())) rows.push(cells);
      }
      inEdgeSection = false;
    }
    if (node.type === 'heading' && node.depth === 2 && textOf(node).startsWith('附录一')) {
      inEdgeSection = false;
    }
  });
  return rows;
}

function parseEdgePapers(markdown: string, categoryId: string): Paper[] {
  return tableRows(markdown).map((cells, index) => {
    const titleZh = textOf(cells[1]).trim();
    const journal = textOf(cells[2]).trim();
    const date = normalizeDate(textOf(cells[3]).trim());
    const links = linksOf(cells[4]);
    const linkText = textOf(cells[4]);
    const pmidUrl = links.find((link) => /pubmed\.ncbi\.nlm\.nih\.gov/i.test(link));
    const doiUrl = links.find((link) => /doi\.org\//i.test(link));
    const pmid = linkText.match(/PMID\s*(\d+)/i)?.[1];
    const doi = doiUrl?.match(/doi\.org\/(.+)$/i)?.[1];
    const summary = textOf(cells[5]).trim();
    const idBase = doi ? `doi-${doi}` : pmid ? `pmid-${pmid}` : `row-${index + 1}`;
    return {
      id: `paper-${idBase}`,
      slug: `paper-${idBase}`,
      number: Number(textOf(cells[0]).trim()),
      titleZh,
      titleEn: '',
      journal,
      date,
      articleType: '紧凑目录 · 边缘相关',
      pmid,
      pmidUrl,
      doi,
      doiUrl,
      sourceUrl: links[0],
      summary,
      takeaway: summary,
      category: '【边缘相关】基础模型/生成式AI/经典NLP等',
      categoryId,
      scope: 'edge',
      indexed: Boolean(pmidUrl || doiUrl),
      isAppendix: false
    } satisfies Paper;
  });
}

function deduplicate(papers: Paper[]): Paper[] {
  const seen = new Set<string>();
  return papers.filter((paper) => {
    const key = canonicalKey(paper);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildMedicalAgentReport(markdown: string): ReportData {
  const base = buildReport(normalizeReportMarkdown(markdown));
  const edgeCategory = base.categories.find((category) => category.isEdge);
  if (!edgeCategory) throw new Error('Medical agent report edge category was not found');

  const papers = deduplicate([
    ...base.papers.map((paper) => ({ ...paper, date: normalizeDate(paper.date) })),
    ...parseEdgePapers(markdown, edgeCategory.id)
  ]);

  return { ...base, papers };
}
