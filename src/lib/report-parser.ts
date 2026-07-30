import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export type PaperScope = 'core' | 'edge' | 'sister';

export interface ReportMeta {
  title: string;
  retrievalDate: string;
  trackingWindow: string;
  targetJournal: string;
  dataSource: string;
  topicScope: string;
}

export interface Category {
  id: string;
  title: string;
  count: number;
  isEdge: boolean;
}

export interface Paper {
  id: string;
  slug: string;
  number: number;
  titleZh: string;
  titleEn: string;
  journal: string;
  date: string;
  articleType: string;
  pmid?: string;
  pmidUrl?: string;
  doi?: string;
  doiUrl?: string;
  sourceUrl?: string;
  summary: string;
  takeaway: string;
  category: string;
  categoryId: string;
  scope: PaperScope;
  indexed: boolean;
  isAppendix: boolean;
}

export interface ReportSection {
  id: string;
  title: string;
  count?: number;
  isCategory: boolean;
  isAppendix: boolean;
}

export interface ReportData {
  meta: ReportMeta;
  categories: Category[];
  sections: ReportSection[];
  papers: Paper[];
  html: string;
}

export type ParsedReportData = Omit<ReportData, 'html'> & { root: MdNode };

type MdNode = {
  type: string;
  depth?: number;
  value?: string;
  url?: string;
  children?: MdNode[];
  data?: {
    hProperties?: Record<string, unknown>;
    [key: string]: unknown;
  };
};

type ParseContext = {
  categoryTitle: string;
  categoryId: string;
  scope: PaperScope;
  isAppendix: boolean;
};

const datePattern = /\b20\d{2}-(?:(?:\d{1,2})(?:-\d{1,2})?|(?:[A-Za-z]{3})(?:-\d{1,2})?)\b/;

function textOf(node: MdNode): string {
  if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') {
    return node.value ?? '';
  }
  return (node.children ?? []).map(textOf).join('');
}

function blockTextOf(node: MdNode): string {
  return (node.children ?? []).map((child) => textOf(child)).join('\n');
}

