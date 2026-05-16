// All 24 OCI questions in randomized delivery order
// (so respondents can't identify which element they're scoring)

export type Element = 'IW' | 'CUR' | 'CHA' | 'TRU' | 'COM'
export type ArchetypeKey = 'performative' | 'exhausted' | 'frozen' | 'siloed' | 'drifting'

export interface ScoredQuestion {
  id: number           // Tally/delivery order (1–20)
  originalId: number   // Original question number (1–20)
  element: Element
  text: string
  options: {
    value: 1 | 2 | 3 | 4
    label: string
  }[]
}

export interface ForcedChoiceQuestion {
  id: number           // Delivery order (21–24)
  originalId: number
  resolves: [ArchetypeKey, ArchetypeKey]
  text: string
  options: {
    value: 'A' | 'B'
    label: string
    archetype: ArchetypeKey
  }[]
}

export const scoredQuestions: ScoredQuestion[] = [
  {
    id: 1, originalId: 3, element: 'IW',
    text: 'How well do your organization\'s metrics and performance measures reflect what actually matters most?',
    options: [
      { value: 1, label: 'Poorly. The things that get measured are mostly what\'s easy to count. The metrics tell you about activity, not about whether the work is actually succeeding.' },
      { value: 2, label: 'Somewhat. A few meaningful outcomes get tracked, but the measurement system is dominated by activity metrics that don\'t tell you much about real progress.' },
      { value: 3, label: 'Reasonably well in some areas. The most important outcomes are tracked, but there are still significant gaps where the measures don\'t reflect what genuinely matters.' },
      { value: 4, label: 'Very well. The measurement system reflects genuine priorities, and people trust it as a real signal of whether the organization is moving in the right direction.' },
    ],
  },
  {
    id: 2, originalId: 7, element: 'CUR',
    text: 'When something goes wrong, how does your organization typically respond?',
    options: [
      { value: 1, label: 'By identifying who is responsible. Accountability conversations happen quickly and they\'re more about blame than understanding. People learn to avoid being the one holding the problem.' },
      { value: 2, label: 'With a mix of blame and inquiry, but blame usually wins. The instinct toward accountability moves faster than the instinct toward understanding, and it shapes what people are willing to say.' },
      { value: 3, label: 'It depends on the leader. Some create genuine space for honest analysis; others default to accountability conversations. People adjust what they share based on who\'s in the room.' },
      { value: 4, label: 'By genuinely trying to understand what happened. The goal is learning, not liability. People feel safe being honest about their role in the problem because honesty is what gets rewarded.' },
    ],
  },
  {
    id: 3, originalId: 11, element: 'CHA',
    text: 'When a leader disagrees with a decision made above them, what do they typically do?',
    options: [
      { value: 1, label: 'Express agreement in the room, then either comply quietly or undermine the decision outside of it. Disagreement goes underground rather than into the conversation where it could matter.' },
      { value: 2, label: 'Comply without pushing back, even when they have real reservations. The cost of disagreeing feels higher than the cost of going along with something they don\'t believe in.' },
      { value: 3, label: 'Most comply; a few push back directly. Whether someone raises a disagreement depends more on their personality than on what the culture expects.' },
      { value: 4, label: 'Raise the disagreement directly and work toward resolution. The culture treats that as normal leadership behavior, not as a risk to be managed.' },
    ],
  },
  {
    id: 4, originalId: 14, element: 'TRU',
    text: 'How consistent is execution with what was agreed in the room?',
    options: [
      { value: 1, label: 'There\'s often a significant gap. Commitments made in meetings don\'t reliably translate into follow-through. People have learned to assume the gap and manage around it.' },
      { value: 2, label: 'Most things get done eventually, but the inconsistency is real enough that people follow up rather than assume. Trust in commitments is partial.' },
      { value: 3, label: 'Generally reliable, with enough exceptions to notice. Most commitments get kept, but there are specific people or situations where the gap between agreement and action is predictable.' },
      { value: 4, label: 'What gets agreed gets done. People\'s word is reliable, gaps get addressed directly when they happen, and the organization doesn\'t need an elaborate follow-up system to function.' },
    ],
  },
  {
    id: 5, originalId: 19, element: 'COM',
    text: 'How does information typically flow across teams in your organization?',
    options: [
      { value: 1, label: 'Slowly and selectively. Teams hold information close because sharing it doesn\'t feel safe or strategically smart. Knowledge is a resource that gets protected, not distributed.' },
      { value: 2, label: 'Unevenly. Some teams share openly; others hoard. Information moves when relationships are good or when someone explicitly asks — not as a default organizational behavior.' },
      { value: 3, label: 'Reasonably well between some teams, but there are clear boundaries where information tends to stop. Cross-boundary sharing depends on individual relationships more than organizational norms.' },
      { value: 4, label: 'Freely and proactively. People share information across boundaries because they understand that everyone doing their job well depends on it — not because someone told them to.' },
    ],
  },
  {
    id: 6, originalId: 1, element: 'IW',
    text: 'When your organization makes a significant decision, how well can leaders at multiple levels explain how that decision connects to what the organization is ultimately trying to achieve?',
    options: [
      { value: 1, label: 'Rarely if ever. Decisions get explained in terms of process, budget, or precedent — not purpose. Most people can\'t connect what they\'re doing to why it matters.' },
      { value: 2, label: 'Occasionally. Senior leaders can usually articulate the connection, but it fades quickly below that level. Most people are operating without a clear line of sight to purpose.' },
      { value: 3, label: 'Often, but inconsistently. The connection to purpose gets made in some decisions and by some leaders, but it\'s not a reliable part of how decisions are communicated across the organization.' },
      { value: 4, label: 'Consistently. The connection to purpose is part of how decisions are made and communicated at every level. People up and down the organization can tell you why what they\'re doing matters.' },
    ],
  },
  {
    id: 7, originalId: 6, element: 'CUR',
    text: 'How would you describe the quality of questions asked in senior leadership meetings?',
    options: [
      { value: 1, label: 'Mostly clarifying or rhetorical. Questions are used to explain, not to challenge. Genuinely provocative questions are rare — or come from only one or two people.' },
      { value: 2, label: 'Occasionally real, mostly safe. There are moments of genuine inquiry, but the norm is questions that don\'t disturb the direction already set.' },
      { value: 3, label: 'Uneven. Some leaders ask hard questions regularly; others never do. Certain topics feel open to challenge; others feel off-limits without anyone saying so.' },
      { value: 4, label: 'Challenging questions are normal. Leaders regularly probe assumptions, push back on conclusions, and treat rigorous inquiry as part of how good decisions get made.' },
    ],
  },
  {
    id: 8, originalId: 9, element: 'CHA',
    text: 'When your organization identifies a hard, uncomfortable problem — one that will require real change to solve — what typically happens?',
    options: [
      { value: 1, label: 'It gets reframed, deferred, or handed off. There\'s always a compelling reason why now isn\'t the right time to address it.' },
      { value: 2, label: 'It gets acknowledged but moves slowly. There\'s intention to address it, but the effort stalls when it gets difficult or politically complicated.' },
      { value: 3, label: 'It depends on the problem and the leader. Some hard things get tackled directly and early; others get managed around for longer than they should.' },
      { value: 4, label: 'It gets engaged directly. The organization has a genuine track record of facing hard things rather than finding sophisticated reasons to avoid them.' },
    ],
  },
  {
    id: 9, originalId: 16, element: 'TRU',
    text: 'When your organization faces an unexpected challenge or crisis, what does decision-making look like?',
    options: [
      { value: 1, label: 'It centralizes quickly. Information flows up, decisions flow down, and the people closest to the problem have little input. Speed gets prioritized over accuracy.' },
      { value: 2, label: 'Mostly centralized, with some exceptions. A few leaders push decision-making toward the problem; most default to waiting for direction from above.' },
      { value: 3, label: 'A mix of centralized and distributed, depending on the leader and the stakes. There\'s no consistent expectation about who should be making what decisions under pressure.' },
      { value: 4, label: 'The people with the best information make the decisions. Authority gets deployed where it\'s most useful, not where it\'s most comfortable — and the organization is faster and more accurate for it.' },
    ],
  },
  {
    id: 10, originalId: 18, element: 'COM',
    text: 'When something fails in your organization, what\'s the first instinct?',
    options: [
      { value: 1, label: 'To establish whose fault it is. Accountability conversations happen fast, and they\'re more about assigning blame than understanding what actually happened.' },
      { value: 2, label: 'Blame first, understanding second. There\'s eventual interest in learning, but the first move is almost always about accountability — and that shapes what people are willing to say.' },
      { value: 3, label: 'It depends on the leader. Some create space for honest analysis; others move straight to blame. People adjust what they share based on who\'s running the conversation.' },
      { value: 4, label: 'To understand what happened. The first question is about the situation, not the person. Accountability follows understanding rather than replacing it.' },
    ],
  },
  {
    id: 11, originalId: 4, element: 'IW',
    text: 'When the organization is under pressure, how does it typically respond?',
    options: [
      { value: 1, label: 'By increasing activity. More meetings, more reports, more visibility. The response to pressure is noise rather than focus — and the actual problem often doesn\'t get addressed.' },
      { value: 2, label: 'Mostly with noise, but some leaders manage to stay focused. The organizational default is activity, even when a few individuals are cutting through it.' },
      { value: 3, label: 'With a mix. Some leaders and teams focus on the real issue; others default to looking busy. The response is inconsistent across the organization.' },
      { value: 4, label: 'By focusing on the actual problem. Pressure sharpens clarity rather than generating noise. The organization gets more focused, not more frantic, when things get hard.' },
    ],
  },
  {
    id: 12, originalId: 8, element: 'CUR',
    text: 'How does important information — particularly bad news or unwelcome data — travel through your organization?',
    options: [
      { value: 1, label: 'Slowly and filtered. Information gets softened, delayed, or withheld before it reaches the people who need it. Leaders are often the last to know what\'s actually happening.' },
      { value: 2, label: 'Unevenly and often late. Some information gets through, but by the time it arrives it has usually been processed enough that the full picture isn\'t clear.' },
      { value: 3, label: 'Reasonably well in some relationships and with some leaders, but inconsistently across the organization. Certain people get straight information; others get a managed version.' },
      { value: 4, label: 'Directly and promptly. People at all levels feel able to share what\'s actually true, including when it\'s uncomfortable, and they trust that doing so won\'t cost them.' },
    ],
  },
  {
    id: 13, originalId: 12, element: 'CHA',
    text: 'When a project or initiative isn\'t working, how does your organization typically respond?',
    options: [
      { value: 1, label: 'It continues longer than it should. The cost of admitting failure feels higher than the cost of continuing to invest in something that isn\'t working.' },
      { value: 2, label: 'It gets called eventually, but later than it should. Significant time and resources get spent getting to the obvious conclusion.' },
      { value: 3, label: 'It depends on who owns it. Some leaders call things early and honestly; others hold on too long. There\'s no consistent organizational expectation around this.' },
      { value: 4, label: 'It gets called early. The organization has enough honesty in its culture to name failure before it compounds — and doing so is treated as good judgment, not as giving up.' },
    ],
  },
  {
    id: 14, originalId: 13, element: 'TRU',
    text: 'In your organization, who most influences important decisions?',
    options: [
      { value: 1, label: 'Whoever has the most authority or political capital. The best argument doesn\'t always win — the most senior voice or the most influential relationship usually does.' },
      { value: 2, label: 'Seniority dominates, with occasional exceptions. Good information and clear thinking sometimes break through, but not reliably enough that people count on it.' },
      { value: 3, label: 'A mix. Authority matters a lot, but the best information usually finds its way into the conversation eventually — even if it takes longer than it should.' },
      { value: 4, label: 'Whoever has the best information and clearest thinking. Authority matters, but it doesn\'t override substance. The organization is genuinely oriented toward getting decisions right.' },
    ],
  },
  {
    id: 15, originalId: 17, element: 'COM',
    text: 'How would you describe collaboration between teams or departments in your organization?',
    options: [
      { value: 1, label: 'Mostly transactional at best, territorial at worst. Teams work together when they have to and protect their own interests when they don\'t. Collaboration requires negotiation.' },
      { value: 2, label: 'Functional but effortful. Teams collaborate when required, but it takes more coordination than it should. There\'s goodwill, but not much natural cross-boundary behavior.' },
      { value: 3, label: 'Genuinely collaborative in some relationships, territorial in others. It depends on the teams involved and their history. There\'s no consistent organizational norm around how collaboration works.' },
      { value: 4, label: 'Genuinely collaborative. Teams share information, resources, and credit in ways that serve the whole organization — not just their own function.' },
    ],
  },
  {
    id: 16, originalId: 2, element: 'IW',
    text: 'How are people\'s daily priorities typically set in your organization?',
    options: [
      { value: 1, label: 'By whatever is loudest or most visible. Urgency drives the day, not importance. People optimize for looking busy rather than moving what actually matters.' },
      { value: 2, label: 'Mostly by urgency, with occasional exceptions. Some leaders try to prioritize meaningfully, but the pull toward reactive work usually wins.' },
      { value: 3, label: 'A mix. People generally understand what matters but get pulled off track regularly by competing demands and unclear priorities.' },
      { value: 4, label: 'By what actually moves the most important outcomes. People can articulate why their priorities are their priorities — and they protect that time.' },
    ],
  },
  {
    id: 17, originalId: 5, element: 'CUR',
    text: 'When a leader or employee raises a concern that challenges an existing decision or direction, what typically happens?',
    options: [
      { value: 1, label: 'The concern gets acknowledged politely and set aside. The direction doesn\'t change, and the person who raised it has quietly learned not to do it again.' },
      { value: 2, label: 'The concern gets heard but rarely changes anything. Leaders listen, but follow-through on genuine reconsideration is rare enough that people have stopped expecting it.' },
      { value: 3, label: 'It depends on who raised it and who is being challenged. Some leaders engage concerns genuinely; others don\'t. Outcomes are inconsistent enough that people can\'t predict what will happen.' },
      { value: 4, label: 'The concern gets genuinely engaged. It either changes the decision or produces a clear explanation of why it doesn\'t — and the person who raised it is respected for doing so.' },
    ],
  },
  {
    id: 18, originalId: 10, element: 'CHA',
    text: 'How are difficult performance conversations handled in your organization?',
    options: [
      { value: 1, label: 'Avoided or delayed until the situation becomes a crisis. Most leaders find reasons to wait, and by the time the conversation happens it\'s usually too late to change the outcome.' },
      { value: 2, label: 'Eventually handled, but rarely early. Leaders get there when they have to, not when they should — and the delay usually makes the conversation harder than it needed to be.' },
      { value: 3, label: 'Some leaders handle them well and promptly; others let things linger far longer than they should. There\'s no consistent expectation about when or how these conversations happen.' },
      { value: 4, label: 'Directly and early. Leaders treat addressing performance honestly as a core part of their job — not an uncomfortable exception to it.' },
    ],
  },
  {
    id: 19, originalId: 15, element: 'TRU',
    text: 'How openly do people in your organization communicate concerns about leadership or direction?',
    options: [
      { value: 1, label: 'Carefully and indirectly. Most people have learned — through experience or observation — that being too direct about concerns carries real professional risk.' },
      { value: 2, label: 'With significant filtering. People raise concerns, but rarely the full version. What gets said is calibrated to what feels safe rather than what\'s actually true.' },
      { value: 3, label: 'With some people and on some topics, yes — but there are clear limits. Certain concerns can be raised; others feel off-limits. People know the difference without being told.' },
      { value: 4, label: 'Directly. People feel genuinely safe raising concerns up the chain, and leadership responds in ways that reinforce rather than erode that safety over time.' },
    ],
  },
  {
    id: 20, originalId: 20, element: 'COM',
    text: 'How would you describe the sense of shared purpose across your organization?',
    options: [
      { value: 1, label: 'Largely absent. People are connected to their team or their own role, but there\'s no felt sense of collective mission. The organization moves, but not together.' },
      { value: 2, label: 'Present at the top, faint below it. Senior leaders can articulate the shared purpose; most people further down can\'t — or don\'t think about it as relevant to their daily work.' },
      { value: 3, label: 'Real but uneven. There are pockets of genuine shared purpose — certain teams or moments when it\'s palpable — but it\'s not consistent across the organization.' },
      { value: 4, label: 'Palpable at every level. People across the organization can tell you what they\'re collectively trying to build and feel genuinely connected to it — not just professionally, but personally.' },
    ],
  },
]

