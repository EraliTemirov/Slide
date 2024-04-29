import {useEffect, useState} from 'react'
import mainApiInstance from '../mainApiInstance'
import {useParams} from 'react-router-dom'
import IMG from '../../assets/react.svg'

export default function DetailMore() {
  const {id} = useParams()
  console.log('salom', id)

  const [data, setData] = useState()

  const fetchData = async (id: string): Promise<void> => {
    try {
      const response = await mainApiInstance.get(`/prezentations/${id}`)
      const data = response.data.data
      setData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData(String(id))
  }, [id])

  console.log(data, 'supermen')
  return (
    <div>
      <div className='w-[90%] m-auto'>
        <div className='textr'>
          <h2 className='text-center text-4xl mt-4'>
            O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi Muhammad al-Xorazmiy nomidagi
            Toshkent axborot texnologiyalari universiteti
          </h2>

          <img src={IMG} alt='img' className='w-[30%]  m-auto ' />
          <p className='text-center text-3xl mt-3'>{data?.name}</p>
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
        {data?.name}
        {data?.plans[1].name}
      </div>
      <div>{data?.plans[1].description[0].name}</div>
      {data?.plans[1].description[0].content[1].title}
      <hr />
      {data?.plans[1].description[0].content[1].uzContent}
    </div>
  )
}
