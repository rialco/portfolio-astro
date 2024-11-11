// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.string().transform((str) => new Date(str)),
        description: z.string(),
        tags: z.array(z.string()),
        thumbnail: z.string(),
        videoId: z.string(),
        videoDescription: z.string(),
    }),
});

export const collections = {
    blog: blogCollection,
};

