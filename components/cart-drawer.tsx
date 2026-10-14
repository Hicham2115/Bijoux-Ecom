"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCommerceStore } from "@/lib/commerce-store";

function money(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function CartDrawer() {
  const items = useCommerceStore((state) => state.cartItems);
  const open = useCommerceStore((state) => state.cartOpen);
  const closeCart = useCommerceStore((state) => state.closeCart);
  const setQuantity = useCommerceStore((state) => state.setCartQuantity);
  const removeItem = useCommerceStore((state) => state.removeFromCart);
  const [checkoutPending, setCheckoutPending] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const currencyCode = items[0]?.currencyCode ?? "USD";
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  async function startCheckout() {
    setCheckoutPending(true);
    setCheckoutError("");
    try {
      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((item) => ({
            merchandiseId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error ?? "Impossible de lancer le paiement.");
      }
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Impossible de lancer le paiement.",
      );
      setCheckoutPending(false);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeCart();
      }}
    >
      <SheetContent
        side="left"
        className="w-[min(94vw,470px)] max-w-none gap-0 border-r border-[#d5c7a9] bg-[#f7f3eb] px-0 py-0 text-[#171714] shadow-[24px_0_80px_rgba(0,0,0,0.24)]"
      >
        <div className="flex items-start justify-between border-b border-[#d9d0c1] px-6 pb-5 pt-7 sm:px-8">
          <div>
            <p className="orelia-eyebrow text-[#8c7043]">Votre sélection</p>
            <SheetTitle className="orelia-heading mt-2 text-[32px] text-[#172219]">
              Panier <span className="font-sans text-sm">({quantity})</span>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Articles de votre panier et montant total avant le paiement.
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Fermer le panier"
              className="grid size-10 place-items-center border border-[#d9d0c1] text-[#343a31] transition-colors hover:border-[#927342] hover:text-[#927342]"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>
          </SheetClose>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full border border-[#d7cebf] text-[#8c7043]">
              <ShoppingBag className="size-6" strokeWidth={1.2} />
            </span>
            <h3 className="orelia-heading mt-6 text-[28px] text-[#172219]">
              Un peu de place pour une jolie trouvaille.
            </h3>
            <p className="mt-3 max-w-[290px] font-serif text-[15px] leading-relaxed text-[#746d60]">
              Votre panier attend le bijou qui vous ressemble.
            </p>
            <SheetClose asChild>
              <Link
                href="/products"
                className="orelia-action mt-7 inline-flex min-h-12 items-center gap-3 bg-[#07261b] px-6 text-white transition-colors hover:bg-[#123b2d]"
              >
                Découvrir la collection <ArrowRight className="size-4" />
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 sm:px-8">
              <p className="border-b border-[#d9d0c1] py-4 font-serif text-[14px] text-[#625d53]">
                Livraison et retours offerts sur toutes les commandes.
              </p>
              <ul className="divide-y divide-[#ded6c9]">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 py-5">
                    <Link
                      href={`/products/${item.handle}`}
                      onClick={closeCart}
                      className="relative size-[92px] shrink-0 overflow-hidden bg-[#ebe6dc]"
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="92px"
                          quality={90}
                          className="object-cover"
                        />
                      ) : null}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/products/${item.handle}`}
                            onClick={closeCart}
                            className="orelia-eyebrow text-[10px] text-[#2b3028] hover:text-[#927342]"
                          >
                            {item.title}
                          </Link>
                          {item.variantTitle !== "Default Title" && (
                            <p className="mt-1 font-serif text-[13px] text-[#746d60]">
                              {item.variantTitle}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          aria-label={`Retirer ${item.title} du panier`}
                          className="-mr-2 -mt-2 grid size-9 shrink-0 place-items-center text-[#746d60] transition-colors hover:text-[#8a3e32]"
                        >
                          <X className="size-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div className="inline-flex h-9 items-center border border-[#d4cbbd]">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                            aria-label={`Diminuer la quantité de ${item.title}`}
                            className="grid size-8 place-items-center text-[#45483f] hover:text-[#927342]"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-6 text-center font-sans text-[12px]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                            aria-label={`Augmenter la quantité de ${item.title}`}
                            className="grid size-8 place-items-center text-[#45483f] hover:text-[#927342]"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <p className="font-serif text-[15px] font-semibold text-[#172219]">
                          {money(Number(item.price) * item.quantity, item.currencyCode)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#d9d0c1] bg-[#f2ede4] px-6 pb-7 pt-5 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="orelia-eyebrow text-[#33362f]">Sous-total</span>
                <span className="font-serif text-[19px] font-semibold text-[#172219]">
                  {money(subtotal, currencyCode)}
                </span>
              </div>
              <p className="mt-2 font-serif text-[13px] text-[#746d60]">
                Les frais de livraison et les taxes seront calculés au paiement.
              </p>
              {checkoutError && (
                <p className="mt-3 font-sans text-[13px] text-[#9a3f31]" role="alert">
                  {checkoutError}
                </p>
              )}
              <button
                type="button"
                onClick={startCheckout}
                disabled={checkoutPending}
                className="orelia-action mt-5 flex min-h-[54px] w-full items-center justify-center gap-3 bg-[#07261b] px-5 text-white transition-colors hover:bg-[#123b2d] disabled:cursor-wait disabled:opacity-60"
              >
                {checkoutPending ? "Connexion au paiement…" : "Passer au paiement"}
                {!checkoutPending && <ArrowRight className="size-4" />}
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 font-sans text-[9px] uppercase tracking-[0.15em] text-[#746d60]">
                <LockKeyhole className="size-3" /> Paiement sécurisé par Shopify
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
