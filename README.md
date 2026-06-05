# Lulu Zhang — Personal Blog

A personal blog built with [Astro](https://astro.build) and [Sanity](https://www.sanity.io), featuring CMS-powered posts, dark mode, tag filtering, and RSS feed.

**Live site:** [astrolulu.netlify.app](https://astrolulu.netlify.app)

## Preview

<img src="public/dark-home.png" width="100%" alt="Home page — dark mode" />
<img src="public/light-blog.png" width="100%" alt="Blog page — light mode" />
<img src="public/dark-tags.png" width="100%" alt="Tags page — dark mode" />

## Tech Stack

- **[Astro 6](https://astro.build)** — static site generator
- **[Sanity v3](https://www.sanity.io)** — headless CMS for writing and managing posts
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **[Preact](https://preactjs.com)** — interactive components (e.g. greeting)
- **TypeScript** — type-safe throughout

## Features

- Dark / light mode toggle
- Blog posts managed in Sanity CMS (written in the Studio, fetched via GROQ)
- Embedded Sanity Studio at `/studio` for writing and publishing posts
- Estimated reading time per post
- Tag-based filtering (`/tags`, `/tags/[tag]`)
- RSS feed at `/rss.xml`
- Sticky frosted-glass header
- Responsive mobile navigation
- Modern styled tables in prose content
- Custom code block UI with language labels

## Project Structure

```
/
├── sanity.config.ts           # Sanity Studio config (schema + plugins)
├── .env                       # Sanity credentials (not committed)
├── .env.example               # Template showing required env vars
└── src/
    ├── sanity/
    │   └── schemas/
    │       └── post.ts        # Blog post schema (title, slug, body, tags, etc.)
    ├── content.config.ts      # Sanity loader — fetches posts via GROQ
    ├── components/            # Astro & Preact components
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── MarkdownPostLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── blog.astro         # Lists all posts fetched from Sanity
    │   ├── about.astro
    │   ├── 404.astro
    │   ├── rss.xml.ts
    │   ├── posts/
    │   │   └── [...slug].astro  # Renders a single post (Portable Text → HTML)
    │   └── tags/
    │       ├── index.astro
    │       └── [tag].astro
    ├── scripts/
    │   └── menu.ts
    ├── styles/
    │   └── global.css
    └── utils/
        └── readingTime.ts
```

## Commands

| Command           | Action                               |
| :---------------- | :----------------------------------- |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Type-check and build to `./dist/`    |
| `npm run preview` | Preview the production build locally |

## Writing a Post

Posts are written in **Sanity Studio**, not as local files.

1. Add `http://localhost:4321` to your CORS origins at [manage.sanity.io](https://manage.sanity.io)
2. Run `npm run dev`
3. Go to `http://localhost:4321/studio`
4. Click **Blog Post** → **New post**
5. Fill in the fields — click **Generate** to auto-create the slug from the title
6. Click **Publish**
7. The post appears at `http://localhost:4321/blog`

## Environment Variables

Copy `.env.example` to `.env` and fill in your Sanity project credentials:

```
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

Find these at [manage.sanity.io](https://manage.sanity.io) → your project → **API**.

When deploying to Netlify, add these same variables under **Site configuration → Environment variables**.
