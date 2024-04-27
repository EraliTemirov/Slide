import React, {  useState } from "react";
import  mainApiInstance from "./mainApiInstance";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userData: any;
}

const Header: React.FC<HeaderProps> = (props) => {

  const navigate= useNavigate();
  const { userData } = props;
 console.log(userData , "kerak");
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }



  async function handleLogout() {
    try {
      const res = await mainApiInstance.get("/auth/logout");
      if (res.status === 200) {
        // console.log(res)
        alert(res?.data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     <nav className="bg-[white] sticky z-20 top-0">
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
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

      <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {userData === null ? (
  <ul className="pt-1 bg-[#f7f4f4] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <li className="w-full text-left p-1 hover:bg-gray-200">
      <a href="https://t.me/cucucucucvot_bot" className="block">Log in</a> </li>
    </ul>
) : (
    <ul className="pt-1 bg-[#f7f4f4] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <li className="w-full text-left p-1 hover:bg-gray-200">Balance: {userData?.data.balance}</li>
      <li className="w-full text-left p-1 hover:bg-gray-200">Name: {userData?.data.name}</li>
      <button onClick={handleLogout} className="w-full text-left p-1 hover:bg-gray-200 active:bg-gray-300">Log out</button>
    </ul>
)}   
</div>
    </nav>
    </>
  );
};

export default Header;