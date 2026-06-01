import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME ?? 'OCI Responses'

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return NextResponse.json({ error: 'Airtable not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
    const engagementId = searchParams.get('engagement_id')

  if (!engagementId) {
        return NextResponse.json({ error: 'engagement_id is required' }, { status: 400 })
  }

  const formula = `({Engagement ID}="${engagementId}")`
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?filterByFormula=${encodeURIComponent(formula)}&pageSize=100`

  const res = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        cache: 'no-store',
  })

  if (!res.ok) {
        const error = await res.json()
        return NextResponse.json({ error }, { status: 500 })
  }

  const data = await res.json()
    const records: { fields: Record<string, string | number> }[] = data.records ?? []

        if (records.length === 0) {
              return NextResponse.json({ error: 'No responses found for this engagement ID' }, { status: 404 })
        }

  const archetypeCounts: Record<string, number> = {}
      const elementSums: Record<string, number> = { IW: 0, CUR: 0, CHA: 0, TRU: 0, COM: 0 }
    const elementCounts: Record<string, number> = { IW: 0, CUR: 0, CHA: 0, TRU: 0, COM: 0 }
    const departmentCounts: Record<string, number> = {}
        const roleCounts: Record<string, number> = {}
            const company = (records[0]?.fields?.['Company'] as string) ?? ''

  for (const record of records) {
        const f = record.fields
        const primary = f['Primary Archetype'] as string
        if (primary) archetypeCounts[primary] = (archetypeCounts[primary] ?? 0) + 1
        for (const el of ['IW', 'CUR', 'CHA', 'TRU', 'COM']) {
                const score = f[`Score ${el}`]
                if (typeof score === 'number') {
                          elementSums[el] += score
                          elementCounts[el] += 1
                }
        }
        const dept = f['Department'] as string
        if (dept) departmentCounts[dept] = (departmentCounts[dept] ?? 0) + 1
        const role = f['Role'] as string
        if (role) roleCounts[role] = (roleCounts[role] ?? 0) + 1
  }

  const elementAverages: Record<string, number> = {}
      for (const el of ['IW', 'CUR', 'CHA', 'TRU', 'COM']) {
            const count = elementCounts[el]
            elementAverages[el] = count > 0 ? Math.round((elementSums[el] / count) * 10) / 10 : 0
      }

  return NextResponse.json({
        engagementId,
        company,
        totalResponses: records.length,
        archetypeCounts,
        elementAverages,
        departmentCounts,
        roleCounts,
  })
}
