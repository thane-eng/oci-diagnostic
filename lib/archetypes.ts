import type { ArchetypeKey } from './questions'

export interface Archetype {
  key: ArchetypeKey
  name: string
  primaryGap: string
  tagline: string
  body: string
  courageEconomy: string
  cta: string
  ctaResonance: string
}

export const archetypes: Record<ArchetypeKey, Archetype> = {
  performative: {
    key: 'performative',
    name: 'The Performative Organization',
    primaryGap: 'Curiosity + Trust',
    tagline: 'Your organization has mastered the appearance of alignment.',
    body: `Meetings run smoothly. People are professional and polished. Disagreement is rare — or at least, it's rare in the room. What happens in the hallway afterward, in the smaller conversations, in the messages sent after the meeting ends — that's a different story.

The problem isn't that your people are dishonest. It's that your culture has made honesty expensive. Over time, leaders and teams have learned — through subtle signals, not formal policy — that raising the wrong concern at the wrong moment carries real risk. So they've adapted. They've gotten very good at saying the right things while thinking different ones.

This creates a specific kind of organizational blindness. Leaders at the top are making decisions based on information that has already been filtered, softened, and managed on its way up. They think they know what's happening. They don't — not fully. And the people who do know aren't telling them, because they've learned not to.

The cost is invisible until it isn't. Strategies fail in execution for reasons nobody can quite explain. Talented people leave without warning. A problem that everyone knew about for months surfaces as a crisis. And when it does, there's always a moment of genuine surprise at the top — which the rest of the organization finds quietly unsurprising.

The path out of a Performative Organization doesn't start with a new communication strategy or a town hall. It starts with leaders who are willing to make honesty safe — not by asking for it, but by rewarding it when it's uncomfortable, and by being honest themselves when it costs them something.

That's where the real work begins.`,
    courageEconomy: `The Courage Economy is built on a simple premise: honesty becomes possible when it becomes safe, and it becomes safe when leaders demonstrate — through their own behavior, not their stated values — that truth-telling is rewarded rather than punished. Organizations that move out of this pattern don't do it through policy or training. They do it through a deliberate, sustained practice of leaders choosing transparency when concealment would be easier. That practice is learnable. It's also measurable. And it changes organizational culture faster than most leaders expect, because people are watching — and they respond quickly when they see that the rules have genuinely changed.`,
    cta: 'If you recognized your organization in this, let\'s talk. A single conversation about what\'s driving the pattern — and where to start changing it — is often more clarifying than months of trying to name it from the inside.',
    ctaResonance: 'If you recognized your organization in this',
  },
  exhausted: {
    key: 'exhausted',
    name: 'The Exhausted Organization',
    primaryGap: 'Important Work + Challenge',
    tagline: 'Your people are trying. That part is real.',
    body: `The effort is genuine — you can see it in the hours people put in, the initiatives they launch, the energy they bring to the work. What's harder to see is that a significant amount of that effort isn't going anywhere. It's motion without destination. Activity without outcome.

The root problem is that your organization hasn't answered — or has stopped asking — the question that everything else depends on: why does this work matter? Not in the mission-statement sense. In the daily, operational, this-meeting-this-decision-this-quarter sense. When people can't answer that question, they optimize for the next best thing: looking productive, meeting deadlines, clearing their inbox.

Hard problems don't get solved in this environment — they get restarted. An initiative launches with energy, stalls when it gets difficult, and eventually gets replaced by a new initiative that will follow the same arc. Leaders begin to suspect that something is off but can't quite name it. People begin to feel a low-grade cynicism that isn't quite burnout — it's closer to a collective sense that the effort isn't actually adding up to anything.

The most dangerous symptom of the Exhausted Organization is that your best people leave first. Not because the work is hard — they can handle hard. Because hard work that doesn't lead anywhere stops feeling worth it.

Rebuilding an Exhausted Organization requires two things done simultaneously: reconnecting people to work that genuinely matters, and building the organizational muscle to stay with hard problems long enough to actually solve them. One without the other doesn't hold.`,
    courageEconomy: `The Courage Economy starts with Important Work — the conviction that what the organization is doing genuinely matters, and that leaders can articulate why clearly enough that people feel it, not just hear it. When that foundation is in place, everything changes: hard problems become worth solving because the outcome is worth having, difficult conversations become possible because the stakes are real, and effort stops feeling like motion and starts feeling like progress. The good news about an Exhausted Organization is that the energy is already there. It doesn't need to be manufactured. It needs to be pointed at something real — and led by people courageous enough to stay with it when it gets hard.`,
    cta: 'If this describes where your organization is right now, let\'s talk. The exhaustion is a signal, not a sentence — and the path out is clearer than it probably feels from the inside.',
    ctaResonance: 'If this describes where your organization is right now',
  },
  frozen: {
    key: 'frozen',
    name: 'The Frozen Organization',
    primaryGap: 'Challenge + Trust',
    tagline: 'Your organization knows what the problems are.',
    body: `That's what makes this pattern so specific — and so costly. This isn't an organization that lacks self-awareness. Most people inside it could tell you, if they trusted that telling you was safe, exactly what needs to change. They could name the leader who is creating drag. They could describe the decision that should have been reversed six months ago. They could point to the dynamic that everyone manages around but nobody addresses directly.

They just don't say it out loud. Not in the room where it would matter.

The Frozen Organization isn't paralyzed by confusion — it's paralyzed by a calculated assessment of risk. At some point, the culture established — again, not through formal policy, but through what happened to people who spoke up — that the cost of naming certain truths out loud is higher than the cost of living with them. So the organization adapted. Workarounds multiplied. People got skilled at working around the dysfunction rather than resolving it.

The result is an organization that doesn't collapse — it calcifies. It continues to function, sometimes at a reasonably high level, while quietly accumulating the cost of every problem it chose not to face. That cost compounds. The longer a Frozen Organization stays frozen, the more expensive the thaw becomes.

What breaks the freeze is never a process change, a reorg, or a new strategic plan. It's a leader — usually at the top, sometimes in the middle — who decides that the truth is worth the discomfort of saying it, and then survives having said it. That single act, done visibly and without consequence, changes what's possible for everyone watching.`,
    courageEconomy: `The Courage Economy offers a direct answer to frozen organizations: the thaw begins with a single act of visible, costly honesty — and it spreads from there. What makes this actionable is that it doesn't require everyone to change at once. It requires one leader, in one moment, to say the true thing in the room where it matters. The Courage Economy framework gives leaders the language, the tools, and the coaching to be that leader — and then to build a culture where that act is no longer exceptional because it's no longer necessary to be exceptional to do it. Organizations that make this shift don't just solve the problem everyone knew about. They fundamentally change what's possible for every problem that comes after.`,
    cta: 'If your organization has problems everyone knows about and nobody is saying out loud, let\'s talk. That pattern is solvable — and it usually starts with one conversation.',
    ctaResonance: 'If your organization has problems everyone knows about and nobody is saying out loud',
  },
  siloed: {
    key: 'siloed',
    name: 'The Siloed Organization',
    primaryGap: 'Community + Curiosity',
    tagline: 'Your teams are competent. That\'s not the problem.',
    body: `The problem is that your teams are competent in isolation — and the organization is quietly paying for the gap between them. Information that one team has and another team needs doesn't flow naturally. Collaboration happens when it's required and stops when it's optional. Credit gets claimed within teams and blame gets assigned across them. And the questions that would reveal how all the pieces fit together — or don't — rarely get asked, because nobody is particularly curious about what's happening on the other side of the boundary.

This pattern often develops in organizations that grew quickly, or that hired strong leaders who built strong teams, without building the connective tissue between them. The silos aren't the result of bad intentions. They're the result of a culture that rewarded individual team performance without equally rewarding collective outcomes.

The visible symptoms are frustrating but easy to explain away: slow handoffs, duplicated work, miscommunication between teams, a persistent sense that the right hand doesn't know what the left hand is doing. The invisible symptom is harder to quantify — it's the value that never gets created because nobody thought to ask the question across the boundary.

The Siloed Organization doesn't need a collaboration initiative or a cross-functional task force. It needs leaders who are genuinely curious about what's happening outside their own domain, and who model the behavior of asking across boundaries rather than defending them.`,
    courageEconomy: `The Courage Economy addresses silos at their root — not by mandating collaboration, but by building the curiosity and community that make genuine collaboration natural. When leaders become genuinely interested in what's happening outside their domain, and when the culture begins rewarding collective outcomes as much as individual team performance, the boundaries don't disappear overnight — but they stop being defended. The practical work here is specific and concrete: it targets the leaders whose behavior is reinforcing the silos, the cultural signals that make boundary-crossing feel risky, and the organizational structures that reward the wrong outcomes. That work is doable. And it produces results that show up fast — because the capability for collaboration already exists. It just needs permission.`,
    cta: 'If your teams are strong in isolation but struggling to operate as a whole, let\'s talk. The gap between where you are and where you could be is almost always smaller than it looks.',
    ctaResonance: 'If your teams are strong in isolation but struggling to operate as a whole',
  },
  drifting: {
    key: 'drifting',
    name: 'The Drifting Organization',
    primaryGap: 'Important Work + Community',
    tagline: 'There\'s no villain in this story. That\'s what makes it hard to solve.',
    body: `The Drifting Organization wasn't always drifting. At some point — at founding, after a significant win, in the early days of a new leader's tenure — there was energy here. People knew what they were building and felt connected to each other in the building of it. That's not a fantasy. The evidence of it is still there in the way people talk about that time, if you ask them.

What happened since then is harder to pinpoint. The work stopped feeling like it mattered quite as much. The team that used to feel like a team started feeling more like a department. The shared purpose that used to be in the air became something that lived in a document somewhere. And the organization kept moving — kept hitting targets, kept running meetings, kept launching initiatives — without anyone making a conscious decision to change any of it. It just gradually became less than it was.

The Drifting Organization is often filled with people who are professionally competent and personally disconnected. They do their jobs. They don't complain. But if you asked them whether they feel genuinely energized by the work and genuinely connected to the people they do it with, the honest answer — the one they give in exit interviews, not performance reviews — would tell you something important.

What a Drifting Organization needs isn't a new strategy or a culture initiative. It needs its leaders to answer one question, honestly and together: what are we actually trying to build, and does it matter enough to ask people to give their best to it? Everything else follows from that answer — or it doesn't, and the drift continues.`,
    courageEconomy: `The Courage Economy begins with a question that drifting organizations have stopped asking: does this work matter enough to ask people to give their best to it? Answering that question honestly — and then leading from that answer — is the act of courage that reverses the drift. This isn't abstract. It's a specific leadership practice: reconnecting the work to genuine purpose, rebuilding the sense that the people doing it are in it together, and making both of those things visible in the daily decisions leaders make. Organizations that do this don't just re-energize their culture. They discover that the talent and commitment they thought they'd lost was never gone — it was waiting for a reason to show up again.`,
    cta: 'If your organization has lost some of what made it worth giving your best to, let\'s talk. That\'s not a permanent condition — and it\'s almost always recoverable faster than people think.',
    ctaResonance: 'If your organization has lost some of what made it worth giving your best to',
  },
}
