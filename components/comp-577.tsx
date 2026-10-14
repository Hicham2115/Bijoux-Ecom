"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommerceStore } from "@/lib/commerce-store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationLinks = [
  { href: "#women", label: "Femme" },
  { href: "#men", label: "Homme" },
  { href: "#categories", label: "Catégories" },
  { href: "/products", label: "Collections" },
  { href: "#maison", label: "La Maison" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const desktopNavigationLinks = navigationLinks.filter(({ label }) =>
  ["Femme", "Homme", "Collections"].includes(label),
);

function scrollToSectionAfterClose(href: string, closeDrawer: () => void) {
  closeDrawer();
  if (href.startsWith("/")) {
    window.location.assign(href);
    return;
  }

  const sectionId = href.slice(1);
  window.history.pushState(null, "", href);

  window.setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, 300);
}

export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const favoritesCount = useCommerceStore((state) => state.favorites.length);
  const cartCount = useCommerceStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
  );
  const openCart = useCommerceStore((state) => state.openCart);
  const sectionHref = (href: string) =>
    href.startsWith("/") || pathname === "/" ? href : `/${href}`;

  return (
    <header className="relative z-10 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#080907] px-5 sm:px-[5.5%]">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button
            className="size-11 text-white hover:bg-white/10 hover:text-[#e5cf9f] md:hidden"
            size="icon"
            variant="ghost"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="gap-0">
          <div className="flex items-start justify-between border-b border-white/15 pb-7">
            <div>
              <SheetTitle className="text-[23px] tracking-[0.2em] text-[#e5cf9f]">
                ORÉLIA
              </SheetTitle>
              <SheetDescription className="mt-2 font-sans text-[9px] uppercase tracking-[0.2em] text-white/50">
                Des bijoux précieux, pensés avec soin
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fermer le menu"
                className="size-10 text-white/75 hover:bg-white/10 hover:text-[#e5cf9f]"
              >
                <X className="size-5" strokeWidth={1.5} />
              </Button>
            </SheetClose>
          </div>
          <nav aria-label="Navigation principale" className="shrink-0 py-6">
            <ul className="divide-y divide-white/10">
              {navigationLinks.map((link, index) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <a
                      href={sectionHref(link.href)}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSectionAfterClose(sectionHref(link.href), () =>
                          setMenuOpen(false),
                        );
                      }}
                      className="group flex min-h-[58px] items-center justify-between text-[13px] uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-[#e5cf9f] focus-visible:text-[#e5cf9f] focus-visible:outline-none"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-sans text-[9px] tracking-normal text-[#d7b878]/70">
                          0{index + 1}
                        </span>
                        {link.label}
                      </span>
                      <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.4} />
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-white/15 pt-5">
            <p className="font-serif text-[18px] italic text-white/75">
              Une attention toute personnelle.
            </p>
            <SheetClose asChild>
              <a
                href={sectionHref("#contact")}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSectionAfterClose(sectionHref("#contact"), () =>
                    setMenuOpen(false),
                  );
                }}
                className="mt-4 inline-flex min-h-11 items-center border-b border-[#d7b878]/70 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#e5cf9f]"
              >
                Parler à notre équipe <ArrowUpRight className="ml-3 size-4" />
              </a>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <NavigationMenu viewport={false} className="max-md:hidden">
        <NavigationMenuList className="gap-7">
          {desktopNavigationLinks.map((link) => (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink
                href={sectionHref(link.href)}
                className="header-link p-0 text-[12px] font-medium uppercase tracking-[0.1em] text-white/90 hover:bg-transparent hover:text-[#d7b878] focus-visible:text-[#d7b878]"
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <a
        href={sectionHref("#top")}
        aria-label="Accueil Orélia"
        className="absolute left-1/2 -translate-x-1/2 font-serif text-[23px] tracking-[0.18em] text-[#e5cf9f] sm:text-[32px] sm:tracking-[0.24em]"
      >
        ORÉLIA
      </a>

      <div className="flex items-center gap-1.5 sm:gap-5">
        <Button
          render={<a href={sectionHref("#collection")} />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Rechercher"
          className="hidden size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f] sm:inline-flex"
        >
          <Search className="size-5" strokeWidth={1.5} />
        </Button>

        <Button
          render={<a href="/favorites" />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Vos favoris"
          className="relative size-11 text-white hover:bg-white/10 hover:text-[#e5cf9f] sm:size-8"
        >
          <Heart className="size-5" strokeWidth={1.5} />
          {favoritesCount > 0 && <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-[#d7b878] px-1 font-sans text-[9px] leading-4 text-[#171714]">{favoritesCount}</span>}
        </Button>
        <Button
          type="button"
          onClick={openCart}
          variant="ghost"
          size="icon"
          aria-label="Votre panier"
          className="relative size-11 text-white hover:bg-white/10 hover:text-[#e5cf9f] sm:size-8"
        >
          <ShoppingBag className="size-5" strokeWidth={1.5} />
          {cartCount > 0 && <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-[#d7b878] px-1 font-sans text-[9px] leading-4 text-[#171714]">{cartCount}</span>}
        </Button>
      </div>
    </header>
  );
}
