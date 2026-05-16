import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f1f30] flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10">
        <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
          Bellomo Leadership
        </p>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <span className="inline-block bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Organizational Diagnostic
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
            Operational<br />
            <span className="font-semibold">Courage Index</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed mb-4">
            The OCI measures where a lack of courage is creating drag on your
            operational effectiveness — and shows you exactly where to start fixing it.
          </p>
        </div>

        {/* What to expect */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-semibold text-white mb-1">24</p>
              <p className="text-white/50 text-sm">questions</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white mb-1">8–10</p>
              <p className="text-white/50 text-sm">minutes</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white mb-1">1</p>
              <p className="text-white/50 text-sm">clear result</p>
            </div>
          </div>
        </div>

        {/* Intro text */}
        <div className="text-white/60 text-sm leading-relaxed mb-10 space-y-3">
          <p>
            There are no right or wrong answers. The most useful responses are honest ones —
            describe your organization as it <em className="text-white/80">actually operates</em>, not as you wish it did.
          </p>
          <p>
            Your responses are anonymous and will be reported only at the group level.
          </p>
          <p className="text-white/40 italic">
            This is not a survey. It is a mirror.
          </p>
        </div>

        <Link
          href="/survey"
          className="inline-flex items-center justify-center bg-white text-[#0f1f30] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-colors w-full md:w-auto md:self-start"
        >
          Begin the Diagnostic →
        </Link>
      </div>
    </main>
  )
}
