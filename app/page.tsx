import { Hero } from "@/components/hero";
import { CategorySection } from "@/components/category-section";
import { FeaturedJewelrySection } from "@/components/featured-jewelry-section";
import { MenCampaignSection } from "@/components/men-campaign-section";
import { WomenCampaignSection } from "@/components/women-campaign-section";
import { MaisonSection } from "@/components/maison-section";
import { MaisonServicesSection } from "@/components/maison-services-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { ClosingCtaSection } from "@/components/closing-cta-section";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <div id="top">
        <Header />
      </div>
      <main className="min-h-screen bg-[#080907] text-white">
        <ScrollReveal />
        <Hero />
        <CategorySection />
        <MenCampaignSection />
        <WomenCampaignSection />
        <FeaturedJewelrySection />
        <MaisonSection />
        <MaisonServicesSection />
        <FaqSection />
        <ContactSection />
        <ClosingCtaSection />
      </main>
      <Footer />
    </>
  );
}
