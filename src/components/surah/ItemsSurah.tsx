import React from "react";
import { Link } from "react-router-dom";

interface SurahType {
  nomor: number;
  namaLatin: string;
  nama: string;
  arti: string;
  tempatTurun: string;
  jumlahAyat: number;
  surahs: any;
}

const ItemsSurah: React.FC<SurahType> = ({
  nomor,
  // namaLatin,
  // nama,
  // arti,
  // tempatTurun,
  // jumlahAyat,
  surahs,
}) => {
  return (
    <>
      {surahs.length > 0 ? (
        <div className="w-full md:px-5 mt-2 sm:py-2 md:w-1/2 xl:w-1/3 rounded-2xl">
          <Link
            to={`/surat/${nomor}`}
            className="flex items-center content-center px-4 py-6 shadow-sm rounded-lg bg-white hover:shadow-[0_20px_20px_-20px_rgba(68,68,68,0.50)] hover:-translate-y-1 hover:duration-[300ms] hover:cursor-pointer"
          >
            <div className="w-9 sm:w-12 rounded-full bg-opacity-75 grid place-items-center">
              <h3 className="col-start-1 row-start-1 text-[11px] md:text-sm font-bold text-slate-500">
                {nomor}
              </h3>
              
            </div>
          </Link>
        </div>
      ) : (
        <p>No matching surah found.</p>
      )}
    </>
  );
};

export default ItemsSurah;
