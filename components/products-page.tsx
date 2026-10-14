"use client";

import Image from "next/image";
import { Check, ChevronDown, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const products = [
  {
    name: "Solis Ring",
    category: "Rings",
    detail: "18K gold · emerald",
    price: 2450,
    image: "/products/solis-ring.png",
  },
  {
    name: "Atlas Chain",
    category: "Necklaces",
    detail: "18K gold",
    price: 3800,
    image: "/products/atlas-chain.png",
  },
  {
    name: "Forma Cuff",
    category: "Bracelets",
    detail: "18K gold",
    price: 4200,
    image: "/products/forma-cuff.png",
  },
  {
    name: "Lumière Earrings",
    category: "Earrings",
    detail: "18K gold",
    price: 1950,
    image: "/products/lumiere-earrings.png",
  },
  {
    name: "Noir Signet",
    category: "Rings",
    detail: "18K gold · onyx",
    price: 2100,
    image: "/products/noir-signet.png",
  },
  {
    name: "Éclat Ring",
    category: "Rings",
    detail: "18K gold · diamonds",
    price: 3600,
    image: "/products/eclat-ring.png",
  },
];

const categories = [
  "All pieces",
  "Rings",
  "Necklaces",
  "Bracelets",
  "Earrings",
];
const sortOptions = [
  "Featured",
  "Price: low to high",
  "Price: high to low",
] as const;
type SortOption = (typeof sortOptions)[number];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductsPage() {
  const [category, setCategory] = useState("All pieces");
  const [sort, setSort] = useState<SortOption>("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) => category === "All pieces" || product.category === category,
    );
    if (sort === "Price: low to high")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low")
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, sort]);

  return (
    <main className="min-h-screen bg-[#f5f1e9] text-[#171714]">
      <section
        aria-labelledby="products-title"
        className="px-5 pb-8 pt-7 sm:px-[5.5%] sm:pb-10 sm:pt-10"
      >
        <nav
          aria-label="Breadcrumb"
          className="font-serif text-[13px] text-[#746d60]"
        >
          <a className="transition-colors hover:text-[#07261b]" href="/">
            Home
          </a>
          <span className="mx-2 text-[#b99045]">›</span>
          <span>Jewelry</span>
          <span className="mx-2 text-[#b99045]">›</span>
          <span aria-current="page">The Orélia Collection</span>
        </nav>

        <div className="mx-auto mt-10 max-w-[760px] text-center sm:mt-14">
          <p className="orelia-eyebrow text-[#8c7043]">The Orélia collection</p>
          <h1
            id="products-title"
            className="orelia-heading mt-4 text-[clamp(2.5rem,6vw,4.75rem)] text-[#101710]"
          >
            Fine jewelry, for every expression
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] font-serif text-[16px] leading-relaxed text-[#5f5a51] sm:text-[18px]">
            Thoughtful pieces, made to become part of your story.
          </p>
        </div>
      </section>

      <section
        aria-label="Browse the Orélia collection"
        className="px-5 pb-14 sm:px-[5.5%] sm:pb-20"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-5 border-y border-[#d7cebf] py-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap gap-2"
              aria-label="Filter by category"
            >
              {categories.map((item) => {
                const selected = category === item;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCategory(item)}
                    className={`min-h-10 rounded-full border px-5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442] ${selected ? "border-[#07261b] bg-[#07261b] text-[#f5f1e9]" : "border-[#c9c0b1] bg-transparent text-[#242721] hover:border-[#8e744b] hover:text-[#07261b]"}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-5 font-serif text-[13px] text-[#5f5a51] sm:justify-end">
              <p aria-live="polite">Showing {visibleProducts.length} pieces</p>
              <span aria-hidden="true" className="h-6 w-px bg-[#d7cebf]" />
              <Popover open={sortOpen} onOpenChange={setSortOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex min-h-10 items-center gap-2 text-[#242721] transition-colors hover:text-[#8c7043] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a98442]"
                    aria-label={`Sort products. Current order: ${sort}`}
                  >
                    Sort: {sort}
                    <ChevronDown className="size-4" strokeWidth={1.5} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-52 border-[#d7cebf] bg-[#f5f1e9] p-1 text-[#171714]"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      role="menuitemradio"
                      aria-checked={sort === option}
                      onClick={() => {
                        setSort(option);
                        setSortOpen(false);
                      }}
                      className="flex min-h-10 w-full items-center justify-between px-3 text-left font-serif text-[13px] hover:bg-[#eae3d7] focus-visible:bg-[#eae3d7] focus-visible:outline-none"
                    >
                      {option}
                      {sort === option && (
                        <Check className="size-4 text-[#8c7043]" />
                      )}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 xl:grid-cols-4 xl:gap-x-7">
            {visibleProducts.map((product) => {
              const isAdded = addedProducts.includes(product.name);
              return (
                <article
                  key={product.name}
                  data-scroll-reveal-item
                  className="group min-w-0"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#eee9e0]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 23vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
                    <div>
                      <h2 className="orelia-eyebrow text-[9px] sm:text-[10px]">
                        {product.name}
                      </h2>
                      <p className="mt-1.5 font-serif text-[13px] text-[#746d60] sm:text-[15px]">
                        {product.detail}
                      </p>
                      <p className="mt-2 font-serif text-[15px] font-semibold text-[#07261b] sm:mt-3 sm:text-[17px]">
                        {priceFormatter.format(product.price)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={
                        isAdded
                          ? `${product.name} is in your bag`
                          : `Add ${product.name} to your bag`
                      }
                      aria-pressed={isAdded}
                      onClick={() =>
                        setAddedProducts((current) =>
                          current.includes(product.name)
                            ? current
                            : [...current, product.name],
                        )
                      }
                      className="-mr-2 mt-1 size-10 shrink-0 rounded-full text-[#171714] hover:bg-[#07261b] hover:text-white sm:mr-0"
                    >
                      {isAdded ? (
                        <Check className="size-[18px]" strokeWidth={1.5} />
                      ) : (
                        <ShoppingBag
                          className="size-[18px]"
                          strokeWidth={1.5}
                        />
                      )}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {addedProducts.length > 0
              ? `${addedProducts.at(-1)} added to your bag.`
              : ""}
          </p>
        </div>
      </section>
    </main>
  );
}
