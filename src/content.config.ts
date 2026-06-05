import { defineCollection } from "astro:content";
import { createClient } from "@sanity/client";
import { loadEnv } from "vite";

// loadEnv is needed here (same as in astro.config.mjs) because content.config.ts
// also runs before Vite, so import.meta.env is not available here either
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  ""
);

const blog = defineCollection({
  loader: {
    name: "sanity-blog",

    // Astro calls this function at build time (and in dev mode on startup)
    // to populate the content collection with data from Sanity
    async load({ store }) {
      const client = createClient({
        projectId: PUBLIC_SANITY_PROJECT_ID,
        dataset: PUBLIC_SANITY_DATASET,
        apiVersion: "2026-06-05",
        useCdn: false,
      });

      // GROQ query — Sanity's query language
      // *[_type == "post"]  →  fetch every document where type is "post"
      // "slug": slug.current  →  rename slug.current to just "slug" (a flat string)
      // image { "url": asset->url, alt }  →  resolve the image asset URL
      const posts = await client.fetch(
        `*[_type == "post"] | order(pubDate desc) {
          _id,
          title,
          "slug": slug.current,
          pubDate,
          description,
          author,
          image { "url": asset->url, alt },
          tags,
          body
        }`
      );

      store.clear();

      for (const post of posts) {
        store.set({
          id: post.slug,   // used as the URL segment: /posts/my-first-post
          data: post,
        });
      }
    },
  },
});

export const collections = {
  blog,
};
