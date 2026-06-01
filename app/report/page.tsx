'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { archetypes } from '@/lib/archetypes'
import type { ArchetypeKey } from '@/lib/questions'

const ELEMENTS: { key: string; label: string }[] = [
  { key: 'IW', label: 'Important Work' },
  { key: 'CUR', label: 'Curiosity' },
  { key: 'CHA', label: 'Challenge' },
  { key: 'TRU', label: 'Trust' },
  { key: 'COM', label: 'Community' },
  ]

const ARCHETYPE_ORDER: ArchetypeKey[] = [
    'performative','exhausted','frozen','siloed','drifting',
  ]

interface ReportData {
    engagementId: string
    company: string
    totalResponses: number
    archetypeCounts: Record<string, number>
    elementAverages: Record<string, number>
    departmentCounts: Record<string, number>
    roleCounts: Record<string, number>
}

function getScoreColor(avg: number) {
    const pct = avg / 16
    if (pct <= 0.40) return { bar: 'bg-red-400', text: 'text-red-400', label: 'Significant gap' }
    if (pct <= 0.60) return { bar: 'bg-amber-400', text: 'text-amber-400', label: 'Notable gap' }
    if (pct <= 0.75) return { bar: 'bg-yellow-300', text: 'text-yellow-300', label: 'Some gap' }
    return { bar: 'bg-emerald-400', text: 'text-emerald-400', label: 'Strong' }
}

