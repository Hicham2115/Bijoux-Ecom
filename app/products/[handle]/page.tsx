import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { ShopifyProductPage } from "@/components/shopify-product-page";
import { getShopifyProduct, getShopifyProducts, type ShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Fine Jewelry | Orélia",
  description: "Discover fine jewelry from the Orélia collection.",
};

export default async function ProductRoute({ params }: PageProps<"/products/[handle]">) {
  const { handle } = await params;
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

  return (
    <>
      <div id="top"><Header /></div>
      <ShopifyProductPage product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}
