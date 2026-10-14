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
  title: "Fine Jewelry | Orélia",
  description: "Explore thoughtful gold jewelry from the Orélia collection, made to become part of your story.",
};

async function ProductCollection() {
  await connection();
  let products: ShopifyProduct[] = [];
  let catalogError: string | null = null;

  try {
    products = await getShopifyProducts();
  } catch {
    catalogError = "We couldn’t load the collection. Please check the Shopify connection and try again.";
  }

  return <>
    <ScrollReveal />
    <ProductsPage products={products} catalogError={catalogError} />
  </>;
}

export default function ProductsRoute() {
  return (
    <>
      <div id="top"><Header /></div>
      <Suspense fallback={<main className="min-h-[70vh] bg-[#f5f1e9]" aria-label="Loading jewelry collection" />}>
        <ProductCollection />
      </Suspense>
      <Footer />
    </>
  );
}
