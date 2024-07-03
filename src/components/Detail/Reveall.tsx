import React, {useEffect, useRef} from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
const Reveall: React.FC = () => {
  const deckDivRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<Reveal.Api | null>(null)
  useEffect(() => {
    if (deckRef.current) return
    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: 'slide',
    })
    deckRef.current.initialize().then(() => {})
    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy()
          deckRef.current = null
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.', e, 'IShlayabdi')
      }
    }
  }, [])
  return (
    <div className='reveal' ref={deckDivRef}>
      <div className='slides'>
        <section>Slide 1</section>
        <section>Slide 2</section>
      </div>
    </div>
  )
}
export default Reveall
