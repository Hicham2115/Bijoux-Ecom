import { Suspense } from "react";
import { connection } from "next/server";
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
import { ReviewsSection } from "@/components/reviews-section";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getShopifyProducts, type ShopifyProduct } from "@/lib/shopify";

async function FeaturedProducts() {
  await connection();
  let products: ShopifyProduct[] = [];
  let catalogError = false;
  try {
    products = await getShopifyProducts();
  } catch {
    catalogError = true;
  }

  return (
    <FeaturedJewelrySection products={products} catalogError={catalogError} />
  );
}

export default function Home() {
  return (
    <>
      <div id="top">
        <Header />
      </div>
      <main className="min-h-screen bg-[#080907] text-white">
        <ScrollReveal />
        <Hero />
        <Suspense
          fallback={
            <section
              id="collection"
              aria-label="Sélection de bijoux"
              className="min-h-[280px] bg-[#f5f1e9]"
            />
          }
        >
          <FeaturedProducts />
        </Suspense>
        <MenCampaignSection />
        <WomenCampaignSection />
        <CategorySection />
        <MaisonSection />
        <MaisonServicesSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
        <ClosingCtaSection />
      </main>
      <Footer />
    </>
  );
}
