import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/mdx-components'
import { mdxOptions } from '@/lib/mdx'

export function Markdown({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} options={mdxOptions} />
}
