import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { SolisRingPage } from "@/components/solis-ring-page";
import { connection } from "next/server";
import { getShopifyProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Bague émeraude Solis | Orélia",
  description: "Une émeraude lumineuse sertie dans de l’or 18 carats. Découvrez la bague Solis d’Orélia.",
};

async function SolisRingContent() {
  await connection();
  let product = null;
  try {
    product = await getShopifyProduct("solis-ring");
  } catch {
    product = null;
  }

  return <SolisRingPage product={product} />;
}

export default function SolisRingRoute() {
  return (
    <>
      <div id="top"><Header /></div>
      <Suspense fallback={<main className="min-h-[75vh] bg-[#f5f1e9]" aria-label="Chargement du produit" />}>
        <SolisRingContent />
      </Suspense>
      <Footer />
    </>
  );
}
