import Navbar from "../components/Navbar";
import {
  Hero,
  About,
  Projects,
  Experience,
  Contact,
} from "../components/sections";

export default function Home() {
  return (
    <main className="bg-background text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
