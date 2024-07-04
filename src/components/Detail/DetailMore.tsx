import React, {useEffect, useRef, useState} from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import mainApiInstance from '../mainApiInstance'
import {useParams} from 'react-router-dom'

const DetailMore: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

  const deckDivRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<Reveal.Api | null>(null)

  const fetchData = async (id: string): Promise<void> => {
    try {
      const response = await mainApiInstance.get(`/prezentations/${id}`)
      const data = response.data.data
      setData(data)
      console.log(data)
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

  useEffect(() => {
    if (data && deckDivRef.current) {
      deckRef.current = new Reveal(deckDivRef.current, {
        view: 'scroll',
        scrollProgress: true,
        scrollLayout: 'full',
      })
      deckRef.current.initialize({})
    }
    if (!deckDivRef.current) return
    deckRef.current = new Reveal(deckDivRef.current, {
      view: 'scroll',
      scrollProgress: true,
      scrollLayout: 'full',
    })
    deckRef.current.initialize({}).then(() => {})
    return () => {
      if (deckRef.current) {
        deckRef.current.destroy()
        deckRef.current = null
      }
    }
  }, [data])

  // useEffect(() => {}, [data])

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className='reveal' ref={deckDivRef}>
      <div className='slides'>
        <section>
          <div className='textr text-center'>
            <h2>
              O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi Muhammad al-Xorazmiy
              nomidagi Toshkent axborot texnologiyalari universiteti
            </h2>
            <p className='text-xl md:text-3xl mt-10'>{data.name}</p>
          </div>
          <div className='text-right mt-4 md:mt-8'>
            <p>
              <span>Gurux:</span> 124
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
        {data.plans?.map((plan: any, index: number) => (
          <section key={index}>
            <h3 className='text-xl md:text-2xl'>{index}</h3>
            {/* {plan.description?.map((desc: any, descIndex: number) => (
              <section key={descIndex} className='mt-4'>
                <h4 className='text-lg md:text-xl'>{desc.name}</h4>
                {desc.content?.map((content: any, contentIndex: number) => (
                  <div key={contentIndex} className='mt-2'>
                    <h5 className='text-base md:text-lg'>{content.title}</h5>
                    <p className='text-sm md:text-base'>{content.uzContent}</p>
                  </div>
                ))}
              </section>
            ))} */}
          </section>
        ))}
      </div>
    </div>
  )
}

export default DetailMore
