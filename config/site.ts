/**
 * Single source of truth for everything personal on the site.
 * Edit this file (and the MDX content under /content), that's it.
 *
 * Project case studies live next door in ./projects.ts.
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

/** Key/value pairs shown in the hero "at a glance" panel. */
export type Fact = {
  label: string
  value: string
  href?: string
}

/** One entry in the experience timeline. */
export type Experience = {
  role: string
  company: string
  companyUrl?: string
  /** Free text, e.g. "2024 - present". Left out when not known; nothing is invented. */
  period?: string
  location?: string
  summary: string
  highlights?: string[]
  stack?: string[]
  current?: boolean
}

export type Education = {
  qualification: string
  institution: string
  year: string
}

export type SiteLink = { label: string; href: string }

export const siteConfig = {
  name: 'Aidan',
  fullName: 'Aidan Alsaadoun',
  role: 'Founding Engineer',
  /** The professional identity the whole site leads with. */
  title: 'Full-Stack Software Engineer',
  discipline: 'Full-stack software engineer',
  // intentionally lowercase, per Aidan
  company: {
    name: 'sprintworks',
    url: 'https://sprintworks.dev',
  },
  location: 'United Kingdom',

  /**
   * Hero headline. `lead` is set in the display serif, `accent` gets the
   * italic tangerine treatment.
   */
  headline: {
    lead: 'Full-stack software engineer',
    accent: 'building products end-to-end.',
  },

  /**
   * Short paragraph under the headline. Concrete, no adjectives.
   */
  blurb:
    'From the React component to the API, the database and the AWS underneath, plus the pipeline that ships it. Seven years of production systems at Tombola, in the Civil Service and at Visa; now building sprintworks from zero as its Founding Engineer.',

  /** Mono stack line under the hero CTAs. Six or seven items, no more. */
  heroStack: ['TypeScript', 'React', 'Node.js', 'Java', 'Go', 'AWS', 'PostgreSQL'],

  /**
   * About paragraph. First person, my words.
   */
  longBio:
    "I'm the founding engineer at sprintworks, which means I own features the whole way down: Next.js and React at the top, Node and Go in the middle, AWS underneath. Before that: real-money games at Tombola, national-scale event-driven services in the Civil Service, and payments infrastructure at Visa. I like types that make bad states impossible and deploys boring enough for a Friday afternoon. I read cyber security at university and the habit never left: I threat-model in the design review, not after the incident. Lately: the correctness problems of systems that move money, on-chain and off.",

  /** One-line answer to "so what do you actually do?", used for SEO and the OG image. */
  positioning:
    'Full-stack software engineer who owns products end-to-end: interfaces, APIs, data, infrastructure and delivery, with a security mindset built in.',

  /**
   * CV. Deliberately NOT published: the CV is shared directly, on request. If
   * that ever changes, drop a PDF in /public and set the URL here; every
   * "Download CV" affordance (nav, hero, at-a-glance, footer, contact) renders
   * automatically. Empty string = hidden everywhere.
   */
  cv: {
    url: '' as string,
    label: 'Download CV',
  },

  /**
   * Public email. Left empty on purpose (no public inbox so far). Set it and the
   * footer + contact page pick it up.
   */
  email: '' as string,

  socials: {
    github: 'AidanAlsaadoun1',
    linkedin: 'https://www.linkedin.com/in/aidan-a-80a037255/',
  },

  /**
   * Hero "at a glance" panel. Short, factual, scannable, the things a hiring
   * manager wants in the first five seconds.
   */
  facts: [
    { label: 'Currently', value: 'Founding Engineer, sprintworks (Nov 2024 - present)', href: 'https://sprintworks.dev' },
    { label: 'Previously', value: 'Visa · Civil Service · Tombola' },
    { label: 'Focus', value: 'Full-stack product engineering, backend and platform' },
    { label: 'Stack', value: 'TypeScript · React · Node.js · Java · Go · C++ · Rust · AWS · PostgreSQL' },
    { label: 'Also', value: 'Security-minded: BSc Cyber Security, PJPT, threat modelling' },
    { label: 'Based in', value: 'United Kingdom' },
  ] satisfies Fact[] as Fact[],

  experience: [
    {
      role: 'Founding Engineer',
      company: 'sprintworks',
      companyUrl: 'https://sprintworks.dev',
      period: 'Nov 2024 - present',
      location: 'United Kingdom',
      current: true,
      summary:
        'First engineer, building client products from zero on bi-weekly sprints: the architecture, the delivery habits and much of the code, from Next.js frontends through Go and Node.js services to AWS.',
      stack: ['TypeScript', 'Node.js', 'Go', 'Rust', 'React', 'Next.js', 'PostgreSQL', 'SQS', 'AWS', 'GitHub Actions', 'Sentry'],
    },
    {
      role: 'Senior Software Engineer',
      company: 'Visa',
      period: 'May 2024 - Nov 2024',
      summary:
        'Payments infrastructure: led a greenfield Bank of England integration across multiple teams, built observability from scratch for a cross-border collections service, and mentored engineers on Java microservice standards.',
      stack: ['Java 17+', 'Spring Boot', 'Microservices', 'Datadog'],
    },
    {
      role: 'Software Engineer',
      company: 'Civil Service',
      period: 'Nov 2022 - May 2024',
      summary:
        'Event-driven Java, Go and Node.js microservices on Kafka and Kubernetes for national-scale programmes, with React and Next.js frontends built to GOV.UK accessibility standards.',
      stack: ['Java', 'Go', 'Node.js', 'React', 'Next.js', 'Kafka', 'Kubernetes', 'Grafana', 'Rust', 'C++'],
    },
    {
      role: 'Software Engineer',
      company: 'Tombola',
      period: 'Aug 2019 - Nov 2022',
      summary:
        'Real-money games built end to end, React interfaces and their backend services, including leading a live game’s migration from Vue.js to React.',
      stack: ['React', 'Vue.js'],
    },
  ] satisfies Experience[] as Experience[],

  education: [
    {
      qualification: 'BSc (Hons) Cyber Security, First Class Honours',
      institution: 'University of Sunderland',
      year: '2022',
    },
  ] satisfies Education[] as Education[],

  /**
   * "What I do", three cards on the home page.
   */
  capabilities: [
    {
      title: 'Product & interface',
      summary: 'The part people touch. Fast, accessible, and consistent at scale.',
      bullets: ['React & Next.js', 'Design systems & Storybook', 'Accessibility & Web Vitals'],
    },
    {
      title: 'APIs & data',
      summary: 'Typed contracts and schemas that stay sane as the product grows.',
      bullets: ['TypeScript, Java & Go services', 'REST, GraphQL & gRPC', 'PostgreSQL, DynamoDB & Kafka'],
    },
    {
      title: 'Cloud & delivery',
      summary: 'Ship it, then keep it boring. Alarms before users notice.',
      bullets: ['AWS (2× certified)', 'SST, CDK & Terraform', 'CI/CD, Kubernetes & observability'],
    },
  ] satisfies Capability[] as Capability[],

  /**
   * Security positioning: a software engineer with a security mindset, not a
   * second identity. Every point is backed by a cert, a post or a habit already
   * described on this site.
   */
  security: {
    eyebrow: 'Security mindset',
    title: 'Security is part of how I build, not a separate hat.',
    summary:
      'I read cyber security at university, hold the PJPT, and the habit never left: I threat-model in the design review, not after the incident.',
    points: [
      'BSc (Hons) Cyber Security, First Class Honours',
      'STRIDE threat modelling in design reviews',
      'Web application security with Burp Suite and PortSwigger Academy',
      'PJPT: Practical Junior Penetration Tester (TCM Security)',
      'Research writeups on shellcode obfuscation and AV evasion',
    ],
    link: { label: 'Security writing', href: '/blog?category=security' } satisfies SiteLink,
  },

  /**
   * The stack table. Keep it honest, these are the things you'd be happy
   * to be handed a ticket in tomorrow morning.
   */
  stack: [
    { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Go', 'Rust', 'Python', 'SQL', 'Bash'] },
    { label: 'Front end', items: ['React', 'Next.js', 'Tailwind CSS', 'Storybook'] },
    { label: 'Back end', items: ['Node.js', 'Spring Boot', 'REST', 'GraphQL', 'gRPC', 'PostgreSQL', 'DynamoDB', 'Kafka', 'SQS'] },
    { label: 'Cloud & tooling', items: ['AWS', 'SST', 'CDK', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Datadog', 'Grafana'] },
  ] satisfies StackGroup[] as StackGroup[],

  /**
   * The one terminal flourish left on the site. Static (no typewriter), and
   * every line is a fact from elsewhere on this page.
   */
  terminal: [
    '$ whoami',
    'aidan · full-stack software engineer · united kingdom',
    '$ cat now.txt',
    'founding engineer @ sprintworks',
    'focus: all things engineering!',
    '$ ls side-projects/',
    'market-settlement-engine  ukdevjobs  aws-profile-switcher  skye  skyerise',
  ],

  certifications: [
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
    {
      name: 'Career Development Mentorship',
      issuer: 'MentorCruise',
      issuedAt: '2026-04-01',
      description:
        'Bi-weekly 1:1 mentorship with a Staff Engineer at Meta: deadlines, shipping goals, and grilling-style design and architecture reviews to find and patch weaknesses in my thinking.',
      skills: ['Solution Architecture', 'System Design', 'Time Management'],
      credentialUrl: 'https://mentorcruise.com/',
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

  /** Primary navigation. Hash links point at home-page sections. */
  navLinks: [
    { href: '/projects', label: 'Work' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#about', label: 'About' },
    { href: '/blog', label: 'Writing' },
    { href: '/contact', label: 'Contact' },
  ] satisfies SiteLink[] as SiteLink[],

  seo: {
    title: 'Aidan Alsaadoun · Full-Stack Software Engineer',
    description:
      'Full-stack software engineer, Founding Engineer at sprintworks, previously Visa and the Civil Service. I build products end-to-end with TypeScript, React, Node.js, Java, Go, Rust, C++ and AWS, with a security mindset.',
    keywords: [
      'Aidan Alsaadoun',
      'full-stack software engineer',
      'software engineer UK',
      'Founding Engineer',
      'sprintworks',
      'Visa',
      'Civil Service',
      'TypeScript',
      'React',
      'Node.js',
      'Java',
      'Go',
      'AWS',
      'PostgreSQL',
      'backend engineer',
      'platform engineer',
    ],
  },
} as const

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dev-aidan.com'

export const githubUrl = `https://github.com/${siteConfig.socials.github}`