export const forcedChoiceQuestions: ForcedChoiceQuestion[] = [
  {
    id: 21, originalId: 21,
    resolves: ['performative', 'frozen'],
    text: 'Which better describes your organization?',
    options: [
      {
        value: 'A',
        archetype: 'performative',
        label: 'Our organization is good at appearing aligned. Meetings feel productive, people are professional, and disagreement rarely surfaces openly — but you get the sense that the real conversations happen somewhere else.',
      },
      {
        value: 'B',
        archetype: 'frozen',
        label: 'There are specific things in our organization that most people know need to change — a decision, a dynamic, a leader — and everyone has quietly agreed, without ever saying so, not to bring them up directly.',
      },
    ],
  },
  {
    id: 22, originalId: 22,
    resolves: ['exhausted', 'drifting'],
    text: 'Which better describes your organization?',
    options: [
      {
        value: 'A',
        archetype: 'exhausted',
        label: 'There\'s genuine effort here — people are working hard and care about doing well. But the organization keeps revisiting the same problems, launching the same kinds of initiatives, and the energy never quite translates into the progress it should.',
      },
      {
        value: 'B',
        archetype: 'drifting',
        label: 'The effort is there but the electricity isn\'t. People do their jobs competently and without much complaint — but the sense that the work really matters, or that everyone is genuinely in it together, has quietly faded.',
      },
    ],
  },
  {
    id: 23, originalId: 23,
    resolves: ['siloed', 'frozen'],
    text: 'Which better describes your organization?',
    options: [
      {
        value: 'A',
        archetype: 'siloed',
        label: 'The dysfunction is mostly horizontal — between teams. Getting people to collaborate across boundaries is harder than it should be, and teams tend to look out for their own interests before the organization\'s.',
      },
      {
        value: 'B',
        archetype: 'frozen',
        label: 'The dysfunction is mostly vertical — within the leadership dynamic. It\'s not that teams don\'t work together, it\'s that there are things people won\'t say up the chain, and decisions that should be challenged aren\'t.',
      },
    ],
  },
  {
    id: 24, originalId: 24,
    resolves: ['performative', 'siloed'],
    text: 'Which better describes your organization?',
    options: [
      {
        value: 'A',
        archetype: 'performative',
        label: 'Leaders tend to get a managed version of reality. People are careful about what they share upward — not out of malice, but because the culture has taught them that full honesty isn\'t always safe or strategic.',
      },
      {
        value: 'B',
        archetype: 'siloed',
        label: 'Leaders tend to get an incomplete version of reality. Not because people are managing perceptions, but because information lives inside teams and nobody thinks to move it across boundaries until it becomes a problem.',
      },
    ],
  },
]

export const ROLE_OPTIONS = [
  'C-Suite',
  'VP / SVP',
  'Director',
  'Manager',
  'Individual Contributor',
  'Other',
]
