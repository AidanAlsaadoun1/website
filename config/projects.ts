/**
 * Curated project case studies.
 *
 * Every claim here is lifted from the project's own README (or my GitHub
 * profile). If a repo changes, update it here too. Live metadata (stars,
 * language, last push) is merged in at render time from the GitHub API, see
 * lib/github.ts, so nothing about activity is hard-coded.
 */

export type DiagramNode = {
  /** Mono label, e.g. the table, service or contract name. */
  label: string
  /** Where it lives, e.g. "Sepolia", "PostgreSQL". */
  layer?: string
  /** What happens here. One or two short clauses. */
  detail: string
}

export type ProjectLink = { label: string; href: string }

export type Project = {
  /** Matches the GitHub repository name. Used for /projects/[slug] and metadata lookup. */
  slug: string
  name: string
  tagline: string
  /** What it is, in one or two sentences. */
  summary: string
  /** Why it's technically interesting. */
  why: string
  /** What I personally built, as concrete bullets. */
  built: string[]
  /** Engineering concepts a reviewer should recognise. */
  concepts: string[]
  stack: string[]
  /** Honest scope decisions, straight from the README. */
  limitations?: string[]
  repoUrl: string
  liveUrl?: string
  liveLabel?: string
  extraLinks?: ProjectLink[]
  /** Featured projects get the wide card on the home page. */
  featured?: boolean
  /** Short context line, e.g. "Solo build, in a fortnight". */
  context?: string
  /** Optional architecture pipeline, rendered by <SystemDiagram>. */
  diagram?: { title: string; nodes: DiagramNode[]; footnote?: string }
  /** Optional verbatim terminal sample from the repo. */
  terminal?: { title: string; lines: string[] }
  /** Optional note on how it was built (tooling, process). */
  process?: string
}

