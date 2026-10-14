import type { Metadata } from "next";
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

export default async function ProductsRoute() {
  let products: ShopifyProduct[] = [];
  let catalogError: string | null = null;

  try {
    products = await getShopifyProducts();
  } catch {
    catalogError = "We couldn’t load the collection. Please check the Shopify connection and try again.";
  }

  return (
    <>
      <div id="top"><Header /></div>
      <ScrollReveal />
      <ProductsPage products={products} catalogError={catalogError} />
      <Footer />
    </>
  );
}
