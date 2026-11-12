# Arjun T — Portfolio

A dark, single-page portfolio with an interactive Three.js hero: a 9,000-point
particle shell that breathes and leans toward the pointer, wrapped in orbit
rings and a glowing core. Below it: about, toolkit, three projects on
pointer-reactive 3D tilt cards, education and internship timeline, and contact.

## Run it

```sh
bun install
bun run dev        # http://localhost:5173
bun run build      # dist/client (assets) + dist/arjun-portfolio/index.js (Worker)
bun run typecheck
```

## Make it yours

- `src/data/profile.ts` holds every piece of copy: stats, skills, projects,
  education, experience and interests. Edit this first.
- `public/images/portrait-1.jpg` is the hero portrait and
  `public/images/portrait-2.jpg` the About frame; the frames fall back to a
  monogram if either file is missing. Project covers live in
  `public/images/projects/` and are referenced from `src/data/profile.ts`.
- `src/app/sections/*` are the page sections; `src/app/components/*` the shared
  pieces (nav, reveal, tilt card, 3D scene).
- `src/styles.css` holds the tokens: near-black canvas, warm off-white text,
  a single orange accent with a cool blue counterpoint, Instrument Serif
  italics for display type and Inter for the rest.
- `src/app/components/Scene3D.tsx` is the WebGL scene. Particle count, colours,
  orbit rings and camera framing all live there; it respects
  `prefers-reduced-motion` and disposes cleanly.
- `src/worker/index.ts` serves the built assets; the page itself is static.

## Deploy with Freebuff Sites

`deploy.json` points at the build output. After `bun run build`, deploy with
the `sites_deploy` tool from this directory.
