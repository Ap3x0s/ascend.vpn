import ParticleBackground from "@/components/effects/ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingPreview />
      </main>
      <Footer />
    </>
  );
}
