import React, {useCallback, useEffect, useState} from 'react'
import mainApiInstance from './mainApiInstance'

export const SearchBar = ({setResults}: {setResults: (results: any[]) => void}): JSX.Element => {
  const [input, setInput] = useState<string>('')

  const fetchData = useCallback(async (value: string, page: number = 1): Promise<void> => {
    try {
      const response = await mainApiInstance.get(
        `/prezentations/search?page=${page}&limit=15&search=${value}`
      )
      const data = response.data.data
      console.log(data, 'Erali', value)

      const results = data
        .map((item: any) => {
          if (
            value &&
            item &&
            item.name &&
            (value == 'new' ? true : item.name.toLowerCase().includes(value))
          ) {
            return {
              ...item,
              lang: item?.lang || 'uz',
            }
          }
        })
        .filter((items: any) => items)

      console.log(results, 'azizjon', value)
      setResults(results)
    } catch (error) {
      console.error(error)
    }
  })

  const handleChange = (value: string): void => {
    setInput(value)
    fetchData(value)
  }

  useEffect(() => {
    fetchData('new')
  }, [fetchData])

  return (
    <div className='input-wrapper'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className='flex items-center'
      >
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 feather feather-search text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' x2='16.65' y1='21' y2='16.65' />
            </svg>
          </div>
          <input
            type='text'
            id='voice-search'
            className=' border-slate-400 text-[10px] sm:text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 sm:px-10 sm:p-4 bg-[#f4f4f4] placeholder-gray-400 text-slate-500 font-medium'
            placeholder='Search presintation....'
            required
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}
