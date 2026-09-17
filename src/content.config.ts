import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().optional(),
    authorPhoto: z.string().optional(),
    category: z.enum(['official', 'community']).default('official'),
    tag: z.enum(['ClawMem', 'AGS', 'Use case', 'Product announcement']),
    coverImage: z.string().optional(),
    coverBackground: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    coverText: z.string().optional(),
    coverTheme: z.enum(['coral', 'mint', 'sky', 'sand', 'plum']).default('coral'),
  }).superRefine((post, ctx) => {
    if (post.category === 'community' && !post.author?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['author'], message: 'Community posts must credit their author.' });
    }
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  blog,
};
