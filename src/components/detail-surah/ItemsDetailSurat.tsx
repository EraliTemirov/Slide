import React, { useState } from "react";
import { SurahDetail } from "../../store/quran-context";
import HeaderDetail from "../HeaderDetail";
import AudioPlayer from "../AudioPlayer";
import Footer from "../Footer";
import Navbar from "../Navbar";
interface SurahDetailProps {
  surahDetail: SurahDetail | null;
}

const ItemsDetailSurat: React.FC<SurahDetailProps> = ({ surahDetail }) => {
  const [showAudio, setShowAudio] = useState(false);
  return (
    <>
    <Navbar/>
      {surahDetail && (
        <div className="flex flex-col justify-center items-center ">
          
          <HeaderDetail onShow={() => setShowAudio(!showAudio)} />
          {surahDetail.ayat?.map(
            ({ nomorAyat }: any) => {
              return (
                <div className="py-2 w-11/12 sm:w-3/4" key={nomorAyat}>
                  <div className="bg-white p-7 shadow-sm rounded-md border ">
                    
                    <div className="my-4 text-[14px] sm:text-[16px] font-semibold text-slate-600 divide-black">
                      <p>
                        {nomorAyat}
                        
                      </p>
                    </div>
                   
                  </div>
                </div>
              );
            }
          )}
          {showAudio && (
            <AudioPlayer audioSrc={surahDetail.audioFull?.["01"]} />
          )}
        </div>
      )}
      <Footer className={"sticky sm:static"} />
    </>
  );
};

export default ItemsDetailSurat;
