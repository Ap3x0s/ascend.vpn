import ParticleBackground from "@/components/effects/ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
