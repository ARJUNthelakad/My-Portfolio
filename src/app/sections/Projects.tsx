import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { projects } from '../../data/profile'
import { cx } from '../lib/cx'

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-24 border-t border-line/70 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">03 — Selected work</p>
          <h2 className="mt-5 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
            Three projects, <span className="font-display italic text-muted">one obsession:</span> making the
            interface feel alive.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <TiltCard className="rounded-[28px]">
                <article className="relative grid gap-6 rounded-[28px] border border-line bg-surface/40 p-4 transition-colors duration-300 hover:border-line-strong md:grid-cols-[0.95fr_1.05fr] md:gap-8 md:p-5">
                  <div className={cx('order-1', index % 2 === 1 && 'md:order-2')}>
                    <div className="relative h-full min-h-[240px] overflow-hidden rounded-[22px] border border-line bg-[#0a0a0f]">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-fg/80 backdrop-blur">
                        <span
                          className={cx(
                            'size-1.5 rounded-full',
                            project.status === 'In progress' ? 'bg-accent' : 'bg-cool',
                          )}
                        />
                        {project.status}
                      </div>
                    </div>
                  </div>

                  <div className="order-2 flex flex-col justify-between gap-6 px-2 py-3 md:px-3 md:py-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[11px] tracking-[0.2em] text-faint">{project.index}</p>
                          <h3 className="mt-2 text-2xl font-medium tracking-[-0.02em] md:text-3xl">{project.title}</h3>
                          <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
                        </div>
                        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>

                      <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted">
                        {project.blurb}
                      </p>
                    </div>

                    <ul className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-line bg-bg/50 px-2.5 py-1 text-[11px] text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
