// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import preact from "@astrojs/preact";

import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// loadEnv reads your .env file in astro.config.mjs
// - first arg: the current mode (development, production, etc.)
// - second arg: the root folder to look for .env files
// - third arg: '' means load ALL variables (not just ones with a specific prefix)
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  ''
);

// https://astro.build/config
export default defineConfig({
  site: "https://astro-study-sigma.vercel.app/",
  integrations: [
    preact(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false,
      logClientRequests: 'dev',
      apiVersion: "2026-06-05",
      studioBasePath: "/studio",  // the Studio UI will live at localhost:4321/studio
    }),
    react(),
    sitemap()
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  }
});