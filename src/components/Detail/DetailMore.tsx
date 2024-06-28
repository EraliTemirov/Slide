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
    <div className='reveal'>
      <div className='slides'>
        <section>
          <div className='textr'>
            <h2 className='text-center text-4xl mt-4'>
              O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi Muhammad al-Xorazmiy
              nomidagi Toshkent axborot texnologiyalari universiteti
            </h2>
            <img src={IMG} alt='img' className='w-[30%] mx-auto mt-8' />
            <p className='text-center text-3xl mt-10'>{data.name}</p>
          </div>
          <div className='text-right'>
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
          <p className='text-center text-2xl mt-10'>2024-yil</p>
        </section>
        {data.plans?.map((plan: any, index: number) => (
          <section key={index}>
            <h3>{plan.name}</h3>
            {plan.description?.map((desc: any, descIndex: number) => (
              <section key={descIndex}>
                <h4>{desc.name}</h4>
                {desc.content?.map((content: any, contentIndex: number) => (
                  <section key={contentIndex}>
                    <h5>{content.title}</h5>
                    <p>{content.uzContent}</p>
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
