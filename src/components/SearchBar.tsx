import React, { useState } from "react";
import mainApiInstance from "./mainApiInstance";

export const SearchBar = ({ setResults }: { setResults: (results: any[]) => void }): JSX.Element => {
  const [input, setInput] = useState<string>("");

  const fetchData = async (value: string): Promise<void> => {
    try {
      const response = await mainApiInstance.get(
        `/prezentations/search?page=${1}&limit=10&search=new`
      );
      const json = response.data;
    //   console.log(response);
      const results = json.filter((user: any) => {
        return (
          value &&
          user &&
          user.name &&
          user.name.toLowerCase().includes(value)
        );
      });
      setResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value: string): void => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
       <form className="flex items-center">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 feather feather-search text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className=" border-slate-400 text-[10px] sm:text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 sm:px-10 sm:p-4 bg-[#f4f4f4] placeholder-gray-400 text-slate-500 font-medium"
            placeholder="Search presintation...."
            required
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value)
              }
          />
        </div>
      </form>
    </div>
  );
};