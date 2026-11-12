import { useState } from 'react'

import { cx } from '../lib/cx'

// Photos live in public/images. If one is missing the frame falls back to the
// monogram instead of a broken-image icon.
export function Portrait({
  src,
  alt,
  className,
  fallbackClassName,
}: {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cx(
          'grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,122,69,0.22),transparent_62%),#101017]',
          className,
          fallbackClassName,
        )}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-6xl italic text-accent/50">A</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
