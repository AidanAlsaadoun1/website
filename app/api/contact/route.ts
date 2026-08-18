import { NextResponse } from 'next/server'

/**
 * Contact endpoint decommissioned, Aidan doesn't run a public inbox anymore.
 * Anything that hits this URL gets a polite "Gone" response.
 *
 * Safe to `rm -rf app/api` locally.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'This endpoint is no longer in use. Find me on LinkedIn or GitHub.' },
    { status: 410 },
  )
}

export async function GET() {
  return NextResponse.json(
    { error: 'This endpoint is no longer in use.' },
    { status: 410 },
  )
}
