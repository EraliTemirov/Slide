import React, { useEffect, useState } from "react";
import ListsSurah from "../components/surah/ListsSurah";
import Header from "../components/Header";
import mainApiInstance from "../components/mainApiInstance";

const HomePage: React.FC = () => {
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
      <ListsSurah />
    </>
  );
};

export default HomePage;