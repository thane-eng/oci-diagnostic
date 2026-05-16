import type { Element, ArchetypeKey } from './questions'

// Archetype map: which pair of lowest-scoring elements → which archetype
// Each element appears in exactly 2 archetypes
export const ARCHETYPE_MAP: Record<string, ArchetypeKey> = {
  'CUR-TRU': 'performative',
  'TRU-CUR': 'performative',
  'IW-CHA': 'exhausted',
  'CHA-IW': 'exhausted',
  'CHA-TRU': 'frozen',
  'TRU-CHA': 'frozen',
  'COM-CUR': 'siloed',
  'CUR-COM': 'siloed',
  'IW-COM': 'drifting',
  'COM-IW': 'drifting',
}

// Which forced-choice question resolves which archetype pair
export const TIEBREAKER_MAP: Record<string, number> = {
  'performative-frozen': 21,
  'frozen-performative': 21,
  'exhausted-drifting': 22,
  'drifting-exhausted': 22,
  'siloed-frozen': 23,
  'frozen-siloed': 23,
  'performative-siloed': 24,
  'siloed-performative': 24,
}

export interface ScoringInput {
  // Scored questions: key = delivery question id (1–20), value = score (1–4)
  scores: Record<number, number>
  // Forced choice: key = delivery question id (21–24), value = 'A' | 'B'
  forcedChoices: Record<number, 'A' | 'B'>
}

export interface ElementScores {
  IW: number
  CUR: number
  CHA: number
  TRU: number
  COM: number
}

export interface ScoringResult {
  elementScores: ElementScores
  rankedElements: Element[]   // sorted lowest to highest
  primaryArchetype: ArchetypeKey
  secondaryArchetype: ArchetypeKey | null
  tiebreakersUsed: number[]
}

// Maps delivery question id → element
const QUESTION_ELEMENT_MAP: Record<number, Element> = {
  1: 'IW', 2: 'CUR', 3: 'CHA', 4: 'TRU', 5: 'COM',
  6: 'IW', 7: 'CUR', 8: 'CHA', 9: 'TRU', 10: 'COM',
  11: 'IW', 12: 'CUR', 13: 'CHA', 14: 'TRU', 15: 'COM',
  16: 'IW', 17: 'CUR', 18: 'CHA', 19: 'TRU', 20: 'COM',
}

function getArchetypeForPair(a: Element, b: Element): ArchetypeKey | null {
  return ARCHETYPE_MAP[`${a}-${b}`] ?? null
}

export function calculateScores(input: ScoringInput): ScoringResult {
  const tiebreakersUsed: number[] = []

  // Step 1: Sum each element's score
  const elementScores: ElementScores = { IW: 0, CUR: 0, CHA: 0, TRU: 0, COM: 0 }
  for (const [qId, score] of Object.entries(input.scores)) {
    const element = QUESTION_ELEMENT_MAP[Number(qId)]
    if (element) elementScores[element] += score
  }

  // Step 2: Rank elements by score (lowest first)
  const elements: Element[] = ['IW', 'CUR', 'CHA', 'TRU', 'COM']
  const ranked = [...elements].sort((a, b) => elementScores[a] - elementScores[b])

  // Step 3: Determine primary archetype from the 2 lowest elements
  // Handle ties using forced-choice questions
  let primary: ArchetypeKey | null = null
  let primaryElements: [Element, Element] = [ranked[0], ranked[1]]

  // Check if the bottom 2 form a defined archetype pair
  primary = getArchetypeForPair(ranked[0], ranked[1])

  if (!primary) {
    // Bottom 2 don't form a defined pair — need to look at alternatives
    // Check if there's a tie between positions 1 and 2 that creates ambiguity
    // Try all combinations of the 3 lowest elements to find a valid pair
    const bottom3 = ranked.slice(0, 3)
    for (let i = 0; i < bottom3.length; i++) {
      for (let j = i + 1; j < bottom3.length; j++) {
        const candidate = getArchetypeForPair(bottom3[i], bottom3[j])
        if (candidate) {
          // Check if a tiebreaker exists between this and another candidate
          const otherCandidates = bottom3
            .filter((_, idx) => idx !== i && idx !== j)
            .flatMap(e => {
              const others = elements.filter(el => el !== e)
              return others.map(el => getArchetypeForPair(e, el)).filter(Boolean) as ArchetypeKey[]
            })

          primary = candidate
          primaryElements = [bottom3[i], bottom3[j]]
          break
        }
      }
      if (primary) break
    }
  }

  // If still no primary, use forced-choice tiebreakers directly
  if (!primary) {
    // Use all forced choices to determine primary
    for (const [qId, choice] of Object.entries(input.forcedChoices)) {
      const q = Number(qId)
      tiebreakersUsed.push(q)
      // The chosen archetype from the tiebreaker becomes primary
      // (this is a fallback path; in practice, the above logic covers it)
      primary = choice === 'A'
        ? getForcedChoiceArchetype(q, 'A')
        : getForcedChoiceArchetype(q, 'B')
      if (primary) break
    }
  }

  // Final fallback
  if (!primary) primary = 'performative'

  // Step 4: Determine secondary archetype
  // = the defined archetype pair that includes the 3rd lowest element
  //   AND shares one element with the primary
  const primaryPairElements = getPrimaryPairElements(primary)
  const thirdElement = ranked.find(e => !primaryPairElements.includes(e))!
  let secondary: ArchetypeKey | null = null

  if (thirdElement) {
    // Look for an archetype that pairs thirdElement with one of the primary elements
    for (const primaryEl of primaryPairElements) {
      const candidate = getArchetypeForPair(thirdElement, primaryEl)
      if (candidate && candidate !== primary) {
        secondary = candidate
        break
      }
    }
    // If no overlap, find any archetype containing the 3rd element
    if (!secondary) {
      for (const el of elements) {
        if (el === thirdElement) continue
        const candidate = getArchetypeForPair(thirdElement, el)
        if (candidate && candidate !== primary) {
          secondary = candidate
          break
        }
      }
    }
  }

  return {
    elementScores,
    rankedElements: ranked,
    primaryArchetype: primary,
    secondaryArchetype: secondary,
    tiebreakersUsed,
  }
}

function getPrimaryPairElements(archetype: ArchetypeKey): Element[] {
  const pairs: Record<ArchetypeKey, Element[]> = {
    performative: ['CUR', 'TRU'],
    exhausted: ['IW', 'CHA'],
    frozen: ['CHA', 'TRU'],
    siloed: ['COM', 'CUR'],
    drifting: ['IW', 'COM'],
  }
  return pairs[archetype]
}

function getForcedChoiceArchetype(questionId: number, choice: 'A' | 'B'): ArchetypeKey {
  const map: Record<number, { A: ArchetypeKey; B: ArchetypeKey }> = {
    21: { A: 'performative', B: 'frozen' },
    22: { A: 'exhausted', B: 'drifting' },
    23: { A: 'siloed', B: 'frozen' },
    24: { A: 'performative', B: 'siloed' },
  }
  return map[questionId]?.[choice] ?? 'performative'
}

export function getElementLabel(element: Element): string {
  const labels: Record<Element, string> = {
    IW: 'Important Work',
    CUR: 'Curiosity',
    CHA: 'Challenge',
    TRU: 'Trust',
    COM: 'Community',
  }
  return labels[element]
}

export function getElementScore(scores: ElementScores, element: Element): number {
  return scores[element]
}

// Returns a score as a percentage of the max (16)
export function getElementPercent(scores: ElementScores, element: Element): number {
  return Math.round((scores[element] / 16) * 100)
}
