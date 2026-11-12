import { Portrait } from '../components/Portrait'
import { Reveal } from '../components/Reveal'
import { interests, profile } from '../../data/profile'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-line/70 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">01 — About</p>
            <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
              Curious by default,
              <br />
              <span className="font-display italic text-muted">building by habit.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="relative mt-10 w-full max-w-[380px]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-line bg-surface">
                <Portrait
                  src="/images/portrait-2.jpg"
                  alt="Arjun T seated, leaning on one hand"
                  className="h-full w-full object-cover object-[50%_22%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm font-medium">{profile.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-fg/60">
                      {profile.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-fg/70 backdrop-blur">
                    MCA
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <p className="text-pretty text-lg leading-relaxed text-muted">
              Hello — I&rsquo;m Arjun, an MCA student with a BCA from Yenepoya Deemed to be University, Bangalore.
              I&rsquo;m drawn to the part of programming where a blank file turns into an application someone can
              use: a storefront, a social feed, a shoe you can spin around.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-pretty text-lg leading-relaxed text-muted">
              I work mostly in Python and the web — Django on the server, HTML, CSS and JavaScript in the browser,
              SQL underneath. Lately I&rsquo;ve been pushing into React and Three.js because interactive 3D feels
              like the next honest step for e-commerce.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line bg-surface/60 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Currently</p>
              <p className="mt-3 text-fg">
                First-year MCA · building a 3D footwear store with React and Three.js · sharpening Django.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="flex flex-wrap gap-2 pt-2">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
