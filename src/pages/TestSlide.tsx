import { useEffect, useRef } from "react";
// import { RevealSlides } from "react-reveal-slides";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";

function App() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
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
  }, []);

  return (
    // Your presentation is sized based on the width and height of
    // our parent element. Make sure the parent is not 0-height.
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        {/* <RevealSlides
          controls={false}
          plugins={[RevealZoom, RevealNotes]}
          onStateChange={(state) => console.log(state)}
        > */}
        <section key="0" data-background-color="#0c1821">
          <section key="0-0">
            <h2>react-reveal-slides</h2>
            <p>Create dynamic Reveal.js slides</p>
          </section>
          <section key="0-1">
            <ul>
              <li className="fragment">
                Easily make presentation content dynamic
              </li>
              <li className="fragment">
                Easily add presentations to React apps
              </li>
              <li className="fragment">
                Embed React components inside presentations
              </li>
            </ul>
          </section>
        </section>
        <section key="1" data-background-color="#bf4f41">
          <section key="1-0">
            <h2>Free reign over your presentation</h2>
            <p>
              This package makes no efforts to impead or restrict what you can
              do.
            </p>
          </section>
          <section key="1-1">
            <p>
              Since React creates HTML DOM elements out of JSX, there should be
              no reason we cant just put JSX inside of our RevealSlides
              component instead of the HTML markup Reveal.js normally expects.
            </p>
          </section>
          <section key="1-2">
            <p>
              Simply put, React already takes care of converting JSX into
              something Reveal.js can work with.
            </p>
            <aside className="notes">
              Shhh, these are your private notes 📝
            </aside>
          </section>
        </section>
        {/* </RevealSlides> */}
      </div>
    </div>
  );
}

export default App;
