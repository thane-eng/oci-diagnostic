import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME ?? 'OCI Responses'

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error('Airtable env vars not set')
        return NextResponse.json({ error: 'Airtable not configured' }, { status: 500 })
  }

  let body: {
        name: string
        role: string
        department: string
        company: string
        engagementId: string
        primary: string
        secondary: string
        scores: { IW: number; CUR: number; CHA: number; TRU: number; COM: number }
        answers: Record<string, number | string>
  }

  try {
        body = await req.json()
  } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const fields: Record<string, string | number> = {
        'Name': body.name,
        'Role': body.role,
        'Department': body.department,
        'Company': body.company ?? '',
        'Engagement ID': body.engagementId ?? '',
        'Primary Archetype': body.primary,
        'Secondary Archetype': body.secondary ?? '',
        'Score IW': body.scores.IW,
        'Score CUR': body.scores.CUR,
        'Score CHA': body.scores.CHA,
        'Score TRU': body.scores.TRU,
        'Score COM': body.scores.COM,
        'Submitted At': new Date().toISOString(),
  }

  // Add individual answers as Q1, Q2 ... Q24
  for (const [k, v] of Object.entries(body.answers)) {
        fields[`Q${k}`] = v as string | number
  }

  const airtableRes = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
    {
            method: 'POST',
            headers: {
                      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                      'Content-Type': 'application/json',
            },
            body: JSON.stringify({ records: [{ fields }] }),
    }
      )

  if (!airtableRes.ok) {
        const error = await airtableRes.json()
        console.error('Airtable error:', error)
        return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
