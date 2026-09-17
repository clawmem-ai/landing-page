import { getCollection } from 'astro:content';

export const blogCategories = [
  { id: 'all', label: 'All posts', href: '/blog/', description: 'Product updates, practical guides, and stories from the community.' },
  { id: 'clawmem', label: 'ClawMem', href: '/blog/category/clawmem/', description: 'Articles about ClawMem.' },
  { id: 'ags', label: 'AGS', href: '/blog/category/ags/', description: 'Articles about Agent Git Service.' },
  { id: 'use-case', label: 'Use case', href: '/blog/category/use-case/', description: 'Practical applications and workflows.' },
  { id: 'product-announcement', label: 'Product announcement', href: '/blog/category/product-announcement/', description: 'Product releases and updates.' },
] as const;

export type BlogCategory = typeof blogCategories[number]['id'];

export async function getBlogPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatBlogDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
