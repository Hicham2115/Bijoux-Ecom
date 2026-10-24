import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsPage } from "@/components/products-page";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { localProducts } from "@/lib/local-products";

export const metadata: Metadata = {
  title: "Joaillerie | Orélia",
  description:
    "Découvrez les bijoux en or de la collection Orélia, pensés pour faire partie de votre histoire.",
};

async function ProductCollection() {
  return (
    <>
      <ScrollReveal />
      <ProductsPage products={localProducts} catalogError={null} />
    </>
  );
}

export default function ProductsRoute() {
  return (
    <>
      <div id="top">
        <Header />
      </div>
      <Suspense
        fallback={
          <main
            className="min-h-[70vh] bg-[#f5f1e9]"
            aria-label="Chargement de la collection de bijoux"
          />
        }
      >
        <ProductCollection />
      </Suspense>
      <Footer />
    </>
  );
}
