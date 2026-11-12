import { Nav } from './components/Nav'
import { About } from './sections/About'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

export function App() {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="grain" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}
