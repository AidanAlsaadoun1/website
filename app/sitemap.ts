import type { MetadataRoute } from 'next'
import { siteUrl } from '@/config/site'
import { getAllPosts } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blog = await getAllPosts('blog')

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/projects',
    '/blog',
    '/talks',
    '/certifications',
    '/contact',
  ].map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }))

  const postRoutes: MetadataRoute.Sitemap = blog.map((p) => ({
    url: `${siteUrl}/${p.kind}/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
