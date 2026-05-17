# dev-aidan.com

Personal site for Aidan — Founding Engineer at sprintworks. Built with Next.js 15, deployed on Vercel.

Glass-meets-cyber aesthetic: frosted cards on an animated aurora gradient, mono typography for the
security-flavored bits, a `$ whoami` terminal flourish, and a pixel-art avatar that bobs gently in the hero.

## Stack

- **Next.js 15** (App Router, RSC by default)
- **TypeScript** (strict, with `noUncheckedIndexedAccess`)
- **Tailwind v3.4** + CSS-variable design tokens
- **Framer Motion** for entrance + hover micro-interactions (respects `prefers-reduced-motion`)
- **MDX** via `next-mdx-remote/rsc` + `gray-matter` for the unified blog (tech + security)
- **Shiki + rehype-pretty-code** for syntax highlighting
- **GitHub GraphQL API** for the live "pinned repos" projects grid
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
  page.tsx             # home — hero, about, featured projects, latest posts
  projects/            # /projects + /projects/[slug] case studies
  blog/                # /blog + /blog/[slug] MDX posts
  # (security/ used to be its own section — now merged into /blog with a tag filter)
  talks/               # speaking + podcasts
  certifications/      # cert badges
  contact/             # LinkedIn + GitHub cards only (no inbox, by design)
  opengraph-image.tsx  # dynamic OG image
  robots.ts, sitemap.ts

components/
  site/                # hero, glass-card, aurora-background, pixel-avatar,
                       # terminal-prompt, nav, footer, project-card, etc.
  mdx/                 # custom components usable inside .mdx files
                       # (VulnCallout, CVELink, themed links)

config/site.ts         # ⭐ SINGLE SOURCE OF TRUTH for personal data
content/
  blog/*.mdx           # blog posts
  # (security MDX now lives in blog/ — tag it `security` to surface it in the security filter)
  projects/*.mdx       # optional curated case studies (override GitHub cards)

lib/
  github.ts            # pinned-repos fetcher (cached 1h, graceful fallback)
  posts.ts             # MDX loader + frontmatter typing
  mdx.ts               # MDX options (rehype/remark plugins)
  utils.ts             # cn(), date helpers, slugify
```

## How to update content

### Edit personal data

Open `config/site.ts`. Everything personal lives there — name, blurb, socials, certifications, talks,
"currently exploring" list, nav links, SEO. One file to edit.

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

Write MDX below. You can embed components — for example `<VulnCallout severity="high" title="optional">` or `<CVELink id="CVE-2024-12345" />`.

### Add a security writeup

Security writeups live in the same `content/blog/` folder as everything else — just give the
frontmatter the `security` tag (and any other relevant ones). Optional security-specific frontmatter
fields are recognised:

```yaml
tags: [security, ctf, ...]
severity: low | medium | high | critical | info
cve: CVE-YYYY-NNNNN
```

When present, the post detail page renders a severity chip and links the CVE out to NVD. The header
eyebrow flips from `// blog` to `// writeup`.

### Add a project case study

`content/projects/<slug>.mdx` — these override the GitHub-fetched card if the slug matches a repo name.

```yaml
title: Project name
date: 2026-05-11
summary: One-liner.
repoUrl: https://github.com/...
liveUrl: https://...
stack: [Next.js, TypeScript, Postgres]
```

## Deploying to Vercel

1. **Push to GitHub.** Recommended repo name: `dev-aidan`.
2. **Import on Vercel.** It auto-detects Next.js.
3. **Set env vars** in Project Settings → Environment Variables:
   - `GITHUB_TOKEN` — fine-grained PAT with `Contents: read` and `Metadata: read`.
     Without it, the projects section shows a setup placeholder.
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

(Tip: if you currently have `URL Redirect` records on `@` or `www` in Namecheap, delete them first —
they'll shadow the A/CNAME silently.)

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
- JSON-LD `Person` markup on home (TODO: enable when you fill in the bio)

## Roadmap / things I left as TODOs

- Drop talks/podcasts into `config/site.ts → talks` (auto-hides if empty).
- Fill in `longBio` in your own voice.
- Set `GITHUB_TOKEN` in Vercel to populate the projects grid live.
- (Optional) Add Plausible/Umami if you want analytics.

## License

Code: MIT. Words: CC BY 4.0. Pixel-art avatar: do what you want with it.