function cleanText(value: string): string {
  return value.replace(/[ \t\r\f]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

function linksOf(node: MdNode): string[] {
  const links: string[] = [];
  if (node.type === 'link' && node.url) {
    links.push(node.url);
  }
  for (const child of node.children ?? []) {
    links.push(...linksOf(child));
  }
  return links;
}

function slugify(value: string): string {
  const normalized = value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || `section-${hash(value)}`;
}

function hash(value: string): string {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0).toString(36);
}

function headingId(title: string, prefix: string): string {
  return `${prefix}-${slugify(title)}`;
}

function setHeadingId(node: MdNode, id: string): void {
  node.data = {
    ...(node.data ?? {}),
    hProperties: {
      ...(node.data?.hProperties ?? {}),
      id
    }
  };
}

function headingText(node: MdNode): string {
  return cleanText(textOf(node));
}

function parseCategory(title: string): Omit<Category, 'id'> | null {
  if (title.startsWith('附录')) {
    return null;
  }
  const countMatch = title.match(/(\d+)\s*篇\s*）\s*$/u);
  if (!countMatch) {
    return null;
  }
  const categoryTitle = cleanText(
    title
      .slice(0, countMatch.index)
      .replace(/^[一二三四五六七八九十]+、\s*/u, '')
      .replace(/（\s*[^（）]*[，,]\s*$/u, '')
      .replace(/[（(]\s*$/u, '')
  );
  if (!categoryTitle) {
    return null;
  }
  return {
    title: categoryTitle,
    count: Number(countMatch[1]),
    isEdge: categoryTitle.startsWith('【边缘相关】')
  };
}

function parseMeta(sourceText: string): ReportMeta {
  const valueFor = (label: string): string => {
    const match = sourceText.match(
      new RegExp(`\\*\\*${label}\\*\\*：([^\\n]*?)(?=\\s*[|｜]\\s*\\*\\*|\\s+\\*\\*[^*]+\\*\\*：|$)`, 'm')
    );
    return match?.[1]?.trim() ?? '';
  };

  return {
    title: '',
    retrievalDate: valueFor('检索日期'),
    trackingWindow: valueFor('追踪窗口'),
    targetJournal: valueFor('目标期刊'),
    dataSource: valueFor('数据来源'),
    topicScope: valueFor('专题范围')
  };
}

function parsePaper(
  nodes: MdNode[],
  startIndex: number,
  endIndex: number,
  context: ParseContext
): Paper | null {
  const heading = nodes[startIndex];
  if (!heading || heading.type !== 'heading' || heading.depth !== 3) {
    return null;
  }

  const titleWithNumber = headingText(heading);
  const numberMatch = titleWithNumber.match(/^(\d+)\.\s*(.*)$/);
  const number = Number(numberMatch?.[1] ?? 0);
  const titleZh = cleanText(numberMatch?.[2] ?? titleWithNumber);
  const body = nodes.slice(startIndex + 1, endIndex);
  const metaIndex = body.findIndex(
    (node) => node.type === 'paragraph' && datePattern.test(textOf(node))
  );
  if (metaIndex < 0) {
    return null;
  }

  const englishTitleFrom = (node: MdNode): string => {
    const children = node.children ?? [];
    const strongIndex = children.findIndex((child) => child.type === 'strong');
    const titleNode = children
      .slice(0, strongIndex >= 0 ? strongIndex : children.length)
      .find((child) => child.type === 'emphasis');
    return titleNode ? cleanText(textOf(titleNode)) : '';
  };
  const englishIndex = body.findIndex(
    (node, index) => index <= metaIndex && node.type === 'paragraph' && Boolean(englishTitleFrom(node))
  );
  const titleEn = englishIndex >= 0 ? englishTitleFrom(body[englishIndex]) : '';
  const metaNode = body[metaIndex];
  const metaChildren = metaNode.children ?? [];
  const journalNode = metaChildren.find((child) => child.type === 'strong');
  const metadataStart = journalNode ? metaChildren.indexOf(journalNode) : 0;
  const metaText = cleanText(metaChildren.slice(metadataStart).map(textOf).join(''));
  const metadataSegments = metaText.split('·').map((segment) => segment.trim()).filter(Boolean);
  const date = metaText.match(datePattern)?.[0] ?? '';
  const journal = metadataSegments[0] ?? '';
  const articleType =
    metadataSegments
      .slice(2)
      .filter((segment) => !/PMID|DOI|PubMed 未索引/i.test(segment))
      .join(' · ') || '未注明';
  const links = linksOf(metaNode);
  const pmidUrl = links.find((link) => /pubmed\.ncbi\.nlm\.nih\.gov/i.test(link));
  const doiUrl = links.find((link) => /doi\.org\//i.test(link));
  const pmid = metaText.match(/PMID\s+(\d+)/i)?.[1];
  const doi = doiUrl?.match(/doi\.org\/(.+)$/i)?.[1];
  const quoteIndex = body.findIndex((node) => node.type === 'blockquote');
  const summaryEnd = quoteIndex >= 0 ? quoteIndex : body.length;
  const summary = cleanText(
    body
      .slice(metaIndex + 1, summaryEnd)
      .filter((node) => node.type === 'paragraph' || node.type === 'list')
      .map((node) => textOf(node))
      .join('\n\n')
  );
  const takeaway = quoteIndex >= 0
    ? cleanText(blockTextOf(body[quoteIndex]).replace(/^要点\s*[：:]\s*/u, ''))
    : '';
  const idBase = doi ? `doi-${slugify(doi)}` : pmid ? `pmid-${pmid}` : `hash-${hash(`${titleZh}|${date}`)}`;
  const slug = `paper-${idBase}`;

  return {
    id: slug,
    slug,
    number,
    titleZh,
    titleEn,
    journal,
    date,
    articleType,
    pmid,
    pmidUrl,
    doi,
    doiUrl,
    sourceUrl: links[0],
    summary,
    takeaway,
    category: context.categoryTitle,
    categoryId: context.categoryId,
    scope: context.scope,
    indexed: !/PubMed 未索引|预印本/i.test(metaText),
    isAppendix: context.isAppendix
  };
}

function nextHeadingIndex(nodes: MdNode[], startIndex: number, minimumDepth: number): number {
  for (let index = startIndex + 1; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node.type === 'heading' && (node.depth ?? 7) <= minimumDepth) {
      return index;
    }
  }
  return nodes.length;
}

function extractSectionsAndPapers(root: MdNode): {
  categories: Category[];
  sections: ReportSection[];
  papers: Paper[];
} {
  const nodes = root.children ?? [];
  const categories: Category[] = [];
  const sections: ReportSection[] = [];
  const papers: Paper[] = [];
  const usedPaperSlugs = new Set<string>();
  let context: ParseContext | null = null;

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node.type === 'heading' && node.depth === 1) {
      setHeadingId(node, 'report-title');
      continue;
    }
    if (node.type === 'heading' && node.depth === 2) {
      const title = headingText(node);
      const categoryData = parseCategory(title);
      const sectionId = headingId(title, 'section');
      setHeadingId(node, sectionId);
      sections.push({
        id: sectionId,
        title,
        count: categoryData?.count,
        isCategory: Boolean(categoryData),
        isAppendix: title.startsWith('附录')
      });

      if (categoryData) {
        const categoryId = sectionId;
        const category = { id: categoryId, ...categoryData };
        categories.push(category);
        context = {
          categoryTitle: category.title,
          categoryId,
          scope: category.isEdge ? 'edge' : 'core',
          isAppendix: false
        };
      } else if (title.startsWith('附录二')) {
        context = {
          categoryTitle: '姊妹刊附录',
          categoryId: sectionId,
          scope: 'sister',
          isAppendix: true
        };
      } else {
        context = null;
      }
      continue;
    }
    if (node.type !== 'heading' || node.depth !== 3 || !context) {
      continue;
    }

    const endIndex = nextHeadingIndex(nodes, index, 3);
    const paper = parsePaper(nodes, index, endIndex, context);
    if (paper) {
      let uniqueSlug = paper.slug;
      if (usedPaperSlugs.has(uniqueSlug)) {
        const suffixBase = paper.pmid
          ? `paper-pmid-${paper.pmid}`
          : `paper-hash-${hash(`${paper.titleZh}|${paper.date}|${paper.categoryId}|${index}`)}`;
        uniqueSlug = suffixBase;
        let suffix = 2;
        while (usedPaperSlugs.has(uniqueSlug)) {
          uniqueSlug = `${suffixBase}-${suffix}`;
          suffix += 1;
        }
        paper.id = uniqueSlug;
        paper.slug = uniqueSlug;
      }
      usedPaperSlugs.add(uniqueSlug);
      setHeadingId(node, uniqueSlug);
      papers.push(paper);
    }
  }

  return { categories, sections, papers };
}

