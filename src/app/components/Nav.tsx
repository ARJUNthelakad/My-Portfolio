import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cx } from '../lib/cx'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#journey', label: 'Journey' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-accent via-accent-soft to-cool"
      />

      <div
        className={cx(
          'transition-colors duration-300',
          scrolled ? 'border-b border-line/80 bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20">
          <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-surface-2 font-display text-lg italic text-accent transition-colors group-hover:border-accent/50">
              A
            </span>
            <span className="text-sm font-medium tracking-tight">
              Arjun T
              <span className="ml-2 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:inline">
                Portfolio
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="mailto:thelakkadarjun86@gmail.com"
              className="hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Let&rsquo;s talk
              <ArrowUpRight className="size-4" />
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl border border-line bg-surface/95 p-2 backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 text-faint" />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
