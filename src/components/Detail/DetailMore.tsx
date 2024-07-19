import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import Reveal from 'reveal.js'
import mainApiInstance from '../mainApiInstance'
import {useParams} from 'react-router-dom'
import RevealNotes from 'reveal.js/plugin/notes/notes'
import RevealZoom from 'reveal.js/plugin/zoom/zoom'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import './DetailMore.css'

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

interface PresentationData {
  name: string
  plans: Plan[]
  description: string
  likes: number
  dislikes: number
  views: number
}

interface PresentationComponentProps {
  data: PresentationData | null
  deckDivRef: React.RefObject<HTMLDivElement>
}

const PresentationComponent: React.FC<PresentationComponentProps> = ({data, deckDivRef}) => (
  <div className='reveal' ref={deckDivRef}>
    <div className='slides'>
      <section>
        <div className='textr text-center'>
          <h4>
            O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi Muhammad al-Xorazmiy nomidagi
            Toshkent axborot texnologiyalari universiteti
          </h4>
          <p className='text-xl md:text-3xl mt-10'>{data?.name}</p>
        </div>
        <div className='text-right mt-4 md:mt-8'>
          <p>
            x<span>Gurux:</span> 124
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
      {data?.plans?.map((plan: Plan, index: number) => (
        <section key={index} data-background-color='#0c1821'>
          <h3 className='text-xl md:text-2xl mt-2'>{plan.name}</h3>
          <div className='flex justify-between'>
            {plan.description?.map((desc: Description, descIndex: number) => (
              <ul key={descIndex} className='mt-4 flex w-[50%]'>
                {desc.content?.map((content: Content, contentIndex: number) => (
                  <li key={contentIndex} className='mt-2 fragment flex'>
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

interface InfoComponentProps {
  data: PresentationData | null
}

const InfoComponent: React.FC<InfoComponentProps> = ({data}) => (
  <div className='info-content'>
    <h2 className='text-2xl font-bold mb-4'>{data?.name}</h2>
    <p className='mb-4'>{data?.description}</p>
    <div className='flex justify-between items-center'>
      <div>
        <span className='mr-2'>👍 {data?.likes || 0}</span>
        <span>👎 {data?.dislikes || 0}</span>
      </div>
      <div>
        <span>👁️ {data?.views || 0} views</span>
      </div>
    </div>
  </div>
)

const DetailMore: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<PresentationData | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const deckDivRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<Reveal.Api | null>(null)

  const fetchData = async (id: string): Promise<void> => {
    try {
      const response = await mainApiInstance.get(`/prezentations/${id}`)
      const fetchedData: PresentationData = response.data.data
      setData(fetchedData)
    } catch (err) {
      setError(err as Error)
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id)
    }
  }, [id])

  useLayoutEffect(() => {
    if (!data || deckRef.current) return

    const initReveal = () => {
      if (deckDivRef.current) {
        deckRef.current = new Reveal(deckDivRef.current, {
          view: 'scroll',
          transition: 'slide',
          center: true,
          plugins: [RevealZoom, RevealNotes],
          width: '100%',
          height: '100%',
        })

        deckRef.current.initialize().then(() => {
          window.dispatchEvent(new Event('resize'))
        })
      }
    }

    initReveal()

    return () => {
      if (deckRef.current) {
        deckRef.current.destroy()
        deckRef.current = null
      }
    }
  }, [data])

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className='detail-more-container'>
      <div className='presentation-container'>
        <PresentationComponent data={data} deckDivRef={deckDivRef} />
      </div>
      <div className='info-container'>
        <InfoComponent data={data} />
      </div>
    </div>
  )
}

export default DetailMore
