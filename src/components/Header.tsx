import React, {  useState } from "react";
import Search from "./Search";

interface HeaderProps {
  userData: any;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { userData } = props;
//  console.log(userData);
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
     <nav className="bg-[white] sticky z-20 top-0">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <a href='#' className='flex items-center'>
              
              <span className='self-center text-2xl font-semibold whitespace-nowrapsm-max:text-md'>
                MagicSlide
              </span>
            </a>
          </div>
          <div className='flex '>
            <button
              onClick={toggleNavbar}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-300 focus:outline-none focus:bg-blue-300 focus:text-white'
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
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={` ${isOpen ? 'block' : 'hidden'}`}>
       <ul className="pt-1 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'">
        <li>Balance: {userData?.data.balance}</li>
        <li>Name: {userData?.data.name}</li>
        <button className="p-1 ">Log out</button>
       </ul>
      </div>
    </nav>
      <div className="w-full p-2 md:p-5 bg-[#767f56] grid justify-items-center shadow-[0_1px_0px_rgba(17,17,26,0.1)]">
        <div className="w-1/3 lg:w-1/5 drop-shadow-lg"></div>
        <Search />
      </div>
    </>
  );
};

export default Header;