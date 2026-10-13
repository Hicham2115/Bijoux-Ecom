import { Hero } from "@/components/hero";
import { FeaturedJewelrySection } from "@/components/featured-jewelry-section";
import { MenCampaignSection } from "@/components/men-campaign-section";
import { WomenCampaignSection } from "@/components/women-campaign-section";
import { MaisonSection } from "@/components/maison-section";
import { Header } from "@/layout/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080907] text-white">
      <Header />
      <Hero />
      <FeaturedJewelrySection />
      <MenCampaignSection />
      <WomenCampaignSection />
      <MaisonSection />
    </main>
  );
}
