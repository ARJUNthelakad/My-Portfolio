import { Check, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

import { Reveal } from '../components/Reveal'
import { profile } from '../../data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line/70">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,rgba(255,122,69,0.16),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">06 — Contact</p>
          <h2 className="mt-6 max-w-3xl text-balance text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Let&rsquo;s build something{' '}
            <span className="font-display italic text-accent">worth clicking.</span>
          </h2>
          <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted">
            I&rsquo;m open to internships, junior developer roles and collaborations. If you have a project — or a
            problem that needs untangling — my inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-sm text-muted transition-colors hover:border-fg/30 hover:text-fg"
            >
              {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-bg/80 p-6">
              <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                <Phone className="size-3.5" /> Phone
              </dt>
              <dd className="mt-3 text-sm">
                <a href={`tel:${profile.phoneHref}`} className="transition-colors hover:text-accent">
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div className="bg-bg/80 p-6">
              <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                <Mail className="size-3.5" /> Email
              </dt>
              <dd className="mt-3 truncate text-sm">
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div className="bg-bg/80 p-6">
              <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                <MapPin className="size-3.5" /> Location
              </dt>
              <dd className="mt-3 text-sm">{profile.location}</dd>
            </div>
          </dl>
        </Reveal>

        <footer className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Designed and built from scratch.
          </p>
          <p className="font-mono uppercase tracking-[0.15em]">React · Three.js · Tailwind</p>
        </footer>
      </div>
    </section>
  )
}
