import type { Metadata } from "next";
import { FavoritesPage } from "@/components/favorites-page";
import { Footer } from "@/components/footer";
import { Header } from "@/layout/header";

export const metadata: Metadata = {
  title: "Vos favoris | Orélia",
  description: "Retrouvez tous les bijoux Orélia que vous avez enregistrés.",
};

export default function FavoritesRoute() {
  return (
    <>
      <div id="top"><Header /></div>
      <FavoritesPage />
      <Footer />
    </>
  );
}
