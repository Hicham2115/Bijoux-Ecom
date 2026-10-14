import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";
import { SolisRingPage } from "@/components/solis-ring-page";

export const metadata: Metadata = {
  title: "Solis Emerald Ring | Orélia",
  description: "A luminous emerald set in warm 18K gold. Meet the Solis ring by Orélia.",
};

export default function SolisRingRoute() {
  return (
    <>
      <div id="top"><Header /></div>
      <SolisRingPage />
      <Footer />
    </>
  );
}
