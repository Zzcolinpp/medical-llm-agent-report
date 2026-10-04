import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  monthly: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/monthly' }) }),
  supplemental: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/supplemental' }) })
};
