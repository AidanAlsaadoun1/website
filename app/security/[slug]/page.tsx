import { redirect } from 'next/navigation'

/**
 * /security/[slug] → /blog/[slug]. Belt-and-braces fallback; primary redirect
 * is wired in next.config.mjs.
 *
 * Safe to delete locally.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/blog/${slug}`)
}
