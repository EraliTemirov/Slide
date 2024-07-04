import React, { useEffect, useRef, useState } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import mainApiInstance from "../mainApiInstance";
import { useParams } from "react-router-dom";
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";
const DetailMore: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  const fetchData = async (id: string): Promise<void> => {
    try {
      const response = await mainApiInstance.get(`/prezentations/${id}`);
      const data = response.data.data;
      setData(data);
      console.log(data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      view: "scroll",
      transition: "slide",
      center: true,

      // Force the scrollbar to remain visible
      // scrollProgress: true,
      plugins: [RevealZoom, RevealNotes],
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    };
  }, [data]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="reveal" ref={deckDivRef}>
        <div className="slides">
          <section>Loading</section>
        </div>
      </div>
    );
  }
  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        <section>
          <div className="textr text-center">
            <h4>
              O'zbekiston Respublikasi Raqamli texnologiyalari vazirligi
              Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari
              universiteti
            </h4>
            <p className="text-xl md:text-3xl mt-10">{data?.name}</p>
          </div>
          <div className="text-right mt-4 md:mt-8">
            <p>
              <span>Gurux:</span> 124
            </p>
            <p>
              <span>Bajardi:</span> Kimdir
            </p>
            <p>
              <span>Tekshirdi:</span> Boshqasi
            </p>
          </div>
          <p className="text-center text-lg md:text-2xl mt-10">2024-yil</p>
        </section>
        {data?.plans?.map((plan: any, index: number) => (
          <section key={index}>
            <h3 className="text-xl md:text-2xl">{plan.name}</h3>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DetailMore;
