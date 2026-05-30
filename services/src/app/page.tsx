import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <Products />
      <HowItWorks />
      <Trust />
      <CTASection />
    </main>
  );
}
