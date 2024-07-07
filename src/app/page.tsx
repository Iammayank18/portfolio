import Footer from "@/components/footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/hero/Hero";
import Experience from "@/components/sections/Experiences";
import Projects from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}
