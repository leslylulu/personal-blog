// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://astrolulu.netlify.app/",
  integrations: [preact()],

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
