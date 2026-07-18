import ParticleBackground from "@/components/effects/ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Platforms } from "@/components/landing/Platforms";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Platforms />
        <PricingPreview />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
