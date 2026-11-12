import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { Portrait } from '../components/Portrait'
import { Scene3D } from '../components/Scene3D'
import { heroStats, profile } from '../../data/profile'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-24"
    >
      <div className="absolute inset-0 -z-10">
        <Scene3D />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,transparent_0%,rgba(8,8,11,0.55)_70%,var(--color-bg)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs text-muted backdrop-blur"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability} · Kerala, India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className="mt-7 text-[clamp(3.4rem,11vw,8rem)] font-semibold uppercase leading-[0.84] tracking-[-0.05em] lg:text-[clamp(4rem,7vw,7rem)]"
            >
              Arjun{' '}
              <span className="inline-block font-display font-normal italic tracking-[-0.02em] text-accent">T</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease }}
              className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl"
            >
              MCA student building web applications, backends and small 3D worlds. I like taking an idea from a
              half-formed sketch to something people can actually click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-[#160b06] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_var(--color-accent)]"
              >
                View selected work
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/40 px-6 py-3.5 text-sm font-medium text-fg backdrop-blur transition-colors hover:border-fg/30 hover:bg-surface"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6 md:mt-16 md:gap-8"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-medium tracking-tight md:text-3xl">{stat.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-faint">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
          >
            <div
              aria-hidden
              className="absolute -inset-5 -z-10 rounded-[40px] bg-accent/10 blur-3xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line-strong bg-surface shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
              <Portrait
                src="/images/portrait-1.jpg"
                alt="Arjun T"
                className="h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-fg/75 backdrop-blur">
                MCA · 2026
              </span>
              <p className="absolute bottom-4 left-4 font-display text-2xl italic text-fg/90">Arjun T</p>
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
              Malappuram · Kerala
            </p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-faint transition-colors hover:text-fg md:flex"
      >
        <ArrowDown className="size-3.5 animate-bounce" />
        Scroll
      </motion.a>
    </section>
  )
}
