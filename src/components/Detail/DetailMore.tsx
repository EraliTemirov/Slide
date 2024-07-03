import React, {useEffect, useState} from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import mainApiInstance from '../mainApiInstance'
import {useParams} from 'react-router-dom'
import IMG from '../../assets/react.svg'

const DetailMore: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

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
    if (data) {
      Reveal.initialize()
    }
  }, [data])

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className='reveal large-display-only'>
      <div className='slides'>
        <section className='p-4 md:p-8'>
          <div className='textr text-center'>
            <h2 className='text-2xl md:text-4xl mt-4'>
              O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi Muhammad al-Xorazmiy
              nomidagi Toshkent axborot texnologiyalari universiteti
            </h2>
            <img src={IMG} alt='img' className='w-1/2 md:w-1/3 lg:w-1/4 mx-auto mt-8' />
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
          <section key={index} className='p-4 md:p-8'>
            <h3 className='text-xl md:text-2xl'>{plan.name}</h3>
            {plan.description?.map((desc: any, descIndex: number) => (
              <section key={descIndex} className='mt-4'>
                <h4 className='text-lg md:text-xl'>{desc.name}</h4>
                {desc.content?.map((content: any, contentIndex: number) => (
                  <section key={contentIndex} className='mt-2'>
                    <h5 className='text-base md:text-lg'>{content.title}</h5>
                    <p className='text-sm md:text-base'>{content.uzContent}</p>
                  </section>
                ))}
              </section>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

export default DetailMore
