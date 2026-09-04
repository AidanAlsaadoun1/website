# dev-aidan.com

My personal site, full-stack software engineer and Founding Engineer at
sprintworks. Built with Next.js 15, deployed on Vercel.

Editorial engineering portfolio with a light zine accent: warm cream paper, Instrument Serif display
type, straight sticker cards with ink borders and hard offset shadows, pastel pops used as accents.
The site is built to be read by hiring managers: the hero states the role, an "at a glance" panel
carries the facts, projects are written up as case studies (with an HTML architecture diagram for the
settlement engine), and there is a real Experience section. Security is positioned as a mindset the
engineer builds with, not a second identity.

## Stack

- **Next.js 15** (App Router, RSC by default)
- **TypeScript** (strict, with `noUncheckedIndexedAccess`)
- **Tailwind v3.4** + CSS-variable design tokens (`app/globals.css` holds the palette and type system)
- **Instrument Serif** self-hosted via `@fontsource` for display type; Geist Sans/Mono for everything else
- **Framer Motion** for entrance + hover micro-interactions (respects `prefers-reduced-motion`)
- **MDX** via `next-mdx-remote/rsc` + `gray-matter` for the unified blog (tech + security)
- **Shiki + rehype-pretty-code** for syntax highlighting
- **GitHub REST API** for live repo metadata (stars, language, last push) merged into curated case studies; works without a token
- **pnpm** for package management

Hosting target: **Vercel free tier**. Total expected cost: **$0/mo**.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # optionally fill in GITHUB_TOKEN
pnpm dev                     # → http://localhost:3000
```

Production build:

```bash
pnpm build && pnpm start
```

Type-check + lint:

```bash
pnpm type-check
pnpm lint
```

## Project tour

```
app/                   # routes (App Router)
  page.tsx             # home: hero + at-a-glance, selected work, experience,
                       # what I do + security mindset, about, writing, contact CTA
  projects/            # /projects (all case studies) + /projects/[slug] (detail)
  blog/                # /blog + /blog/[slug] MDX posts ("Writing" in the nav)
  certifications/      # verifiable credentials (linked from Experience + footer)
  talks/               # speaking + podcasts (hidden from nav until there are some)
  contact/             # LinkedIn + GitHub (+ email / CV when configured)
  opengraph-image.tsx  # OG image, generated at build
  robots.ts, sitemap.ts

components/
  site/                # hero, at-a-glance, nav, footer, project-card, system-diagram,
                       # experience, terminal-block, post-card, section-heading,
                       # glass-card, breadcrumbs, tag-filter, reveal, pixel-avatar
  ui/                  # pill-button (PillLink/PillButton/pillClassName), smart-link
  mdx/                 # custom components usable inside .mdx files
                       # (VulnCallout, CVELink, themed links)

