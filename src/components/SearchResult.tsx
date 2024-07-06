import {useEffect, useState, useCallback} from 'react'
import {Link} from 'react-router-dom'
import mainApiInstance from './mainApiInstance'
import PlaceholderCards from './PlaseholderCards'

interface SearchResultProps {
  result: {
    id: number
    name: string
    pagesCount: number
    lang: string
    image?: string
  }
}

export const SearchResult = ({result}: SearchResultProps): JSX.Element | null => {
  const [fetchedData, setFetchedData] = useState<{image?: string} | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async (id: number) => {
    try {
      setLoading(true)
      const response = await mainApiInstance.get(`/images/${id}`)
      const data = response.data.data
      setFetchedData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (result?.id) {
      fetchData(result.id)
    }
  }, [result.id, fetchData])

  if (!result || !result.id) {
    return null
  }

  return (
    <div className='search-result-link border border-x-2 rounded-lg w-[350px] shadow-lg transition-all duration-400 hover:scale-105 hover:shadow-2xl bg-white'>
      <Link to={`/prezentations/${result.id}`} className='h-full'>
        {loading ? (
          <PlaceholderCards />
        ) : (
          <div className='image-container w-full rounded-t-lg overflow-hidden'>
            <img
              src={fetchedData?.image}
              alt='Presentation'
              className='w-full h-[220px] object-cover'
            />
          </div>
        )}
        <div className='info p-4'>
          <h4 className='text-lg font-semibold mb-2'>
            <span className='font-bold'>Name:</span>{' '}
            {result.name.length > 30 ? `${result.name.slice(0, 30)}...` : result.name}
          </h4>
          <p className='text-sm mb-1'>
            <span className='font-bold'>Page count:</span> {result.pagesCount}
          </p>
          <p className='text-sm'>
            <span className='font-bold'>Language:</span> {result.lang}
          </p>
        </div>
      </Link>
    </div>
  )
}
