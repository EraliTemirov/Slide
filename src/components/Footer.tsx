// import React from "react";
import {BiChevronUp} from 'react-icons/bi'
// import { SearchResult } from "./SearchResult";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const Footer = ({results}: {results: any}): JSX.Element => {
  console.log(results, 'footer')
  return (
    <footer className={`w-full bottom-0 pt-2  ${results === 200 ? '' : 'mt-[41vh] '}`}>
      <div className=' bg-white p-7 border shadow-md md:mt-14 flex justify-between items-center'>
        <h1 className='font-semibold text-[18px] text-slate-600'>Magic App</h1>
        <button
          onClick={scrollToTop}
          className='text-[40] rounded-full p-1.5 shadow-lg hover:bg-slate-100 hover:shadow-inner'
        >
          <BiChevronUp size={25} />
        </button>
      </div>
      <div className='sm:block hidden px-4 py-3 bg-[#7C4D9B]'>
        <span className='text-sm text-slate-300 flex text-center font-semibold items-center justify-center'>
          © 2024 <a href='#'>Magic App</a>.Temirov
        </span>
      </div>
    </footer>
  )
}

export default Footer
