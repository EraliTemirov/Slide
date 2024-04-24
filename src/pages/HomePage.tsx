import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import mainApiInstance from "../components/mainApiInstance";
import { SearchBar } from "../components/SearchBar";
import { SearchResultsList } from "../components/SearchResultsList";


const HomePage: React.FC = () => {
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState<any>(null);


  async function fetchData() {
    try {
      const res = await mainApiInstance.get("/auth/me");
      if (res.status === 200) {
        // console.log(res);
        setUserData(res.data); 
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header userData={userData} />
      <div className="w-full p-2 md:p-5 grid justify-items-center shadow-[0_1px_0px_rgba(48, 48, 73, 0.1)]">
        <SearchBar setResults={setResults}  />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    
    </>
  );
};

export default HomePage;