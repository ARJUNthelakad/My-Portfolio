import { Hono } from 'hono'

// A single-page portfolio: the Worker only needs to answer health checks and
// hand everything else to the static asset binding.
type Env = { ASSETS: Fetcher }

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
