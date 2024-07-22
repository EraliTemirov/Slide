import React, {useRef, useEffect} from 'react'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes'
import RevealZoom from 'reveal.js/plugin/zoom/zoom'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'

interface Content {
  title: string
  content: string
}

interface Description {
  content: Content[]
}

interface Plan {
  name: string
  description: Description[]
}

interface PresentationComponentProps {
  data: {
    name: string
    plans: Plan[]
  }
  isFullscreen: boolean
}

const PresentationComponent: React.FC<PresentationComponentProps> = ({data, isFullscreen}) => {
  const deckDivRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<Reveal.Api | null>(null)

  useEffect(() => {
    if (!data || !deckDivRef.current) return

    revealRef.current = new Reveal(deckDivRef.current, {
      plugins: [RevealZoom, RevealNotes],
      transition: 'slide',
      center: true,
      width: '100%',
      height: '100%',
    })

    revealRef.current.initialize()

    return () => {
      revealRef.current?.destroy()
    }
  }, [data])

  useEffect(() => {
    if (revealRef.current) {
      revealRef.current.layout()
    }
  }, [isFullscreen])

  if (!data) return null

  return (
    <div className={`reveal h-full ${isFullscreen ? 'fullscreen' : ''}`} ref={deckDivRef}>
      <div className='slides'>
        <section className='mt-2'>
          <div className='text-center mt-10'>
            <h4 className='text-lg'>
              O'zbekiston Respublikasi Raqamli texnologiyalar vazirligi Muhammad al-Xorazmiy
              nomidagi Toshkent axborot texnologiyalari universiteti
            </h4>
            <p className='text-xl md:text-3xl mt-10'>{data.name}</p>
          </div>
          <div className='text-right mt-4 md:mt-8'>
            <p>
              <span>Guruh:</span> 124
            </p>
            <p>
              <span>Bajardi:</span> Kimdir
            </p>
            <p>
              <span>Tekshirdi:</span> Boshqasi
            </p>
          </div>
          <p className='text-center text-lg md:text-2xl mt-10'>2024-yil</p>
        </section>
        {data.plans?.map((plan, index) => (
          <section key={index} data-background-color='#0c1821'>
            <h3 className='text-xl md:text-2xl mt-2'>{plan.name}</h3>
            <div className='flex flex-wrap'>
              {plan.description?.map((desc, descIndex) => (
                <ul key={descIndex} className='mt-4 w-full md:w-1/2'>
                  {desc.content?.map((content, contentIndex) => (
                    <li key={contentIndex} className='mt-2 fragment'>
                      <h5 className='text-base md:text-lg'>{content.title}</h5>
                      <p className='text-sm md:text-base'>{content.content}</p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default PresentationComponent
