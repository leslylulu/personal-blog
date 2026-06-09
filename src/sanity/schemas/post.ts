import { defineField, defineType } from "sanity";

export const postSchema = defineType({
  name: "post",        // internal name Sanity uses
  title: "Blog Post",  // label shown in the Studio UI
  type: "document",    // "document" = a top-level content item (like a database row)

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",           // "slug" is a special Sanity type with an auto-generate button
      options: {
        source: "title",      // clicking "Generate" will turn the title into a URL-safe slug
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pubDate",
      title: "Published Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",           // "text" = multi-line plain text (good for excerpts)
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",          // "image" = Sanity's built-in image type with upload support
      options: {
        hotspot: true,        // lets you pick the focal point of the image
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",          // "array" = a list
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "code" },
      ],
    }),
  ],
});
