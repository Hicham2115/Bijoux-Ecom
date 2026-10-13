"use client";

import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
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
  { href: "#collection", label: "Women" },
  { href: "#collection", label: "Men" },
  { href: "#collection", label: "Collections" },
];

export default function Component() {
  return (
    <header className="relative z-10 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#080907] px-5 sm:px-[5.5%]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f] md:hidden"
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
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 hover:bg-white/10 hover:text-[#d7b878]"
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
                className="p-0 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 hover:bg-transparent hover:text-[#d7b878]"
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
        className="absolute left-1/2 -translate-x-1/2 font-serif text-[26px] tracking-[0.24em] text-[#e5cf9f] sm:text-[32px]"
      >
        ORÉLIA
      </a>

      <div className="flex items-center gap-3 sm:gap-5">
        <a
          href="#maison"
          className="hidden text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 transition-colors hover:text-[#d7b878] sm:block"
        >
          Maison
        </a>
        <Button
          render={<a href="#collection" />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f]"
        >
          <Search className="size-5" strokeWidth={1.5} />
        </Button>
        <Button
          render={<a href="#account" />}
          nativeButton={false}
          variant="ghost"
          size="icon"
          aria-label="Your account"
          className="hidden size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f] sm:inline-flex"
        >
          <UserRound className="size-5" strokeWidth={1.5} />
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
          className="size-8 text-white hover:bg-white/10 hover:text-[#e5cf9f]"
        >
          <ShoppingBag className="size-5" strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  );
}
