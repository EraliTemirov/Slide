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
      <div className='w-[90%] m-auto p-2 md:p-5 grid justify-items-center shadow-[0_1px_0px_rgba(255,255,255,0.1)]'>
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
      <Footer results={undefined} />
    </>
  )
}

export default HomePage
