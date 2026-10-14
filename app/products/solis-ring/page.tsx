import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { SolisRingPage } from "@/components/solis-ring-page";
import { connection } from "next/server";
import { getShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Bague émeraude Solis | Orélia",
  description: "Une émeraude lumineuse sertie dans de l’or 18 carats. Découvrez la bague Solis d’Orélia.",
};

export default async function SolisRingRoute() {
  await connection();
  let product = null;
  try {
    product = await getShopifyProduct("solis-ring");
  } catch {
    product = null;
  }

  return (
    <>
      <div id="top"><Header /></div>
      <SolisRingPage product={product} />
      <Footer />
    </>
  );
}