function reportTitle(root: MdNode): string {
  const titleNode = (root.children ?? []).find((node) => node.type === 'heading' && node.depth === 1);
  return titleNode ? headingText(titleNode) : '医学 LLM / Agent 文献追踪报告';
}

function externalLinks() {
  return (tree: unknown) => {
    visit(tree as never, 'element', (node: any) => {
      const href = String(node.properties?.href ?? '');
      if (!/^https?:\/\//i.test(href)) {
        return;
      }
      node.properties = {
        ...(node.properties ?? {}),
        target: '_blank',
        rel: ['noreferrer']
      };
    });
  };
}

function renderReport(root: MdNode): string {
  const processor = unified().use(remarkRehype).use(externalLinks).use(rehypeStringify);
  const tree = processor.runSync(root as never);
  return String(processor.stringify(tree as never));
}

export function parseReport(markdown: string): ParsedReportData {
  const root = unified().use(remarkParse).use(remarkGfm).parse(markdown) as unknown as MdNode;
  const extracted = extractSectionsAndPapers(root);
  const meta = parseMeta(markdown);
  meta.title = reportTitle(root);
  return { ...extracted, meta, root };
}

export function buildReport(markdown: string): ReportData {
  const parsed = parseReport(markdown);
  return {
    meta: parsed.meta,
    categories: parsed.categories,
    sections: parsed.sections,
    papers: parsed.papers,
    html: renderReport(parsed.root)
  };
}
