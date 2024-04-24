// import React from "react";
import IMG from "../assets/frame.png";
export const SearchResult = ({ result }: { result: any }): JSX.Element => {
  return (
   <div className=" border rounded-lg  w-[23%]  p-4">
   <div className=" w-full rounded-sm" >
    <img src={IMG} alt="img" /></div>
     <div>
      <h4><span className="text-xl">Name:</span> {result?.name.slice(0, 20) }</h4>
      <p><span className="text-xl">Page count:</span> {result?.pagesCount}</p>
      <p><span className="text-xl">Til:</span>{result?.lang}</p>
      </div>
    </div>
  );
};