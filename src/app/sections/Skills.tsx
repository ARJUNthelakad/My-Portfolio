import { Reveal } from '../components/Reveal'
import { skillGroups } from '../../data/profile'

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-line/70 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">02 — Toolkit</p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
              What I build <span className="font-display italic text-muted">with.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-faint">
              A working set rather than a list of logos — everything here has shipped in at least one project.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.04} className="bg-bg">
              <div className="group h-full bg-surface/40 p-7 transition-colors duration-300 hover:bg-surface">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium tracking-tight">{group.title}</h3>
                  <span className="font-mono text-[10px] text-faint">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 text-xs text-faint">{group.note}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-bg/60 px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-line-strong group-hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
