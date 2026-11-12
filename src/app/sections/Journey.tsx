import { Reveal } from '../components/Reveal'
import { education, experience } from '../../data/profile'

export function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 border-t border-line/70 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">04 — Journey</p>
          <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
            Learning in <span className="font-display italic text-muted">public.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Education</h3>
            </Reveal>

            <ol className="mt-6 space-y-8 border-l border-line pl-6">
              {education.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <li className="relative">
                    <span className="absolute -left-[31px] top-2 size-2.5 rounded-full border border-accent/60 bg-bg">
                      <span className="absolute inset-[3px] rounded-full bg-accent" />
                    </span>
                    <p className="text-xs uppercase tracking-[0.15em] text-accent">{item.meta}</p>
                    <h4 className="mt-2 text-xl font-medium tracking-tight">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted">{item.place}</p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-faint">{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Experience</h3>
            </Reveal>

            <ol className="mt-6 space-y-8 border-l border-line pl-6">
              {experience.map((item) => (
                <Reveal key={item.title} delay={0.05}>
                  <li className="relative">
                    <span className="absolute -left-[31px] top-2 size-2.5 rounded-full border border-cool/60 bg-bg">
                      <span className="absolute inset-[3px] rounded-full bg-cool" />
                    </span>
                    <p className="text-xs uppercase tracking-[0.15em] text-cool">{item.meta}</p>
                    <h4 className="mt-2 text-xl font-medium tracking-tight">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted">{item.place}</p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-faint">{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
