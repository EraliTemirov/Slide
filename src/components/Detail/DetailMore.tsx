import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import {useEffect, useState} from 'react'
import mainApiInstance from '../mainApiInstance'
import {useParams} from 'react-router-dom'
import IMG from '../../assets/react.svg'

const DetailMore: React.FC = () => {
  const {id} = useParams()
  console.log('salom', id)

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async (id: string): Promise<void> => {
    try {
      const response = await mainApiInstance.get(`/prezentations/${id}`)
      const data = response.data.data
      setData(data)
      console.log(data)
    } catch (error) {
      setError(error as Error)
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id)
    }
  }, [id])

  console.log(data, 'supermen')

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='w-[1024px] m-auto'>
        <div className='textr'>
          <h2 className='text-center text-4xl mt-4'>
            O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi Muhammad al-Xorazmiy nomidagi
            Toshkent axborot texnologiyalari universiteti
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
        {data.name && <p>{data.name}</p>}
        {data.plans?.[1]?.name && <p>{data.plans[1].name}</p>}
      </div>
      {data.plans?.[1]?.description?.[0]?.name && <div>{data.plans[1].description[0].name}</div>}
      {data.plans?.[1]?.description?.[0]?.content?.[1]?.title && (
        <p>{data.plans[1].description[0].content[1].title}</p>
      )}
      <hr />
      {data.plans?.[1]?.description?.[0]?.content?.[1]?.uzContent && (
        <p>{data.plans[1].description[0].content[1].uzContent}</p>
      )}
    </div>
  )
}

export default DetailMore
