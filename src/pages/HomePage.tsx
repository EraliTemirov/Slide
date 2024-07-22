import React, {useEffect, useState, useCallback} from 'react'
import Header from '../components/Header'
import mainApiInstance from '../components/mainApiInstance'
import {SearchBar} from '../components/SearchBar'
import {SearchResultsList} from '../components/SearchResultsList'
import Footer from '../components/Footer'

const HomePage: React.FC = () => {
  const [results, setResults] = useState<any[]>([])
  const [userData, setUserData] = useState<any>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await mainApiInstance.get('/auth/me')
      if (res.status === 200) {
        setUserData(res.data)
        localStorage.setItem('token', res.data.token)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Header userData={userData} />
      <div className='container mx-auto p-4 md:p-8'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto'>
          <SearchBar setResults={setResults} />
        </div>
        <div className='mt-6'>
          <SearchResultsList results={results} />
        </div>
      </div>
      <Footer results={undefined} />
    </>
  )
}

export default HomePage
