import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { WorldCanvas } from "./components/WorldCanvas";
import { Cursor } from "./components/Cursor";
import { Loader } from "./components/Loader";
import { HUD } from "./components/HUD";
import { NavBar } from "./components/NavBar";
import { Hero } from "./sections/Hero";
import { BaseCamp } from "./sections/BaseCamp";
import { Expeditions } from "./sections/Expeditions";
import { Inventory } from "./sections/Inventory";
import { Crafted } from "./sections/Crafted";
import { FieldNotes } from "./sections/FieldNotes";
import { Signal } from "./sections/Signal";
import { Footer } from "./sections/Footer";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  const [booting, setBooting] = useState(true);
  useSmoothScroll();

  return (
    <>
      <WorldCanvas />
      <Cursor />
      <div className="grain" aria-hidden />

      <AnimatePresence>
        {booting && <Loader key="loader" onDone={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <>
          <NavBar />
          <HUD />
          <main className="content-layer">
            <Hero />
            <BaseCamp />
            <Expeditions />
            <Inventory />
            <Crafted />
            <FieldNotes />
            <Signal />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
