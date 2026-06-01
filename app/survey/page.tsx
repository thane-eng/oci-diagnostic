'use client'

import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { scoredQuestions, forcedChoiceQuestions, ROLE_OPTIONS } from '@/lib/questions'
import { calculateScores } from '@/lib/scoring'

type Phase = 'profile' | 'survey' | 'forcedchoice'

interface Profile {
  name: string
  role: string
  department: string
}

const QUESTIONS_PER_PAGE = 1

function SurveyPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const company = searchParams.get('company') ?? ''
  const engagementId = searchParams.get('engagement_id') ?? ''

  const [phase, setPhase] = useState<Phase>('profile')
  const [profile, setProfile] = useState<Profile>({ name: '', role: '', department: '' })
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState<Record<number, number>>({})
  const [choices, setChoices] = useState<Record<number, 'A' | 'B'>>({})
  const [selected, setSelected] = useState<number | 'A' | 'B' | null>(null)

  const totalScoredQ = scoredQuestions.length
  const totalForcedQ = forcedChoiceQuestions.length
  const totalQ = totalScoredQ + totalForcedQ

  const progressPercent = phase === 'profile'
    ? 0
    : phase === 'survey'
    ? Math.round(((currentQ + 1) / totalQ) * 100)
    : Math.round(((totalScoredQ + currentQ + 1) / totalQ) * 100)

  function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile.name.trim() || !profile.role || !profile.department.trim()) return
    setPhase('survey')
    setCurrentQ(0)
    setSelected(null)
  }

  function handleScoredAnswer(value: number) {
    setSelected(value)
  }

  function handleForcedAnswer(value: 'A' | 'B') {
    setSelected(value)
  }

  function handleNext() {
    if (selected === null) return

    if (phase === 'survey') {
      const q = scoredQuestions[currentQ]
      const newScores = { ...scores, [q.id]: selected as number }
      setScores(newScores)

      if (currentQ + 1 < totalScoredQ) {
        setCurrentQ(currentQ + 1)
        setSelected(null)
      } else {
        setPhase('forcedchoice')
        setCurrentQ(0)
        setSelected(null)
      }
    } else if (phase === 'forcedchoice') {
      const q = forcedChoiceQuestions[currentQ]
      const newChoices = { ...choices, [q.id]: selected as 'A' | 'B' }
      setChoices(newChoices)

      if (currentQ + 1 < totalForcedQ) {
        setCurrentQ(currentQ + 1)
        setSelected(null)
      } else {
        const result = calculateScores({
          scores: { ...scores },
          forcedChoices: newChoices,
        })

        fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profile.name,
            role: profile.role,
            department: profile.department,
            company,
            engagementId,
            primary: result.primaryArchetype,
            secondary: result.secondaryArchetype ?? '',
            scores: result.elementScores,
            answers: {
              ...scores,
              ...Object.fromEntries(
                Object.entries(newChoices).map(([k, v]) => [k, v])
              ),
            },
          }),
        }).catch(console.error)

        const params = new URLSearchParams({
          name: profile.name,
          role: profile.role,
          dept: profile.department,
          primary: result.primaryArchetype,
          secondary: result.secondaryArchetype ?? '',
          IW: String(result.elementScores.IW),
          CUR: String(result.elementScores.CUR),
          CHA: String(result.elementScores.CHA),
          TRU: String(result.elementScores.TRU),
          COM: String(result.elementScores.COM),
        })
        router.push(`/results?${params.toString()}`)
      }
    }
  }

  function handleBack() {
    if (phase === 'survey' && currentQ === 0) {
      setPhase('profile')
      setSelected(null)
      return
    }
    if (phase === 'forcedchoice' && currentQ === 0) {
      setPhase('survey')
      setCurrentQ(totalScoredQ - 1)
      setSelected(scores[scoredQuestions[totalScoredQ - 1].id] ?? null)
      return
    }
    const prevIdx = currentQ - 1
    setCurrentQ(prevIdx)
    if (phase === 'survey') {
      setSelected(scores[scoredQuestions[prevIdx].id] ?? null)
    } else {
      setSelected(choices[forcedChoiceQuestions[prevIdx].id] ?? null)
    }
  }

  if (phase === 'profile') {
    return (
      <div className="min-h-screen bg-[#0f1f30] flex flex-col">
        <TopBar progress={0} />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-white mb-2">Before we begin</h2>
            <p className="text-white/50 mb-8 text-sm">
              This information helps contextualize your results. Your individual responses remain anonymous in group reports.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  placeholder="First and last name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Role / Level
                </label>
                <select
                  value={profile.role}
                  onChange={e => setProfile({ ...profile, role: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors appearance-none"
                  required
                >
                  <option value="" disabled className="bg-[#0f1f30]">Select your level</option>
                  {ROLE_OPTIONS.map(r => (
                    <option key={r} value={r} className="bg-[#0f1f30]">{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Department / Function
                </label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={e => setProfile({ ...profile, department: e.target.value })}
                  placeholder="e.g. Operations, Finance, HR, Engineering"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-[#0f1f30] font-semibold py-4 rounded-lg hover:bg-white/90 transition-colors mt-2"
              >
                Start the Diagnostic →
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'survey') {
    const q = scoredQuestions[currentQ]
    const questionNumber = currentQ + 1

    return (
      <div className="min-h-screen bg-[#0f1f30] flex flex-col">
        <TopBar progress={progressPercent} />
        <div className="flex-1 flex items-start justify-center px-4 py-10">
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/40 text-sm font-medium">
                Question {questionNumber} of {totalQ}
              </span>
              <button
                onClick={handleBack}
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                ← Back
              </button>
            </div>

            <h2 className="text-xl md:text-2xl font-medium text-white leading-snug mb-8">
              {q.text}
            </h2>

            <div className="space-y-3 mb-10">
              {q.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleScoredAnswer(opt.value)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    selected === opt.value
                      ? 'bg-white text-[#0f1f30] border-white'
                      : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-semibold ${
                      selected === opt.value
                        ? 'border-[#0f1f30] bg-[#0f1f30] text-white'
                        : 'border-white/30 text-white/40'
                    }`}>
                      {opt.value}
                    </span>
                    <span className="text-sm leading-relaxed">{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className={`w-full py-4 rounded-lg font-semibold text-base transition-all ${
                selected !== null
                  ? 'bg-white text-[#0f1f30] hover:bg-white/90'
                  : 'bg-white/20 text-white/30 cursor-not-allowed'
              }`}
            >
              {currentQ + 1 < totalScoredQ ? 'Next →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const fc = forcedChoiceQuestions[currentQ]
  const questionNumber = totalScoredQ + currentQ + 1

  return (
    <div className="min-h-screen bg-[#0f1f30] flex flex-col">
      <TopBar progress={progressPercent} />
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <span className="text-white/40 text-sm font-medium">
              Question {questionNumber} of {totalQ}
            </span>
            <button
              onClick={handleBack}
              className="text-white/40 text-sm hover:text-white/70 transition-colors"
            >
              ← Back
            </button>
          </div>

          <div className="mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/30">
              Final questions — choose the better fit
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-medium text-white leading-snug mb-8">
            {fc.text}
          </h2>

          <div className="space-y-4 mb-10">
            {fc.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleForcedAnswer(opt.value)}
                className={`w-full text-left rounded-xl border p-5 transition-all ${
                  selected === opt.value
                    ? 'bg-white text-[#0f1f30] border-white'
                    : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 flex-shrink-0 font-bold text-sm ${
                    selected === opt.value ? 'text-[#0f1f30]' : 'text-white/40'
                  }`}>
                    {opt.value}.
                  </span>
                  <span className="text-sm leading-relaxed">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`w-full py-4 rounded-lg font-semibold text-base transition-all ${
              selected !== null
                ? 'bg-white text-[#0f1f30] hover:bg-white/90'
                : 'bg-white/20 text-white/30 cursor-not-allowed'
            }`}
          >
            {currentQ + 1 < totalForcedQ ? 'Next →' : 'See My Results →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1f30]" />}>
      <SurveyPageInner />
    </Suspense>
  )
}

function TopBar({ progress }: { progress: number }) {
  return (
    <div className="px-6 py-4 border-b border-white/10 flex items-center gap-4">
      <span className="text-white/40 text-sm font-medium tracking-widest uppercase flex-shrink-0">
        OCI
      </span>
      <div className="flex-1 bg-white/10 rounded-full h-1">
        <div
          className="bg-white rounded-full h-1 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-white/30 text-xs flex-shrink-0 w-8 text-right">
        {progress}%
      </span>
    </div>
  )
}
