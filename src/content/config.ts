import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    tags: z.union([
      z.array(z.string()),
      z.string()
    ]).transform((val) => {
      if (Array.isArray(val)) return val;
      return val.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }).optional(),
  }),
});

export const collections = { blog };
