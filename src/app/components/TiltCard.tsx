import { useState, type PointerEvent, type ReactNode } from 'react'

import { cx } from '../lib/cx'

export function TiltCard({
  children,
  className,
  intensity = 7,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const [transform, setTransform] = useState<string | undefined>(undefined)
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return

    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    setTransform(
      `perspective(1200px) rotateX(${((0.5 - py) * intensity).toFixed(2)}deg) rotateY(${((px - 0.5) * intensity).toFixed(2)}deg)`,
    )
    setGlare({ x: px * 100, y: py * 100 })
  }

  const reset = () => setTransform(undefined)

  return (
    <div
      className={cx('group relative will-change-transform', className)}
      style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(520px circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.07), transparent 42%)`,
        }}
      />
    </div>
  )
}
