import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Collections",
    links: [
      { label: "Featured jewelry", href: "#collection" },
      { label: "Women's jewelry", href: "#women" },
      { label: "Men's jewelry", href: "#men" },
    ],
  },
  {
    title: "The Maison",
    links: [
      { label: "Our story", href: "#maison" },
      { label: "The craft", href: "#craft" },
      { label: "Our services", href: "#services" },
      { label: "Visit a boutique", href: "#boutique" },
    ],
  },
  {
    title: "Assistance",
    links: [
      { label: "Frequently asked questions", href: "#faq" },
      { label: "Care & sizing", href: "#faq" },
      { label: "Contact us", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#07261b] text-[#f4f0e7]">
      <div className="mx-auto max-w-[1500px] px-6 pt-12 sm:px-[5.5%] sm:pt-20">
        <div className="h-px w-full bg-[#c4a56c]/55" />

        <div className="grid gap-14 py-11 sm:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,2fr)] lg:gap-20">
          <div className="max-w-[430px]">
            <p className="orelia-eyebrow text-[#d0b36f]">The world of Orélia</p>
            <h2 className="orelia-heading mt-5 text-[clamp(2.25rem,3.2vw,3.7rem)]">
              Beauty to live in.
              <br />
              Pieces to keep.
            </h2>
            <p className="orelia-copy mt-6 max-w-[350px] text-[#f4f0e7]/70">
              Jewelry shaped by craft, made for the moments that become your own.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="orelia-eyebrow text-[#d0b36f]">{group.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
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
              <h3 className="orelia-eyebrow text-[#d0b36f]">Concierge</h3>
              <a href="mailto:concierge@orelia.com" className="mt-5 block break-words font-serif text-[16px] text-[#f4f0e7]/82">
                concierge@orelia.com
              </a>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-[#f4f0e7]/20 py-7 text-[11px] text-[#f4f0e7]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Orélia. All rights reserved.</p>
          <a
            href="mailto:concierge@orelia.com"
            className="hidden text-[#f4f0e7]/75 transition-colors hover:text-[#d0b36f] sm:inline"
          >
            concierge@orelia.com
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-2 self-start font-semibold uppercase tracking-[0.16em] text-[#d0b36f] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d0b36f]"
          >
            Back to top
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="mx-auto mt-9 max-w-[1800px] select-none overflow-hidden text-center font-serif text-[clamp(7rem,24vw,25rem)] leading-[0.74] tracking-[-0.075em] text-[#b7d0ba]/[0.12] sm:mt-14">
        ORÉLIA
      </div>
    </footer>
  );
}
