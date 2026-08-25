import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).optional()
    });

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            excerpt: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            isFeatured: z.boolean().default(false),
            tags: z.array(z.string()).default([]),
            series: z.string().optional(),
            seriesId: z.string().optional(),
            part: z.number().int().nonnegative().optional(),
            kind: z.enum(['intro', 'article']).default('article'),
            seo: seoSchema(image).optional()
        })
});

export const collections = { blog };
