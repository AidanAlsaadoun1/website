import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { PostCard } from '@/components/site/post-card'
import { SectionHeading } from '@/components/site/section-heading'
import { EmptyState } from '@/components/site/empty-state'
import { TagFilter } from '@/components/site/tag-filter'
import {
  getAllPosts,
  POST_CATEGORIES,
  POST_CATEGORY_LABELS,
  type PostCategory,
} from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on building software end to end: architecture, delivery, debugging, and the occasional security writeup.',
  alternates: { canonical: '/blog' },
}

type SearchParams = Promise<{ category?: string }>

function isCategory(value: string | undefined): value is PostCategory {
  return value !== undefined && (POST_CATEGORIES as readonly string[]).includes(value)
}

export default async function BlogIndex({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams
  const active = isCategory(category) ? category : undefined
  const posts = await getAllPosts('blog')

  // Fixed three-category filter, no per-tag chip soup.
  const counts: Record<PostCategory, number> = {
    engineering: 0,
    security: 0,
    info: 0,
  }
  for (const p of posts) {
    if (p.frontmatter.category) counts[p.frontmatter.category] += 1
  }

  const options = [
    { label: 'All', value: undefined as string | undefined, count: posts.length },
    ...POST_CATEGORIES.map((c) => ({
      label: POST_CATEGORY_LABELS[c],
      value: c,
      count: counts[c],
    })),
  ]

  const filtered = active ? posts.filter((p) => p.frontmatter.category === active) : posts

  return (
    <section className="container py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Writing' },
        ]}
      />
      <SectionHeading
        level={1}
        eyebrow="Writing"
        tone="butter"
        title="Notes from the build."
        description="What I learned shipping things end to end: architecture calls, delivery habits, and the occasional security writeup. Updated whenever I have something worth saying."
      />

      {posts.length > 0 && (
        <TagFilter
          current={active}
          baseHref="/blog"
          paramName="category"
          options={options}
          ariaLabel="Filter posts by category"
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title={active ? `No ${POST_CATEGORY_LABELS[active]} posts yet` : 'Nothing here yet'}
          description={
            active
              ? 'Try another category, or clear the filter to see everything.'
              : 'Drop a .mdx file in /content/blog/ to get started.'
          }
          hint={active ? undefined : "echo '...post body...' > content/blog/first-post.mdx"}
        />
      ) : (
        <>
          <p className="sr-only" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            {active ? ` in ${POST_CATEGORY_LABELS[active]}` : ''}
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Blog posts">
            {filtered.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} headingLevel={2} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
