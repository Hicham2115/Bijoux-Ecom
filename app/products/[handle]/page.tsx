import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { ShopifyProductPage } from "@/components/shopify-product-page";
import { getShopifyProduct, getShopifyProducts, type ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Fine Jewelry | Orélia",
  description: "Discover fine jewelry from the Orélia collection.",
};

async function ProductDetails({ params }: { params: PageProps<"/products/[handle]">["params"] }) {
  const { handle } = await params;
  await connection();
  const product = await getShopifyProduct(handle);
  if (!product) notFound();
  let relatedProducts: ShopifyProduct[] = [];
  try {
    relatedProducts = (await getShopifyProducts())
      .filter((item) => item.id !== product.id)
      .slice(0, 3);
  } catch {
    // Show the product page even when related products cannot load.
  }

  return <ShopifyProductPage product={product} relatedProducts={relatedProducts} />;
}

export default function ProductRoute({ params }: PageProps<"/products/[handle]">) {
  return (
    <>
      <Suspense fallback={<div id="top" className="min-h-[110px] bg-[#080907]" />}>
        <div id="top"><Header /></div>
      </Suspense>
      <Suspense fallback={<main className="min-h-[75vh] bg-[#f5f1e9]" aria-label="Loading product" />}>
        <ProductDetails params={params} />
      </Suspense>
      <Suspense fallback={<div className="min-h-[240px] bg-[#080907]" />}>
        <Footer />
      </Suspense>
    </>
  );
}
