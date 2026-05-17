/**
 * Single source of truth for everything personal on the site.
 * Edit this file (and the MDX content under /content) — that's it.
 */

export type Certification = {
  name: string
  issuer: string
  issuedAt: string // ISO date (day precision; only month + year is rendered)
  expiresAt?: string // ISO date — optional
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

export type CurrentlyExploring = {
  title: string
  description: string
  link?: string
}

export const siteConfig = {
  name: 'Aidan',
  fullName: 'Aidan Alsaadoun',
  role: 'Founding Engineer',
  // intentionally lowercase, per Aidan
  company: {
    name: 'sprintworks',
    url: '', // TODO: drop in the sprintworks URL if you want it linked
  },
  location: 'United Kingdom',

  /**
   * Short blurb under the hero. Keep it punchy — one or two sentences.
   * The whole site reads in "warm & nerdy" voice; calibrate accordingly.
   */
  blurb:
    "Full-stack engineer with a soft spot for packet captures and breaking things on purpose. Currently building from zero at sprintworks.",

  /**
   * Longer about-page paragraph. Drop your own words in here when you're ready —
   * I'd rather you wrote it than I invented it.
   */
  longBio:
    "I'm a full-stack engineer working as a Founding Engineer at sprintworks. Day to day that means shipping product across the stack, but the corner of my brain that doesn't sleep is the one obsessed with how systems break — vulnerability analysis, threat modelling, the occasional CTF. This site is where I write that down, link the work I'm proud of, and keep a tidy list of certifications so I don't lose them in a drawer.",

  socials: {
    github: 'AidanAlsaadoun1',
    linkedin: 'https://www.linkedin.com/in/aidan-a-80a037255/',
  },

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
      name: 'AWS Certified Solutions Architect — Associate',
      issuer: 'Amazon Web Services',
      issuedAt: '2025-05-01',
      credentialId: '3c4f95f1c5b540b7a29f87db5f7506b2',
      credentialUrl:
        'https://cp.certmetrics.com/amazon/en/public/verify/credential/3c4f95f1c5b540b7a29f87db5f7506b2',
    },
    {
      name: 'AWS Certified Developer — Associate',
      issuer: 'Amazon Web Services',
      issuedAt: '2025-05-01',
      expiresAt: '2028-05-01',
      credentialId: '75861d305dfa46ffa1edd03d52e72011',
      credentialUrl:
        'https://cp.certmetrics.com/amazon/en/public/verify/credential/75861d305dfa46ffa1edd03d52e72011',
    },
    {
      name: 'PJPT — Practical Junior Penetration Tester',
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
   * "Currently exploring" — shown on the home/about and the security index page.
   * Keeps the security section feeling alive while you don't yet have published CVEs.
   */
  currentlyExploring: [
    {
      title: 'Web app pentesting workflows',
      description: 'Working through PortSwigger Academy and Burp Suite Pro on practice targets.',
    },
    {
      title: 'Binary exploitation fundamentals',
      description: 'PicoCTF / pwn.college tracks, building intuition for memory corruption bugs.',
    },
    {
      title: 'Threat modelling at sprintworks',
      description: 'Pushing STRIDE into our design reviews so security is upstream of the PR.',
    },
  ] satisfies CurrentlyExploring[] as CurrentlyExploring[],

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
    title: 'Aidan — Founding Engineer & Vulnerability Research Curious',
    description:
      'Personal site of Aidan: full-stack engineering, vulnerability research, and writing about both.',
    keywords: [
      'Aidan',
      'Founding Engineer',
      'sprintworks',
      'full-stack engineer',
      'vulnerability research',
      'cyber security',
      'Next.js',
      'TypeScript',
    ],
  },
} as const

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dev-aidan.com'
