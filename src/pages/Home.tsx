import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Headline from '../components/Headline'
import IdCard from '../components/IdCard'
import Magnetic from '../components/Magnetic'
import Moments from '../components/Moments'
import { About, Contact, Experience, Work } from '../components/Sections'
import { scrollToId } from '../lib/scroll'
import { profile } from '../data/profile'

export default function Home() {
  const { state } = useLocation() as { state: { to?: string } | null }
  useEffect(() => {
    if (state?.to) setTimeout(() => scrollToId(state.to!), 650) // wait for page transition
  }, [state])

  return (
    <>
      <section id="home" className="hero" aria-label="Introduction">
        <IdCard />
        <div className="hero-copy">
          <Headline />
          <p className="hero-sub">{profile.intro}</p>
          <div className="hero-cta">
            <Magnetic><button className="btn solid" onClick={() => scrollToId('work')}>View work</button></Magnetic>
            <Magnetic><button className="btn" onClick={() => scrollToId('about')}>About me</button></Magnetic>
          </div>
        </div>
        <p className="hint">Drag the card, or click to flip it</p>
      </section>
      <Moments />
      <Work />
      <About />
      <Experience />
      <Contact />
    </>
  )
}
