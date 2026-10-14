"use client";

import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navigationLinks = [
  { href: "#women", label: "Women" },
  { href: "#men", label: "Men" },
  { href: "#collection", label: "Collections" },
];

export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-10 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#080907] px-5 sm:px-[5.5%]">
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            className="size-11 text-white hover:bg-white/10 hover:text-[#e5cf9f] md:hidden"
            size="icon"
            variant="ghost"
            aria-label="Open navigation"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-48 border-white/10 bg-[#080907] p-2 text-white md:hidden"
        >
          <NavigationMenu viewport={false} className="max-w-none">
            <NavigationMenuList className="flex-col items-stretch gap-1">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="min-h-11 justify-center text-[12px] font-medium uppercase tracking-[0.1em] text-white/90 hover:bg-white/10 hover:text-[#d7b878]"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </PopoverContent>
      </Popover>

      <NavigationMenu viewport={false} className="max-md:hidden">
        <NavigationMenuList className="gap-7">
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink
                href={link.href}
                className="header-link p-0 text-[12px] font-medium uppercase tracking-[0.1em] text-white/90 hover:bg-transparent hover:text-[#d7b878] focus-visible:text-[#d7b878]"
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <a
        href="#top"
        aria-label="Orélia home"
        className="absolute left-1/2 -translate-x-1/2 font-serif text-[23px] tracking-[0.18em] text-[#e5cf9f] sm:text-[32px] sm:tracking-[0.24em]"
      >
        ORÉLIA
      </a>

      <div className="flex items-center gap-1.5 sm:gap-5">
        <Button
          render={<a href="#collection" />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="hidden size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f] sm:inline-flex"
        >
          <Search className="size-5" strokeWidth={1.5} />
        </Button>

        <Button
          render={<a href="#wishlist" />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Your wishlist"
          className="hidden size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f] lg:inline-flex"
        >
          <Heart className="size-5" strokeWidth={1.5} />
        </Button>
        <Button
          render={<a href="#cart" />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Your shopping bag"
          className="size-11 text-white hover:bg-white/10 hover:text-[#e5cf9f] sm:size-8"
        >
          <ShoppingBag className="size-5" strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  );
}
