import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'github-dark-default',
  keepBackground: false,
  defaultLang: 'plaintext',
}

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
  },
}
