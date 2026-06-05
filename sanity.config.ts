import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postSchema } from "./src/sanity/schemas/post";

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [structureTool()],  // gives you the full editing UI in the Studio

  schema: {
    types: [postSchema],  // register all your schemas here
  },
});
