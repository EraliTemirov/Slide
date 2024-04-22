// import React, { useEffect } from "react";
// import ListsSurah from "../components/surah/ListsSurah";
// import Header from "../components/Header";
// import mainApiInstance from "../components/mainApiInstance";

// const HomePage: React.FC = () => {
//   async function fetchData() {
//     try {
//       const res = await mainApiInstance.get("/auth/me");
//       if (res.status === 200) {
//         console.log(res);
//         localStorage.setItem("token", res.data.token);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   useEffect(() => {
//     fetchData();
//   }, []); 

//   return (
//     <>
//       <Header />
//       <ListsSurah />
//     </>
//   );
// };

// export default HomePage;


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
        console.log(res);
        setUserData(res.data); // Ma'lumotlarni tilovga saqlash
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
      <Header userData={userData} /> {/* userData ni Header komponentiga uzatish */}
      <ListsSurah />
    </>
  );
};

export default HomePage;