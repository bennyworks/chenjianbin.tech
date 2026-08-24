import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = '/Users/chenjianbin/Documents/knowledge-base/5-文章/06-哲学与技术思辨';
const outputRoot = path.resolve('src/content/blog');
const series = [
    { directory: 'LLM发展的十个哲学问题', key: 'llm', label: 'LLM发展的十个哲学问题', count: 10, tags: ['LLM', '哲学', '意识'] },
    { directory: '深处没有信号', key: 'flow', label: '深处没有信号', count: 8, tags: ['心流', '注意力', 'AI时代'] },
    { directory: '谁在替你思考', key: 'thinking', label: '谁在替你思考', count: 9, tags: ['认识论', '自由意志', '认知外包'] }
];

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

const files = [];
for (const item of series) {
    const directory = path.join(sourceRoot, item.directory);
    for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.md'))) {
        if (filename.startsWith('00-审校报告') || filename === '合规审查报告.md' || filename.startsWith('ARCHIVED-')) continue;
        const stem = filename.replace(/\.md$/, '');
        const match = stem.match(/^(\d+)-/);
        const part = match ? Number(match[1]) : 0;
        const kind = stem.startsWith('00-导读') ? 'intro' : stem.startsWith('00-系列索引') ? 'index' : 'article';
        const id = `${item.key}-${kind === 'article' ? String(part).padStart(2, '0') : kind}`;
        files.push({ ...item, filename, stem, part, kind, id, source: path.join(directory, filename) });
    }
}

const byTitle = new Map(files.map((file) => [file.stem.replace(/^\d+-/, ''), file.id]));
const byTitleWithPrefix = new Map(files.map((file) => [file.stem, file.id]));

function frontmatterValue(text, key) {
    const match = text.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return match?.[1]?.trim().replace(/^['"]|['"]$/g, '');
}

function titleFromBody(body) {
    return body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? '未命名文章';
}

function stripFrontmatter(text) {
    if (!text.startsWith('---')) return text;
    const end = text.indexOf('\n---', 3);
    return end === -1 ? text : text.slice(end + 4).replace(/^\s+/, '');
}

function replaceLinks(body) {
    return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
        const cleanTarget = target.trim().replace(/\.md$/, '');
        const id = byTitle.get(cleanTarget) ?? byTitleWithPrefix.get(cleanTarget);
        return id ? `[${label?.trim() || cleanTarget}](../${id}/)` : label?.trim() || cleanTarget;
    });
}

for (const file of files) {
    const raw = fs.readFileSync(file.source, 'utf8');
    const bodyWithoutFrontmatter = stripFrontmatter(raw);
    const title = frontmatterValue(raw, 'title')?.replace(/^['"]|['"]$/g, '') || titleFromBody(bodyWithoutFrontmatter);
    const excerpt = frontmatterValue(raw, 'summary') || (file.kind === 'intro' ? `${file.label}系列导读` : file.kind === 'index' ? `${file.label}系列索引` : `${file.label}系列第${file.part}篇`);
    const keywords = frontmatterValue(raw, 'keywords');
    const tags = keywords ? keywords.replace(/^\[|\]$/g, '').split(',').map((tag) => tag.trim()).filter(Boolean) : file.tags;
    const publishDate = `2026-08-${String(Math.max(1, 24 - file.part)).padStart(2, '0')}`;
    const body = replaceLinks(bodyWithoutFrontmatter).replace(/^#\s+.+\n+/, '');
    const output = `---\ntitle: ${JSON.stringify(title)}\nexcerpt: ${JSON.stringify(excerpt)}\npublishDate: ${publishDate}\nseries: ${JSON.stringify(file.label)}\nseriesId: ${file.key}\npart: ${file.part}\nkind: ${file.kind}\ntags: ${JSON.stringify([...new Set([...file.tags, ...tags])])}\nisFeatured: ${file.kind !== 'article' || file.part === 1}\n---\n\n${body.trim()}\n`;
    fs.writeFileSync(path.join(outputRoot, `${file.id}.md`), output);
}

console.log(`Migrated ${files.length} publishable articles to ${outputRoot}`);
