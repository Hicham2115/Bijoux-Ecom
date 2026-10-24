"use client";

import { ArrowUpRight } from "lucide-react";
import { CurrentYear } from "@/components/current-year";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    title: "Collections",
    links: [
      { label: "Nos catégories", href: "#categories" },
      { label: "Nos bijoux à découvrir", href: "#collection" },
      { label: "Bijoux pour femme", href: "#women" },
      { label: "Bijoux pour homme", href: "#men" },
    ],
  },
  {
    title: "La Maison",
    links: [
      { label: "Notre histoire", href: "#maison" },
      { label: "Notre savoir-faire", href: "#craft" },
      { label: "Nos services", href: "#services" },
      { label: "Visiter une boutique", href: "#boutique" },
    ],
  },
  {
    title: "Assistance",
    links: [
      { label: "Questions fréquentes", href: "#faq" },
      { label: "Entretien et tailles", href: "#faq" },
      { label: "Nous contacter", href: "#contact" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const sectionHref = (href: string) =>
    href.startsWith("/") || pathname === "/" ? href : `/${href}`;
  return (
    <footer className="overflow-hidden bg-[#24170f] text-[#f4f0e7]">
      <div className="mx-auto max-w-[1500px] px-6 pt-12 sm:px-[5.5%] sm:pt-20">
        <div className="h-px w-full bg-[#c4a56c]/55" />

        <div className="grid gap-14 py-11 sm:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,2fr)] lg:gap-20">
          <div className="max-w-[430px]">
            <p className="orelia-eyebrow text-[#d0b36f]">L’univers Orélia</p>
            <h2 className="orelia-heading mt-5 text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(2.25rem,3.2vw,3.7rem)]">
              La beauté au quotidien.
              <br />
              Des bijoux à garder.
            </h2>
            <p className="orelia-copy mt-6 max-w-[350px] text-[#f4f0e7]/70">
              Des bijoux façonnés avec soin, pour les moments qui vous ressemblent.
            </p>
          </div>

          <nav
            aria-label="Navigation de pied de page"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10"
          >
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="orelia-eyebrow text-[#d0b36f]">{group.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={sectionHref(link.href)}
                        className="footer-link font-serif text-[16px] leading-[1.35] text-[#f4f0e7]/82 hover:text-[#d0b36f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d0b36f] sm:text-[17px]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="sm:hidden">
              <h3 className="orelia-eyebrow text-[#d0b36f]">Notre équipe</h3>
              <a
                href="mailto:concierge@orelia.com"
                className="mt-5 block break-words font-serif text-[16px] text-[#f4f0e7]/82"
              >
                concierge@orelia.com
              </a>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-[#f4f0e7]/20 py-7 text-[11px] text-[#f4f0e7]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> Orélia. Tous droits réservés.
          </p>
          <a
            href="mailto:concierge@orelia.com"
            className="hidden text-[#f4f0e7]/75 transition-colors hover:text-[#d0b36f] sm:inline"
          >
            concierge@orelia.com
          </a>
          <a
            href={sectionHref("#top")}
            className="inline-flex items-center gap-2 self-start font-semibold uppercase tracking-[0.16em] text-[#d0b36f] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d0b36f]"
          >
            Retour en haut
            <ArrowUpRight
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto mt-9 max-w-[1800px] select-none overflow-hidden text-center font-serif text-[clamp(7rem,24vw,25rem)] leading-[0.74] tracking-[-0.075em] text-[#d7b878]/[0.12] sm:mt-14"
      >
        ORÉLIA
      </div>

      <p className="mx-auto max-w-[1440px] px-6 py-4 text-center text-[12px] text-white/70 sm:px-8 lg:px-12">
        Conçu et développé par{" "}
        <a
          href="https://www.stallionadvertising.ma/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-20 underline decoration-transparent underline-offset-2 transition-colors duration-200 hover:text-white hover:decoration-teal-400"
        >
          Stallion Advertising
        </a>
      </p>
    </footer>
  );
}
