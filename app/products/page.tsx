import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";

export const metadata: Metadata = {
  title: "Fine Jewelry | Orélia",
  description: "Explore thoughtful gold jewelry from the Orélia collection, made to become part of your story.",
};

export default function ProductsRoute() {
  return (
    <>
      <div id="top"><Header /></div>
      <ScrollReveal />
      <ProductsPage />
      <Footer />
    </>
  );
}
