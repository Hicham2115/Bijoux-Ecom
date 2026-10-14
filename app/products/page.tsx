import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ProductsPage } from "@/components/products-page";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { getShopifyProducts } from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Joaillerie | Orélia",
  description:
    "Découvrez les bijoux en or de la collection Orélia, pensés pour faire partie de votre histoire.",
};

async function ProductCollection() {
  await connection();
  let products: ShopifyProduct[] = [];
  let catalogError: string | null = null;

  try {
    products = await getShopifyProducts();
  } catch {
    catalogError =
      "Impossible de charger la collection. Vérifiez la connexion à Shopify et réessayez.";
  }

  return (
    <>
      <ScrollReveal />
      <ProductsPage products={products} catalogError={catalogError} />
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
