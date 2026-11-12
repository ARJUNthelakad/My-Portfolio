import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '../components/Reveal'
import { certifications, courseraProfileUrl } from '../../data/profile'

const groups = [
  { programme: 'Specialization', label: 'Specializations' },
  { programme: 'Course', label: 'Courses' },
] as const

export function Certifications() {
  return (
    <section id="certificates" className="relative scroll-mt-24 border-t border-line/70 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">05 — Credentials</p>
          <h2 className="mt-5 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
            Proof of the <span className="font-display italic text-muted">extra mile.</span>
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-sm leading-relaxed text-muted">
            {certifications.length} Coursera certificates earned alongside college — four specializations and four
            standalone courses. Every title opens its verified credential.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {groups.map((group, index) => {
            const items = certifications.filter((cert) => cert.programme === group.programme)
            if (items.length === 0) return null

            return (
              <Reveal key={group.programme} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-surface/40 p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{group.label}</h3>
                    <span className="font-mono text-[11px] text-accent">{String(items.length).padStart(2, '0')}</span>
                  </div>

                  <ul className="mt-4 border-t border-line/60">
                    {items.map((cert) => {
                      const meta = cert.issuer ?? 'Coursera'

                      return (
                        <li key={cert.name} className="border-b border-line/60 last:border-b-0">
                          {cert.url ? (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="group flex items-start justify-between gap-3 py-3.5"
                            >
                              <span className="min-w-0">
                                <span className="block text-sm leading-snug text-fg/90 transition-colors group-hover:text-accent">
                                  {cert.name}
                                </span>
                                <span className="mt-1 block text-[11px] uppercase tracking-[0.1em] text-faint">
                                  {meta}
                                </span>
                              </span>
                              <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                            </a>
                          ) : (
                            <div className="flex items-start justify-between gap-3 py-3.5">
                              <span className="min-w-0">
                                <span className="block text-sm leading-snug text-fg/90">{cert.name}</span>
                                <span className="mt-1 block text-[11px] uppercase tracking-[0.1em] text-faint">
                                  {meta}
                                </span>
                              </span>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        {courseraProfileUrl ? (
          <Reveal delay={0.12}>
            <a
              href={courseraProfileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-80"
            >
              View all certificates on Coursera
              <ArrowUpRight className="size-3.5" />
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
