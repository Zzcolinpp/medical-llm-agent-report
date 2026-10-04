import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Root, Heading, RootContent } from 'mdast';
import type { Paper, ReportData, ReportSection, Category } from './report-parser';

const datePattern = /20\d{2}-\d{2}-\d{2}/;
const idFor = (title: string) => title.normalize('NFKC').toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-|-$/g, '');

/** Read the supplied report without rewriting its evidence or adding conclusions. */
export function buildSourceReport(markdown: string, monthly = false): ReportData {
  const source = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  const root = unified().use(remarkParse).use(remarkGfm).parse(source) as Root;
  const nodes = root.children;
  const papers: Paper[] = [];
  const sections: ReportSection[] = [];
  const categories: Category[] = [];
  let section = '';
  let category: Category | undefined;
  const headingId = (node: Heading, id: string) => {
    node.data = { ...node.data, hProperties: { id } };
  };

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.type !== 'heading') continue;
    const title = toString(node);
    const record = title.match(/^([AB]-[JP]\d+|[JFC]-\d+|FARXIV\d{4}\.\d+|[RF][a-f0-9]{10})\s*[｜·]/);
    const id = record?.[1] ?? `section-${index}-${idFor(title)}`;
    headingId(node, id);
    if (node.depth === 2) {
      section = title;
      category = undefined;
      sections.push({ id, title, isCategory: false, isAppendix: /^6\./.test(title) });
    }
    if (node.depth === 3 && !record) {
      const isCategory = monthly && /^4\./.test(section);
      sections.push({ id, title, isCategory, isAppendix: /^6\./.test(section) });
      if (isCategory) {
        category = { id, title, count: 0, isEdge: /PERIPHERAL|边缘/.test(title) };
        categories.push(category);
      }
    }
    if (!monthly || !record || !/^[46]\./.test(section)) continue;
    let end = index + 1;
    while (end < nodes.length && !(nodes[end].type === 'heading' && (nodes[end] as Heading).depth <= node.depth)) end++;
    const body = nodes.slice(index + 1, end);
    const paragraphs = body.filter((item) => item.type === 'paragraph');
    const english = paragraphs[0]?.children[0] ? toString(paragraphs[0].children[0]) : '';
    const metadataLine = (item: typeof paragraphs[number]) => source.slice(item.position!.start.offset, item.position!.end.offset)
      .split('\n').find((line) => datePattern.test(line) && /[｜；·]/.test(line));
    const metaIndex = paragraphs.findIndex((item) => Boolean(metadataLine(item)));
    if (metaIndex < 0) throw new Error(`Missing record date: ${record[1]}`);
    const metadata = metadataLine(paragraphs[metaIndex])!.replaceAll('**', '').trim();
    const parts = metadata.split(/[｜；·]/).map((part) => part.trim());
    const surgery = /^R/.test(record[1]);
    const journal = parts[surgery ? 1 : 0];
    const date = metadata.match(datePattern)![0];
    const type = /^6\./.test(section) ? `前沿记录 · ${parts.slice(2).join(' · ')}` : parts[surgery ? 3 : 2];
    const urls: string[] = [];
    for (const item of body) visit(item, 'link', (link) => { if (/^https?:\/\//.test(link.url)) urls.push(link.url); });
    const text = body.map((item) => toString(item)).join('\n');
    const doi = urls.find((url) => /doi\.org\//.test(url))?.split('doi.org/')[1]
      ?? text.match(/10\.\d{4,9}\/[^\s\]）；;。]+/)?.[0];
    const pmid = text.match(/PMID[：:\s]*(\d+)/)?.[1];
    const summary = paragraphs.slice(metaIndex + 1)
      .map((item) => toString(item))
      .filter((value) => !/^(<a id=|作者[：:]|记录ID[：:]|\s*(?:官方原文|原文|首次发布日期))/.test(value))
      .join('\n\n');
    const isEdge = /\bperipheral\b|PERIPHERAL/.test(metadata) || category?.isEdge;
    let paperCategory = category;
    if (/^6\./.test(section)) {
      paperCategory = categories.find((item) => item.id === 'frontier-records');
      if (!paperCategory) {
        paperCategory = { id: 'frontier-records', title: '前沿附录（预印本、会议与版本记录）', count: 0, isEdge: false };
        categories.push(paperCategory);
        const frontierHeading = nodes.find((item) => item.type === 'heading' && item.depth === 2 && /^6\./.test(toString(item))) as Heading;
        headingId(frontierHeading, paperCategory.id);
        const frontierSection = sections.find((item) => /^6\./.test(item.title));
        if (frontierSection) frontierSection.id = paperCategory.id;
      }
    }
    if (!paperCategory) throw new Error(`Missing category: ${record[1]}`);
    if (!journal || !summary || !urls.length) throw new Error(`Incomplete record: ${record[1]}`);
    paperCategory.count++;
    papers.push({
      id, slug: id, number: papers.length + 1, titleZh: title.replace(/^.*?[｜·]\s*/, ''), titleEn: english,
      journal, date, articleType: type || '未注明', summary, takeaway: '',
      doi, doiUrl: doi ? `https://doi.org/${doi}` : undefined,
      pmid, pmidUrl: pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : undefined,
      sourceUrl: urls[0], category: paperCategory.title, categoryId: paperCategory.id,
      scope: isEdge ? 'edge' : 'core', indexed: Boolean(pmid), isAppendix: /^6\./.test(section)
    });
  }

  // The report files reference audit attachments on another computer; none are supplied.
  visit(root, 'link', (node: any) => {
    if (!/^(https?:\/\/|#)/.test(node.url)) {
      node.type = 'text'; node.value = `${toString(node)}（本地附件未上传）`;
      delete node.children; delete node.url;
    }
  });
  // Preserve source anchors used by the report's tables and reading links.
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.type !== 'html') continue;
    const anchor = node.value.match(/^<a id="([^"]+)"\s*><\/a>$/);
    if (!anchor) continue;
    const nextHeading = nodes.slice(index + 1).find((item) => item.type === 'heading') as Heading | undefined;
    if (nextHeading && (nextHeading.data?.hProperties as any)?.id === anchor[1]) continue;
    nodes[index] = { type: 'paragraph', children: [{ type: 'text', value: '' }], data: { hProperties: { id: anchor[1] } } } as RootContent;
  }
  const processor = unified().use(remarkRehype).use(() => (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (/^https?:\/\//.test(node.properties?.href ?? '')) node.properties = { ...node.properties, target: '_blank', rel: ['noreferrer'] };
    });
  }).use(rehypeStringify);
  const html = String(processor.stringify(processor.runSync({ ...root, children: nodes.filter((node) => node.type !== 'heading' || node.depth !== 1) })));
  const intro = source.slice(0, 2500);
  const retrievalDate = intro.match(/(?:实际检索[^：:\n]{0,12}|执行日期)[：:\s]*(20\d{2}-\d{2}-\d{2})/)?.[1]
    ?? markdown.match(/screening_date:\s*"?(20\d{2}-\d{2}-\d{2})/)?.[1] ?? '';
  const trackingWindow = intro.match(/20\d{2}-\d{2}-\d{2}[—至~～]\s*20\d{2}-\d{2}-\d{2}/)?.[0]
    ?? markdown.match(/source_window:\s*"([^"]+)"/)?.[1] ?? '';
  return {
    meta: { title: toString(nodes.find((item) => item.type === 'heading' && item.depth === 1)!), retrievalDate, trackingWindow, targetJournal: '', dataSource: '', topicScope: '' },
    papers, sections, categories, html
  };
}
