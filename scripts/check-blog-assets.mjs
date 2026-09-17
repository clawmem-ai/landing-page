import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Run from the project root after `npm run build`.
const categories = {
  ClawMem: 'clawmem',
  AGS: 'ags',
  'Use case': 'use-case',
  'Product announcement': 'product-announcement',
};
const files = (await readdir('src/content/blog')).filter((name) => name.endsWith('.md'));
let covers = 0;
for (const name of files) {
  const source = await readFile(`src/content/blog/${name}`, 'utf8');
  const frontmatter = source.split(/^---\s*$/m)[1];
  assert(frontmatter, `${name}: missing frontmatter`);
  const field = (key) => frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)`, 'm'))?.[1].trim();
  const category = categories[field('tag')];
  assert(category, `${name}: missing/invalid single tag`);
  const cover = field('coverImage');
  if (!cover) continue; // Future posts can intentionally use a text cover.
  assert(cover.startsWith('/blog/') && !cover.includes('..'), `${name}: cover must be a site-local blog asset`);
  const asset = `public${cover}`;
  const bytes = await readFile(asset);
  assert.deepEqual(await readFile(`dist${cover}`), bytes, `${name}: deployed image differs`);
  await sharp(bytes).raw().toBuffer(); // Fully decode, not just a valid file extension/header.
  for (const page of ['dist/blog/index.html', `dist/blog/category/${category}/index.html`]) {
    assert((await readFile(page, 'utf8')).includes(`src="${cover}"`), `${page}: missing ${cover}`);
  }
  if (process.argv.includes('--tracked')) {
    const staged = execFileSync('git', ['show', `:${asset}`], { maxBuffer: 32 * 1024 * 1024 });
    assert.deepEqual(staged, bytes, `${asset}: image missing or different in Git index`);
  }
  covers++;
}

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  }));
  return nested.flat();
}
const localImages = new Set();
for (const page of await htmlFiles('dist/blog')) {
  const html = await readFile(page, 'utf8');
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1];
    if (/^(https?:|data:|\/\/)/.test(src)) continue;
    assert(src.startsWith('/'), `${page}: unexpected relative image path ${src}`);
    const file = path.resolve('dist', `.${decodeURIComponent(src.split(/[?#]/)[0])}`);
    assert(file.startsWith(`${path.resolve('dist')}${path.sep}`), `${page}: image escapes dist`);
    assert((await readFile(file)).length > 0, `${page}: empty image ${src}`);
    localImages.add(src);
  }
}
console.log(`Verified ${covers}/${files.length} post covers, category references, and ${localImages.size} local blog images${process.argv.includes('--tracked') ? '; cover bytes match Git index' : ''}.`);
