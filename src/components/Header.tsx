import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import mainApiInstance from './mainApiInstance'

// Types
interface UserData {
  id: number
  name: string
  account: {
    age: number
    balance: number
  }
}

interface ApiResponse<T> {
  data: T
}

// Components
const NavItem: React.FC<{text: string}> = ({text}) => (
  <li className='hover:text-yellow-300 cursor-pointer'>{text}</li>
)

const LoginButton: React.FC = () => (
  <a
    href='https://t.me/cucucucucvot_bot'
    target='_blank'
    rel='noopener noreferrer'
    className='text-white hover:text-yellow-300'
  >
    Log in
  </a>
)

const UserMenu: React.FC<{userData: UserData; onLogout: () => void}> = ({userData, onLogout}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center focus:outline-none'>
        <p className='w-8 h-8 rounded-full'> User</p>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1'>
          <p className='px-4 py-2 text-sm text-gray-700'>ID: {userData.id}</p>
          <p className='px-4 py-2 text-sm text-gray-700'>Name: {userData.name}</p>
          <p className='px-4 py-2 text-sm text-gray-700'>Age: {userData.account.age}</p>
          <p className='px-4 py-2 text-sm text-gray-700'>Balance: {userData.account.balance}</p>
          <button
            onClick={onLogout}
            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

const MobileMenuButton: React.FC<{isOpen: boolean; onClick: () => void}> = ({isOpen, onClick}) => (
  <button
    onClick={onClick}
    className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-300 focus:outline-none focus:bg-blue-300 focus:text-white'
  >
    <svg
      className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 6h16M4 12h16M4 18h16'
      />
    </svg>
    <svg
      className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
    </svg>
  </button>
)

// Main Component
const Header: React.FC = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await mainApiInstance.get<ApiResponse<UserData>>('/api/user')
        setUserData(response.data.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await mainApiInstance.get<{message: string}>('/auth/logout')
      if (response.status === 200) {
        alert(response.data.message)
        setUserData(null)
        navigate('/')
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const navItems = ['Create', 'Explore', 'Learn', 'Education', 'AI', 'More']

  return (
    <nav className='bg-[#7C4D9B] sticky z-20 top-0'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <a href='#' className='flex items-center'>
              <span className='self-center text-2xl font-semibold text-white'>Magicslide</span>
            </a>
          </div>
          <div className='hidden md:flex items-center'>
            <ul className='flex space-x-4 text-white'>
              {navItems.map((item, index) => (
                <NavItem key={index} text={item} />
              ))}
            </ul>
            <div className='flex items-center ml-4'>
              {userData === null ? (
                <LoginButton />
              ) : (
                <UserMenu userData={userData} onLogout={handleLogout} />
              )}
            </div>
          </div>
          <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#f7f4f4] transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className='flex justify-end p-4'>
          <button
            onClick={toggleMobileMenu}
            className='text-gray-400 hover:text-gray-600 focus:outline-none'
          >
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='px-4'>
          <ul className='pt-1'>
            {userData === null ? (
              <li className='w-full text-left p-1 hover:bg-gray-200'>
                <LoginButton />
              </li>
            ) : (
              <>
                <li className='w-full text-left p-1 hover:bg-gray-200'>ID: {userData.id}</li>
                <li className='w-full text-left p-1 hover:bg-gray-200'>Name: {userData.name}</li>
                <li className='w-full text-left p-1 hover:bg-gray-200'>
                  Age: {userData.account.age}
                </li>
                <li className='w-full text-left p-1 hover:bg-gray-200'>
                  Balance: {userData.account.balance}
                </li>
              </>
            )}
            {navItems.map((item, index) => (
              <li key={index} className='w-full text-left p-1 hover:bg-gray-200 cursor-pointer'>
                {item}
              </li>
            ))}
            {userData !== null && (
              <button
                onClick={handleLogout}
                className='w-full text-left p-1 hover:bg-gray-200 active:bg-gray-300'
              >
                Log out
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
