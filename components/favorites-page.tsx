"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, X } from "lucide-react";
import { useCommerceStore } from "@/lib/commerce-store";

function money(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export function FavoritesPage() {
  const favorites = useCommerceStore((state) => state.favorites);
  const removeFavorite = useCommerceStore((state) => state.removeFavorite);
  const addToCart = useCommerceStore((state) => state.addToCart);

  return (
    <main className="min-h-[70vh] bg-[#f5f1e9] text-[#171714]">
      <section className="mx-auto max-w-[1600px] px-5 pb-20 pt-12 sm:px-[5.5%] sm:pb-28 sm:pt-20">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="orelia-eyebrow text-[#8c7043]">Vos pièces préférées</p>
          <h1 className="orelia-heading mt-3 text-[clamp(2.6rem,7vw,5.5rem)] text-[#172219]">
            Vos favoris
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] font-serif text-[16px] leading-relaxed text-[#625d53] sm:text-[18px]">
            Retrouvez ici les bijoux qui vous plaisent, à garder en tête pour le bon moment.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="mx-auto mt-14 flex max-w-[520px] flex-col items-center border-y border-[#d7cebf] px-6 py-12 text-center sm:mt-16 sm:py-16">
            <span className="grid size-14 place-items-center rounded-full border border-[#d7cebf] text-[#8c7043]">
              <Heart className="size-5" strokeWidth={1.3} />
            </span>
            <h2 className="orelia-heading mt-5 text-[28px] text-[#172219]">
              Gardez près de vous les bijoux qui vous touchent.
            </h2>
            <p className="mt-3 font-serif text-[15px] leading-relaxed text-[#746d60]">
              Appuyez sur le cœur d’un bijou pour l’ajouter à vos favoris.
            </p>
            <Link
              href="/products"
              className="orelia-action mt-6 inline-flex min-h-12 items-center gap-3 bg-[#07261b] px-6 text-white transition-colors hover:bg-[#123b2d]"
            >
              Découvrir la collection <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            <p className="orelia-eyebrow mt-12 border-b border-[#d7cebf] pb-4 text-[#746d60]">
              {favorites.length} {favorites.length === 1 ? "bijou enregistré" : "bijoux enregistrés"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-7">
              {favorites.map((item) => (
                <article key={item.productId} className="group min-w-0">
                  <div className="relative aspect-[0.86] overflow-hidden bg-[#eae4d9]">
                    <Link href={`/products/${item.handle}`} aria-label={`Voir ${item.title}`}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw"
                          quality={90}
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <span className="grid size-full place-items-center font-serif text-[13px] text-[#8c8579]">
                          Image bientôt disponible
                        </span>
                      )}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFavorite(item.productId)}
                      aria-label={`Retirer ${item.title} des favoris`}
                      className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-[#d7cebf] bg-[#f7f3eb]/95 text-[#8a3e32] shadow-sm transition-colors hover:bg-white"
                    >
                      <X className="size-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
                    <div className="min-w-0">
                      <Link href={`/products/${item.handle}`} className="orelia-eyebrow text-[9px] hover:text-[#927342] sm:text-[10px]">
                        {item.title}
                      </Link>
                      <p className="mt-1.5 line-clamp-2 font-serif text-[13px] text-[#746d60] sm:text-[15px]">
                        {item.productType || item.description || "Joaillerie"}
                      </p>
                      <p className="mt-2 font-serif text-[15px] font-semibold text-[#07261b] sm:text-[17px]">
                        {money(item.price, item.currencyCode)}
                      </p>
                    </div>
                  </div>
                  {item.variantId ? (
                    <button
                      type="button"
                      onClick={() => addToCart({
                        variantId: item.variantId,
                        productId: item.productId,
                        handle: item.handle,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        currencyCode: item.currencyCode,
                        variantTitle: item.variantTitle,
                      })}
                      className="orelia-action mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-[#07261b] text-[#07261b] transition-colors hover:bg-[#07261b] hover:text-white"
                    >
                      <ShoppingBag className="size-4" /> Ajouter au panier
                    </button>
                  ) : (
                    <Link
                      href={`/products/${item.handle}`}
                      className="orelia-action mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-[#07261b] text-[#07261b] transition-colors hover:bg-[#07261b] hover:text-white"
                    >
                      Choisir les options <ArrowRight className="size-4" />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
