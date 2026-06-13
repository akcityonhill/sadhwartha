import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // The glob pattern picks up files in ALL subfolders (en/, ml/, hi/) automatically.
  // File id will be the relative path e.g. "en/arise-and-shine"
  // → URL becomes /blog/en/arise-and-shine
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string().optional(),
      designation: z.string().optional(),
      authorImage: z.optional(image()),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),

      // Language of this article — must match the subfolder (en | ml | hi)
      language: z.enum(["en", "ml", "hi"]),

      // Optional links to translated versions of this article.
      // Only add a key when the translated article is published and live.
      // Value is the filename slug WITHOUT the language prefix.
      // e.g. translations: { en: 'arise-and-shine' }
      translations: z
        .object({
          en: z.string().optional(),
          ml: z.string().optional(),
          hi: z.string().optional(),
        })
        .optional(),
    }),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      language: z.enum(["en", "ml", "hi"]),
      translations: z
        .object({
          en: z.string().optional(),
          ml: z.string().optional(),
          hi: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { blog, news };
