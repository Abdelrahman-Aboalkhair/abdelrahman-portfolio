"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Hero,
  About,
  Projects,
  Services,
  Contact,
} from "../components/sections";
import { DevModeProvider } from "../contexts/DevModeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <DevModeProvider>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </DevModeProvider>
    </LanguageProvider>
  );
}