export const projects: Project[] = [
  {
    slug: 'market-settlement-engine',
    name: 'Settlement Engine',
    tagline: 'Event ingestion and on-chain/off-chain reconciliation for a Solidity prediction market.',
    summary:
      'A parimutuel market contract on Sepolia, plus a Go service that ingests the contract’s event logs into an append-only PostgreSQL ledger and continuously reconciles on-chain state against the database, alerting on any divergence.',
    why: 'Built to explore the correctness problems real-money trading platforms face: idempotent event ingestion, auditable state, and detecting drift between two systems of record.',
    context: 'Solo build, in a fortnight.',
    built: [
      'Parimutuel yes/no market contract (createMarket, buy, resolve, claim) with Foundry lifecycle tests, deployed and verified on Sepolia. Checks-effects-interactions on claim, multiply-before-divide payout maths, call{value:} with the success flag checked.',
      'A Go indexer where backfill and live tail are the same loop: each pass closes the gap between the last checkpoint and the safe head (latest − 6 confirmations), whether that gap is fifteen thousand blocks or five.',
      'Idempotent ingestion keyed on (tx_hash, log_index) with ON CONFLICT DO NOTHING; the checkpoint advances only after every insert in a range succeeds, so a crash re-processes work instead of skipping it.',
      'Derived state (markets, positions) is disposable by design: rebuilt from the ledger in chain order inside one transaction on every pass, so a corrupted projection heals itself on the next cycle.',
      'A reconciler that compares on-chain pool totals (view calls) with off-chain SQL sums and records every check, pass or fail, in reconciliation_runs. A fault-injection demo corrupts a pool by hand and watches it get caught, then healed.',
      'A transient-vs-fatal error taxonomy: RPC rate limits and timeouts retry the same range next pass; database and checkpoint failures stop the process, because a broken store with an advancing loop risks inconsistency.',
    ],
    concepts: [
      'Event sourcing',
      'Idempotency',
      'Checkpointing & recovery',
      'At-least-once delivery',
      'Reconciliation',
      'Confirmation depth',
      'Fault injection',
      'Re-entrancy safety',
    ],
    stack: ['Go', 'Solidity', 'PostgreSQL', 'Foundry', 'Docker Compose', 'JSON-RPC'],
    limitations: [
      'Centralised oracle: resolve is owner-only. A production market would use a decentralised oracle or dispute mechanism.',
      'Confirmation depth rather than reorg rollback. Block hashes are stored in the ledger, so full rollback is a straightforward extension.',
      'Polling rather than a WebSocket subscription; simpler and self-healing at this scale, and the backfill path doubles as crash recovery.',
      'Full re-fold every pass rather than incremental. Deliberate at this event volume; at production volume the fold would advance from its own checkpoint.',
    ],
    repoUrl: 'https://github.com/AidanAlsaadoun1/market-settlement-engine',
    extraLinks: [
      {
        label: 'Verified on Sepolia',
        href: 'https://sepolia.etherscan.io/address/0x36A7cf4DCD4a722Afc3F0Fd3861729CeF5c8B516',
      },
    ],
    featured: true,
    diagram: {
      title: 'How an event becomes a verified row',
      nodes: [
        {
          label: 'SettlementMarket.sol',
          layer: 'Sepolia · source of truth',
          detail: 'createMarket · buy · resolve · claim. Emits an event for every state change.',
        },
        {
          label: 'Go indexer',
          layer: 'polling loop',
          detail:
            'Reads chunked block ranges up to latest − 6. The checkpoint advances only after every insert in a range succeeds.',
        },
        {
          label: 'chain_events',
          layer: 'PostgreSQL · append-only ledger',
          detail: 'Idempotent insert: ON CONFLICT (tx_hash, log_index) DO NOTHING. Replaying any range is a no-op.',
        },
        {
          label: 'fold',
          layer: 'derived, disposable',
          detail:
            'Truncates and replays the ledger in chain order, in one transaction, into markets and positions.',
        },
        {
          label: 'reconciler',
          layer: 'reconciliation_runs · audit trail',
          detail:
            'On-chain view calls vs off-chain SQL sums. Every comparison recorded; divergence raises an alert.',
        },
      ],
      footnote:
        'The contract’s pools and the database’s sums are two accounts of the same events, so they must always agree. The reconciler is the proof that they do.',
    },
    process:
      'Hand-written, with AI used in three modes: tutor before writing, senior-style reviewer after, and a time-boxed unblocker for toolchain errors. What that workflow caught is documented in the repo’s NOTES.md.',
  },
  {
    slug: 'ukdevjobs',
    name: 'ukdevjobs-cli',
    tagline: 'Search, filter, track and apply to UK developer jobs with salary data, from the terminal.',
    summary:
      'One search fans out to five job boards in parallel, normalises every listing into an annual GBP salary range, collapses duplicates across boards, and remembers what you have seen and applied to in a local SQLite database. The same search path is exposed as a CLI and as an MCP server.',
    why: 'A small tool with real integration problems: five APIs with five auth schemes and inconsistent schemas, free-text salary parsing, concurrency that must not let one failing board sink a search, and a wire protocol implemented from the spec.',
    context: 'Solo build. Zero runtime dependencies, by design.',
    built: [
      'Layered architecture: board adapters are pure translators with no I/O, so each one is an ~80-line module tested against a recorded fixture. Caching, retries, parallelism and credential masking are implemented once, in the aggregator.',
      'Salary normalisation that parses free text, detects the period (day rate, hourly, monthly, annual) and annualises to GBP, flagging model estimates so they can be excluded.',
      'Error isolation: one thread per board. A timeout, 5xx or schema change becomes a warning on stderr, and the command only exits non-zero when every board fails.',
      'SQLite schema for a response cache with TTL, job snapshots with first-seen tracking, an application state machine (applied → interviewing → offer, rejected or withdrawn), saved searches and a hide list.',
      'A JSON-RPC 2.0 / Model Context Protocol server over stdio, written from the spec with the standard library: 13 tools and a two-step confirmation gate on anything that records an application.',
      '73 offline tests that run in under a second, CI across five Python versions and three operating systems, plus a live protocol handshake job. Roughly 3,100 lines of application code and 900 of tests.',
    ],
    concepts: [
      'API integration',
      'Data normalisation',
      'Concurrency & error isolation',
      'Schema design & state machines',
      'Protocol implementation',
      'CLI exit-code contracts',
      'Offline-first testing',
    ],
    stack: ['Python', 'SQLite', 'JSON-RPC / MCP', 'GitHub Actions', 'Docusaurus'],
    repoUrl: 'https://github.com/AidanAlsaadoun1/ukdevjobs',
    featured: true,
    terminal: {
      title: 'From the README',
      lines: [
        '$ ukdevjobs search python --location London --salary-min 70k --remote',
        '',
        'ID            TITLE                       COMPANY          LOCATION      SALARY (£/yr)   POSTED',
        '----------------------------------------------------------------------------------------------',
        'reed:9001     Senior Python Developer     Fintech Labs     London        £78k-£92k       2026-08-21 +',
        'adzuna:5002   DevOps Engineer             CloudWorks       Manchester    ~£60k (est.)    2026-08-22',
        'remotive:3001 Staff Software Engineer     Orbit Analytics  UK, Ireland   £90k-£110k      2026-08-21',
        '',
        '3 job(s), + = first time seen, * = applied.',
      ],
    },
  },
  {
    slug: 'gym-app',
    name: 'Skye',
    tagline: 'A gym companion app: log sessions, track progression, build the habit.',
    summary:
      'A mobile-first PWA for live workout logging with autosave, reusable templates and splits, a time-boxed workout generator, history and progression stats, and a seeded library of around 75 exercises.',
    why: 'A complete product owned end-to-end: schema, auth, API, UI, deployment and cost. It runs in production for about a pound a month.',
    context: 'Solo build, in production at skyeapp.fit.',
    built: [
      'Next.js 15 App Router with strict TypeScript and Tailwind v4, designed mobile-first with PWA install for a near-native feel.',
      'Relational schema on Neon Postgres via Drizzle ORM and drizzle-kit migrations: exercises, workout_templates, template_exercises, sessions with snapshotted plans, and a sets_log of weight, reps, RPE and time.',
      'Email and password authentication with better-auth; deployed on Vercel with Resend powering an in-app bug-report flow that captures session context.',
      'Cost-aware infrastructure: Vercel Hobby plus Neon’s free tier with autosuspend, so a single-user product costs roughly the domain fee.',
    ],
    concepts: ['Full-stack product ownership', 'Relational schema design', 'Authentication', 'PWA', 'Cost-aware infra'],
    stack: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'Neon Postgres', 'Drizzle', 'better-auth', 'Vercel', 'Resend'],
    repoUrl: 'https://github.com/AidanAlsaadoun1/gym-app',
    liveUrl: 'https://skyeapp.fit',
    liveLabel: 'skyeapp.fit',
    featured: true,
  },
  {
    slug: 'aws-profile-switcher',
    name: 'aws-profile-switcher',
    tagline: 'Interactive terminal AWS profile switcher.',
    summary:
      'A curses TUI over ~/.aws/config that previews region, output format, SSO URL, role ARN and the live account ID before switching AWS_PROFILE, then updates .zshrc with an automatic backup.',
    why: 'Small, sharp developer tooling: safe mutation of a file people care about, read-only AWS calls, and no dependencies to install.',
    built: [
      'INI parsing of ~/.aws/config with default first, then alphabetical; SSO and role-assumption profiles tagged in the list.',
      'Live account lookup via aws sts get-caller-identity, read-only and optional. Credentials are never read or stored.',
      'Confirmation before any write; ~/.zshrc backed up before every change; export AWS_PROFILE updated in place or appended.',
      'pytest coverage of profile discovery, metadata extraction, active-profile detection, config updates and backup creation.',
    ],
    concepts: ['Developer tooling', 'Safe file mutation', 'Least privilege'],
    stack: ['Python 3.10+', 'curses', 'AWS CLI', 'pytest'],
    repoUrl: 'https://github.com/AidanAlsaadoun1/aws-profile-switcher',
  },
  {
    slug: 'skyerise',
    name: 'Skyerise',
    tagline: 'Sunrise and sunset quality forecast.',
    summary:
      'A mobile-first web app that scores tomorrow’s sunrise or sunset from 0 to 100 using six weighted weather factors (high, mid and low cloud, humidity, visibility and EU air quality) from Open-Meteo, so you only set the alarm for the good ones.',
    why: 'A transparent scoring heuristic with documented weights, no backend and no auth: a static export that still does something useful.',
    built: [
      'The scoring model in scoring.ts, with each factor’s weight and optimal condition documented so the heuristic can be tuned.',
      'Open-Meteo fetchers for forecast, geocoding and air quality, aggregated into a per-event report.',
      'Next.js static export with Tailwind and shadcn/ui, designed for a phone screen first and deployed at skyerise.cloud.',
    ],
    concepts: ['Domain modelling', 'Third-party APIs', 'Static export'],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Open-Meteo'],
    repoUrl: 'https://github.com/AidanAlsaadoun1/skyerise',
    liveUrl: 'https://skyerise.cloud',
    liveLabel: 'skyerise.cloud',
  },
  {
    slug: 'Clarify',
    name: 'Clarify',
    tagline: 'Accessibility-first reading assistant for students with learning difficulties.',
    summary:
      'Paste dense text and get a summary, key points, click-for-definitions, translation and read-aloud audio, built for students and learners with ADHD or autism.',
    why: 'A solo hackathon build that put accessibility first and shipped a working product on a deadline.',
    context: 'Solo hackathon project.',
    built: [
      'Summaries, key-point extraction, ELI5 mode and key-term search on top of Groq-hosted Llama models.',
      'Read-aloud in English and Arabic via PlayAI, with Zod validating every model response before it reaches the UI.',
      'Prototyped with Vercel’s v0 and finished by hand in React and Next.js.',
    ],
    concepts: ['Accessibility', 'LLM integration', 'Rapid delivery'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Groq', 'PlayAI', 'Zod'],
    repoUrl: 'https://github.com/AidanAlsaadoun1/Clarify',
    liveUrl: 'https://clarify-accessibility.vercel.app/',
    liveLabel: 'Live demo',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase())
}