config/site.ts         # ⭐ SINGLE SOURCE OF TRUTH for personal data, experience, nav, SEO
config/projects.ts     # ⭐ case-study content per project (sourced from each repo's README)
content/
  blog/*.mdx           # blog posts (`featured: true` pins a post to the home page)
  projects/*.mdx       # optional long-form body appended to a case-study page

lib/
  github.ts            # repo metadata fetcher (REST, cached 1h, token optional, graceful)
  posts.ts             # MDX loader + frontmatter typing, getHomePosts()
  mdx.ts               # MDX options (rehype/remark plugins)
  utils.ts             # cn(), date helpers, slugify
```

## How to update content

### Edit personal data

Open `config/site.ts`. Everything personal lives there: headline, blurb, "at a glance" facts,
experience entries, capabilities, security points, certifications, talks, nav links, SEO.

### CV (intentionally not published)

The CV is shared directly, on request, so `cv.url` in `config/site.ts` is empty and no "Download CV"
affordance renders anywhere. If that ever changes: drop the PDF in `public/`, set `cv.url`, and the nav
button, hero CTA, at-a-glance link, footer link and contact card all appear automatically.

### Add a public email

Set `email` in `config/site.ts`. The footer and contact page pick it up; leave it empty for no inbox.

### Add or edit a project case study

Open `config/projects.ts`. Each entry has `summary` (what it is), `why` (why it's technically
interesting), `built` (what you personally built), `concepts`, `stack`, optional `limitations`,
`diagram` (rendered by `<SystemDiagram>`), `terminal` (a verbatim sample) and links. Keep every claim
traceable to the repo's README. `featured: true` puts it on the home page; the first featured project
gets the wide card. Live stars / language / last push come from GitHub at render time.

### Add a blog post

```
content/blog/<slug>.mdx
```

Frontmatter:

```yaml
---
title: Your post title
date: 2026-05-11
summary: One-line summary for cards and OG previews.
tags: [tag1, tag2]
draft: false
---
```

Write MDX below. You can embed components, for example `<VulnCallout severity="high" title="optional">` or `<CVELink id="CVE-2024-12345" />`.

### Add a security writeup

Security writeups live in the same `content/blog/` folder as everything else, just give the
frontmatter the `security` tag (and any other relevant ones). Optional security-specific frontmatter
fields are recognised:

```yaml
tags: [security, ctf, ...]
severity: low | medium | high | critical | info
cve: CVE-YYYY-NNNNN
```

When present, the post detail page renders a severity chip and links the CVE out to NVD. The header
eyebrow flips from `// blog` to `// writeup`.

### Long-form project write-up (optional)

`content/projects/<slug>.mdx` (slug = repo name) is rendered below the structured case study on
`/projects/<slug>`. Frontmatter needs `title`, `date` and `summary`.

## Deploying to Vercel

1. **Push to GitHub.** Recommended repo name: `dev-aidan`.
2. **Import on Vercel.** It auto-detects Next.js.
3. **Set env vars** in Project Settings → Environment Variables:
   - `GITHUB_TOKEN` (optional), fine-grained PAT with `Metadata: read`. Raises the GitHub rate
     limit; without it the live stars / last-push metadata still loads unauthenticated (60 req/h,
     cached for an hour).
   - `NEXT_PUBLIC_SITE_URL=https://dev-aidan.com`
4. **First deploy** happens automatically.

### Pointing dev-aidan.com (Namecheap) at Vercel

In Vercel: **Project → Settings → Domains → Add `dev-aidan.com`**. Vercel will tell you the exact DNS records.

In Namecheap: **Domain List → Manage → Advanced DNS → Add New Record**:

| Type  | Host | Value                        |
|-------|------|------------------------------|
| A     | `@`  | `76.76.21.21`                |
| CNAME | `www`| `cname.vercel-dns.com.`      |

Wait a minute for SSL provisioning, then visit `https://dev-aidan.com`.

(Tip: if you currently have `URL Redirect` records on `@` or `www` in Namecheap, delete them first, they'll shadow the A/CNAME silently.)

### Then: shut down AWS

Once the new site is live:

1. Set the old CloudFront distribution to disabled, then delete after propagation.
2. Empty + delete the S3 bucket.
3. Delete the Route 53 hosted zone (you've moved DNS to Namecheap, so this is safe).
4. Delete any Lambdas / ACM certificates / unused IAM roles.
5. Close any CloudWatch alarms that emailed you.

## Accessibility and performance

- All animations honor `prefers-reduced-motion`
- Skip-to-content link at the top
- Focus rings use the accent color and are visible
- Color contrast ≥ AA across body text
- `next/image` for all bitmaps
- `next/font` (Geist) for zero-CLS font loading
- Server Components by default; `'use client'` only where actually needed
- JSON-LD `Person` markup on the home page; canonical URLs on every route
- The hero is a Server Component with a CSS-only entrance; Framer Motion is limited to the nav and
  scroll reveals

## Roadmap / things left as TODOs

- The site deliberately carries no "open to roles" messaging and no public CV; both are one config
  change away (`cv.url`, plus copy in `config/site.ts`) if that ever changes.
- Drop talks/podcasts into `config/site.ts → talks` and re-add `/talks` to `navLinks`.

## License

Code: MIT. Words: CC BY 4.0.
