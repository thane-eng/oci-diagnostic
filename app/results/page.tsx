'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { archetypes } from '@/lib/archetypes'
import { getElementLabel } from '@/lib/scoring'
import type { Element } from '@/lib/questions'
import type { ArchetypeKey } from '@/lib/questions'
import Link from 'next/link'

const ELEMENTS: Element[] = ['IW', 'CUR', 'CHA', 'TRU', 'COM']

function ResultsContent() {
  const params = useSearchParams()h

  const name = params.get('name') ?? 'Respondent'
  const role = params.get('role') ?? ''
  const dept = params.get('dept') ?? ''
  const primaryKey = (params.get('primary') ?? 'performative') as ArchetypeKey
  const secondaryKey = params.get('secondary') as ArchetypeKey | null

  const elementScores: Record<Element, number> = {
    IW: Number(params.get('IW') ?? 8),
    CUR: Number(params.get('CUR') ?? 8),
    CHA: Number(params.get('CHA') ?? 8),
    TRU: Number(params.get('TRU') ?? 8),
    COM: Number(params.get('COM') ?? 8),
  }

  const primary = archetypes[primaryKey]
    const secondary = secondaryKey ? archetypes[secondaryKey] : null

  // Sort elements for display (lowest first = most attention needed)
  const sortedElements = [...ELEMENTS].sort((a, b) => elementScores[a] - elementScores[b])

  function getScoreColor(score: number) {
    const pct = score / 16
    if (pct <= 0.40) return { bar: 'bg-red-400', text: 'text-red-400', label: 'Significant gap' }
    if (pct <= 0.60) return { bar: 'bg-amber-400', text: 'text-amber-400', label: 'Notable gap' }
    if (pct <= 0.75) return { bar: 'bg-yellow-300', text: 'text-yellow-300', label: 'Some gap' }
    return { bar: 'bg-emerald-400', text: 'text-emerald-400', label: 'Strong' }
  }

  return (
    <div className="min-h-screen bg-[#0f1f30] text-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <span className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Bellomo Leadership · OCI Results
        </span>
        <Link href="/" className="text-white/40 text-sm hover:text-white/70 transition-colors">
          ← Start over
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Respondent info */}
        <div className="mb-8">
          <p className="text-white/40 text-sm mb-1">
            {name} · {role}{dept ? ` · ${dept}` : ''}
          </p>
          <p className="text-white/30 text-xs">
            Completed {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Primary archetype */}
        <div className="mb-10">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">
            Primary Archetype
          </p>
          <div className="bg-white/5 border border-white/15 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-white mb-2">
                  {primary.name}
                </h1>
                <span className="inline-block bg-white/10 text-white/60 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                  Primary gap: {primary.primaryGap}
                </span>
              </div>
            </div>

            <p className="text-lg text-white/80 font-medium mb-6 leading-relaxed">
              {primary.tagline}
            </p>

            <div className="prose-oci text-white/65 text-sm leading-relaxed space-y-4">
              {primary.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Element scores */}
        <div className="mb-10">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
            Element Scores
          </p>
          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
            {sortedElements.map(el => {
              const score = elementScores[el]
              const pct = Math.round((score / 16) * 100)
              const colors = getScoreColor(score)
              return (
                <div key={el}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/80">
                      {getElementLabel(el)}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium ${colors.text}`}>
                        {colors.label}
                      </span>
                      <span className="text-white/40 text-sm tabular-nums">
                        {score}/16
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-full h-2">
                    <div
                      className={`${colors.bar} rounded-full h-2 transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
            <p className="text-white/30 text-xs pt-2">
              Scores shown lowest to highest. Lower scores indicate areas where courage gaps are creating the most drag.
            </p>
          </div>
        </div>

        {/* Secondary archetype */}
        {secondary && (
          <div className="mb-10">
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">
              Secondary Pattern
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {secondary.name}
                  </h3>
                  <span className="inline-block bg-white/10 text-white/50 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                    Secondary gap: {secondary.primaryGap}
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic">
                {secondary.tagline}
              </p>
              <p className="text-white/45 text-sm leading-relaxed mt-3">
                {secondary.body.split('\n\n')[0]}
              </p>
            </div>
          </div>
        )}

        {/* Courage Economy */}
        <div className="mb-10">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">
            The Path Forward
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">
              The Courage Economy
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {primary.courageEconomy}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-[#0f1f30] text-lg leading-relaxed mb-6 font-medium">
            {primary.cta}
          </p>
          <a
            href="https://bellomoLeadership.com/contact"
            className="inline-flex items-center justify-center bg-[#0f1f30] text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-[#1e3a5f] transition-colors"
          >
            Schedule a conversation with Thane →
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/20 text-xs">
            Bellomo Leadership · Operational Courage Index · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f1f30] flex items-center justify-center">
        <p className="text-white/40">Calculating your results...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
