import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function ClosingCtaSection() {
  return (
    <section
      id="craft"
      aria-labelledby="closing-cta-title"
      className="bg-[#f5f1e9] px-3 pb-12 pt-3 sm:px-[4%] sm:pb-16"
    >
      <div className="relative isolate mx-auto flex min-h-[510px] max-w-[1380px] items-center overflow-hidden bg-[#2b1b13] px-6 py-14 text-[#fffaf2] sm:min-h-[430px] sm:px-12 lg:px-16">
        <Image
          src="/maison-craft.png"
          alt="An artisan setting an emerald in a gold ring"
          fill
          sizes="(max-width: 1380px) 100vw, 1380px"
          className="-z-20 object-cover object-[64%_center] sm:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(22,13,9,0.94)_0%,rgba(31,18,11,0.82)_33%,rgba(34,20,12,0.25)_68%,rgba(34,20,12,0.04)_100%)] max-sm:bg-[linear-gradient(90deg,rgba(22,13,9,0.88),rgba(22,13,9,0.37))]" />

        <div className="max-w-[470px]">
          <p className="orelia-eyebrow text-[#f2e8d8]">
            Our craft
          </p>
          <span aria-hidden="true" className="mt-4 block h-px w-10 bg-[#c7a368]" />
          <h2
            id="closing-cta-title"
            className="orelia-heading mt-5 text-[clamp(2.45rem,4vw,3.75rem)] uppercase tracking-[0.025em]"
          >
            Exceptional
            <br />
            by design
          </h2>
          <p className="orelia-copy mt-5 max-w-[400px] text-[#f4ebe0]">
            Rooted in tradition, shaped by today. At Orélia, our artisans bring
            together time-honored techniques and a modern perspective to create
            jewelry destined for generations.
          </p>
          <a
            href="#maison"
            className="orelia-action group mt-6 inline-flex items-center gap-5 border-b border-[#c7a368] pb-1.5 text-[#d9b578] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9b578] sm:mt-7"
          >
            Discover our Maison
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