function ReportContent() {
    const searchParams = useSearchParams()
    const engagementId = searchParams.get('engagement_id') ?? ''
    const [data, setData] = useState<ReportData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
        if (!engagementId) { setError('No engagement_id provided.'); setLoading(false); return }
        fetch(`/api/report?engagement_id=${encodeURIComponent(engagementId)}`)
          .then(r => r.json())
          .then(json => { if (json.error) setError(json.error); else setData(json) })
          .catch(() => setError('Failed to load report data.'))
          .finally(() => setLoading(false))
  }, [engagementId])

  if (loading) return <div className="min-h-screen bg-[#0f1f30] flex items-center justify-center"><p className="text-white/40 text-sm tracking-widest uppercase">Loading report...</p>p></div>div>
      if (error || !data) return <div className="min-h-screen bg-[#0f1f30] flex items-center justify-center px-6"><div className="text-center"><p className="text-white/60 text-sm mb-2">Could not load report</p>p><p className="text-white/30 text-xs">{error}</p>p></div>div></div>div>
    
      const totalResponses = data.totalResponses
      const maxArchetypeCount = Math.max(...Object.values(data.archetypeCounts), 1)
          const sortedElements = [...ELEMENTS].sort((a, b) => (data.elementAverages[a.key] ?? 0) - (data.elementAverages[b.key] ?? 0))
              const dominantArchetype = Object.entries(data.archetypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as ArchetypeKey | undefined
                
                  return (
                        <div className="min-h-screen bg-[#0f1f30] text-white">
                              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                      <span className="text-white/40 text-sm font-medium tracking-widest uppercase">Bellomo Leadership · OCI Group Report</span>span>
                                      <span className="text-white/30 text-xs">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>span>
                              </div>div>
                              <div className="max-w-3xl mx-auto px-6 py-12">
                                      <div className="mb-10">
                                                <h1 className="text-3xl font-semibold text-white mb-1">{data.company || 'Group Report'}</h1>h1>
                                                <p className="text-white/40 text-sm">Engagement ID: {data.engagementId} · {totalResponses} response{totalResponses !== 1 ? 's' : ''}</p>p>
                                      </div>div>
                                {dominantArchetype && archetypes[dominantArchetype] && (
                                    <div className="mb-10 bg-white/5 border border-white/15 rounded-2xl p-8">
                                                <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Dominant Pattern</p>p>
                                                <h2 className="text-2xl font-semibold text-white mb-2">{archetypes[dominantArchetype].name}</h2>h2>
                                                <span className="inline-block bg-white/10 text-white/60 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">Primary gap: {archetypes[dominantArchetype].primaryGap}</span>span>
                                                <p className="text-white/70 text-base leading-relaxed italic">{archetypes[dominantArchetype].tagline}</p>p>
                                    </div>div>
                                      )}
                                      <div className="mb-10">
                                                <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Archetype Distribution</p>p>
                                                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-4">
                                                  {ARCHETYPE_ORDER.map(key => {
                                        const count = data.archetypeCounts[key] ?? 0
                                                        const pct = Math.round((count / totalResponses) * 100)
                                                                        const barPct = Math.round((count / maxArchetypeCount) * 100)
                                                                                        const arch = archetypes[key]
                                                                                                        if (!arch) return null
                                                                                                                        return (
                                                                                                                                          <div key={key}>
                                                                                                                                                            <div className="flex items-center justify-between mb-1">
                                                                                                                                                                                <span className="text-sm font-medium text-white/80">{arch.name.replace('The ', '')}</span>span>
                                                                                                                                                                                <div className="flex items-center gap-3"><span className="text-white/40 text-xs">{pct}%</span>span><span className="text-white/30 text-xs tabular-nums w-6 text-right">{count}</span>span></div>div>
                                                                                                                                                              </div>div>
                                                                                                                                                            <div className="bg-white/10 rounded-full h-2"><div className="bg-white/60 rounded-full h-2 transition-all duration-700" style={{ width: `${barPct}%` }} /></div>div>
                                                                                                                                            </div>div>
                                                                                                                                        )
                                                  })}
                                                            <p className="text-white/25 text-xs pt-1">Primary archetype per respondent.</p>p>
                                                </div>div>
                                      </div>div>
                                      <div className="mb-10">
                                                <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Element Scores — Group Average</p>p>
                                                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                                                  {sortedElements.map(el => {
                                        const avg = data.elementAverages[el.key] ?? 0
                                                        const pct = Math.round((avg / 16) * 100)
                                                                        const colors = getScoreColor(avg)
                                                                                        return (
                                                                                                          <div key={el.key}>
                                                                                                                            <div className="flex items-center justify-between mb-2">
                                                                                                                                                <span className="text-sm font-medium text-white/80">{el.label}</span>span>
                                                                                                                                                <div className="flex items-center gap-3"><span className={`text-xs font-medium ${colors.text}`}>{colors.label}</span>span><span className="text-white/40 text-sm tabular-nums">{avg}/16</span>span></div>div>
                                                                                                                              </div>div>
                                                                                                                            <div className="bg-white/10 rounded-full h-2"><div className={`${colors.bar} rounded-full h-2 transition-all duration-700`} style={{ width: `${pct}%` }} /></div>div>
                                                                                                            </div>div>
                                                                                                        )
                                                  })}
                                                            <p className="text-white/25 text-xs pt-2">Averaged across all respondents. Lower = more drag.</p>p>
                                                </div>div>
                                      </div>div>
                                {Object.keys(data.departmentCounts).length > 0 && (
                                    <div className="mb-10">
                                                <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Responses by Department</p>p>
                                                <div className="bg-white/5 border border-white/15 rounded-2xl p-6"><div className="grid grid-cols-2 gap-3">{Object.entries(data.departmentCounts).sort((a, b) => b[1] - a[1]).map(([dept, count]) => (<div key={dept} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"><span className="text-sm text-white/70">{dept}</span>span><span className="text-sm font-semibold text-white/50 tabular-nums">{count}</span>span></div>div>))}</div>div></div>div>
                                    </div>div>
                                      )}
                                {Object.keys(data.roleCounts).length > 0 && (
                                    <div className="mb-10">
                                                <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">Responses by Role Level</p>p>
                                                <div className="bg-white/5 border border-white/15 rounded-2xl p-6"><div className="grid grid-cols-2 gap-3">{Object.entries(data.roleCounts).sort((a, b) => b[1] - a[1]).map(([role, count]) => (<div key={role} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"><span className="text-sm text-white/70">{role}</span>span><span className="text-sm font-semibold text-white/50 tabular-nums">{count}</span>span></div>div>))}</div>div></div>div>
                                    </div>div>
                                      )}
                                      <div className="bg-white rounded-2xl p-8 text-center">
                                                <p className="text-[#0f1f30] text-lg leading-relaxed mb-2 font-semibold">Ready to debrief these results?</p>p>
                                                <p className="text-[#0f1f30]/60 text-sm mb-6">Schedule a working session to translate this data into a concrete action plan.</p>p>
                                                <a href="https://bellomoLeadership.com/contact" className="inline-flex items-center justify-center bg-[#0f1f30] text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-[#1e3a5f] transition-colors">Schedule a conversation with Thane →</a>a>
                                      </div>div>
                                      <div className="mt-12 text-center"><p className="text-white/20 text-xs">Bellomo Leadership · Operational Courage Index · {new Date().getFullYear()}</p>p></div>div>
                              </div>div>
                        </div>div>
                      )
                    }
                    
                    export default function ReportPage() {
                        return (
                              <Suspense fallback={<div className="min-h-screen bg-[#0f1f30] flex items-center justify-center"><p className="text-white/40 text-sm tracking-widest uppercase">Loading report...</p>p></div>div>}>
                                    <ReportContent />
                              </Suspense>Suspense>
                            )
                    }</div>
