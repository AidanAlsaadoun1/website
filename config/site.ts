/**
 * Single source of truth for everything personal on the site.
 * Edit this file (and the MDX content under /content), that's it.
 */

export type Certification = {
  name: string
  issuer: string
  issuedAt: string // ISO date (day precision; only month + year is rendered)
  expiresAt?: string // ISO date, optional
  credentialUrl?: string
  credentialId?: string
  badgeUrl?: string
  skills?: string[]
  /** Optional short narrative shown on the cert card (max ~3 sentences). */
  description?: string
}

export type Talk = {
  title: string
  event: string
  date: string // ISO date
  url?: string
  type: 'conference' | 'podcast' | 'meetup' | 'workshop'
}

export type CurrentlyBuilding = {
  title: string
  description: string
  link?: string
}

/** A "what I actually do" card on the home page. */
export type Capability = {
  title: string
  summary: string
  bullets: string[]
}

/** One row of the stack table. */
export type StackGroup = {
  label: string
  items: string[]
}

/** Key/value pairs shown in the hero side panel. */
export type Fact = {
  label: string
  value: string
}

export const siteConfig = {
  name: 'Aidan',
  fullName: 'Aidan Alsaadoun',
  role: 'Founding Engineer',
  discipline: 'Full-stack engineer',
  // intentionally lowercase, per Aidan
  company: {
    name: 'sprintworks',
    url: '', // TODO: drop in the sprintworks URL if you want it linked
  },
  location: 'United Kingdom',
  availability: 'Open to interesting problems',

  /**
   * Short blurb under the hero. Keep it punchy, one or two sentences.
   */
  blurb:
    'The screen you see, the API behind it, the infra underneath. Right now: building sprintworks from zero.',

  /**
   * Longer about-page paragraph. Drop your own words in here when you're ready.
   */
  longBio:
    "I'm the founding engineer at sprintworks, which means I own features the whole way down: React at the top, TypeScript in the middle, AWS underneath. I like types that make bad states impossible and deploys boring enough for a Friday. And the security habit from my pentesting days never left: I threat-model in the design review, not after the incident.",

  /** One-line answer to "so what do you actually do?", used on the home page. */
  positioning:
    'Product-minded engineering across the whole stack, from the first component to the production alarm.',

  socials: {
    github: 'AidanAlsaadoun1',
    linkedin: 'https://www.linkedin.com/in/aidan-a-80a037255/',
  },

  /**
   * Hero side panel. Short, factual, scannable, the things a hiring manager
   * or founder wants in the first five seconds.
   */
  facts: [
    { label: 'Role', value: 'Founding Engineer, sprintworks' },
    { label: 'Focus', value: 'Full-stack product engineering' },
    { label: 'Core stack', value: 'TypeScript · React · Node · AWS' },
    { label: 'Based in', value: 'United Kingdom' },
  ] satisfies Fact[] as Fact[],

  /**
   * "What I do", three cards on the home page.
   * TODO: trim anything here you wouldn't want to be quizzed on.
   */
  capabilities: [
    {
      title: 'Product & interface',
      summary: 'The part people touch. Fast, accessible, fun to use.',
      bullets: ['React & Next.js', 'Design systems & Storybook', 'Accessibility & Web Vitals'],
    },
    {
      title: 'APIs & data',
      summary: 'Typed contracts and schemas that stay sane as things grow.',
      bullets: ['TypeScript, Java & Go', 'GraphQL & REST', 'PostgreSQL & DynamoDB'],
    },
    {
      title: 'Cloud & delivery',
      summary: 'Ship it, then keep it boring. Alarms before users notice.',
      bullets: ['AWS (2× certified)', 'SST v3 & infra as code', 'CI/CD & observability'],
    },
  ] satisfies Capability[] as Capability[],

  /**
   * The stack table. Keep it honest, these are the things you'd be happy
   * to be handed a ticket in tomorrow morning.
   */
  stack: [
    { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Go', 'Python', 'SQL', 'Bash'] },
    { label: 'Front end', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Storybook'] },
    { label: 'Back end', items: ['Node.js', 'GraphQL / AppSync', 'REST', 'Drizzle ORM', 'PostgreSQL', 'DynamoDB'] },
    { label: 'Cloud & tooling', items: ['AWS', 'SST v3', 'Vercel', 'Docker', 'GitHub Actions', 'Vitest'] },
  ] satisfies StackGroup[] as StackGroup[],

  certifications: [
    {
      name: 'Career Development Mentorship',
      issuer: 'MentorCruise',
      issuedAt: '2026-04-01',
      description:
        'Bi-weekly 1:1 mentorship with a Staff Engineer at Meta. We set deadlines, ship goals, and run grilling-style design and architecture reviews to find and patch weaknesses in my thinking.',
      skills: ['Time Management', 'Solution Architecture', 'System Design'],
      // TODO: drop the public-facing credential URL here if MentorCruise issues one
      credentialUrl: 'https://mentorcruise.com/',
    },
    {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      issuedAt: '2025-05-01',
      credentialId: '3c4f95f1c5b540b7a29f87db5f7506b2',
      credentialUrl:
        'https://cp.certmetrics.com/amazon/en/public/verify/credential/3c4f95f1c5b540b7a29f87db5f7506b2',
    },
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      issuedAt: '2025-05-01',
      expiresAt: '2028-05-01',
      credentialId: '75861d305dfa46ffa1edd03d52e72011',
      credentialUrl:
        'https://cp.certmetrics.com/amazon/en/public/verify/credential/75861d305dfa46ffa1edd03d52e72011',
    },
    {
      name: 'PJPT: Practical Junior Penetration Tester',
      issuer: 'TCM Security',
      issuedAt: '2024-10-01',
      credentialId: '118350064',
      credentialUrl: 'https://www.credential.net/118350064',
      badgeUrl:
        'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/118350064?key=0072db6c8b331990a80d197a4c4ff683fbedf911995e068e0a79865b5ae4b32f',
    },
  ] satisfies Certification[] as Certification[],

  talks: [
    // example shape
    // {
    //   title: 'How we replatformed off AWS in a weekend',
    //   event: 'LeedsJS',
    //   date: '2025-09-12',
    //   url: 'https://...',
    //   type: 'meetup',
    // },
  ] satisfies Talk[] as Talk[],

  /**
   * "Currently building", shown on the home page. Keep it present-tense and
   * concrete; this is the section people read to see whether you're active.
   */
  currentlyBuilding: [
    {
      title: 'sprintworks, from zero',
      description: 'First services, product architecture, delivery habits.',
    },
    {
      title: 'Type-safe data access',
      description: 'Drizzle helpers so schema and queries stop drifting.',
    },
    {
      title: 'A design system that survives contact',
      description: 'Storybook, visual review, a11y tests in CI.',
    },
    {
      title: 'Threat modelling upstream',
      description: 'STRIDE in the design review, before the PR.',
    },
  ] satisfies CurrentlyBuilding[] as CurrentlyBuilding[],

  /**
   * Optional curated case-study slugs. Items here override the GitHub-pinned card.
   * Files live in /content/projects/<slug>.mdx
   */
  featuredProjectSlugs: [] as string[],

  navLinks: [
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/talks', label: 'Talks' },
    { href: '/certifications', label: 'Certs' },
    { href: '/contact', label: 'Contact' },
  ],

  seo: {
    title: 'Aidan Alsaadoun · Full-Stack Engineer',
    description:
      'Full-stack engineer and Founding Engineer at sprintworks. I build products end to end with TypeScript, React, Node and AWS, and write about it.',
    keywords: [
      'Aidan Alsaadoun',
      'full-stack engineer',
      'Founding Engineer',
      'sprintworks',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Java',
      'Go',
      'AWS',
      'software engineer UK',
    ],
  },
} as const

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dev-aidan.com'
