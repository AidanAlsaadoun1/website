import { redirect } from 'next/navigation'

/**
 * /security was merged into /blog. The actual redirect happens at the edge via
 * next.config.mjs `redirects()` (permanent 308). This route is a belt-and-braces
 * fallback for the unlikely case the config redirect doesn't apply.
 *
 * Safe to `rm -rf app/security` locally, keeping the file only because the dev
 * environment couldn't delete it.
 */
export default function Page() {
  redirect('/blog')
}
