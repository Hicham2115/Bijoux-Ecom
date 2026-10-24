import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MaisonSection() {
  return (
    <section
      id="maison"
      aria-labelledby="maison-title"
      className="relative isolate flex flex-col overflow-hidden border-y border-[#bcb2a3] bg-[#3b2a1c] text-center text-[#f7f2e8] md:grid md:aspect-[2.68/1] md:min-h-[420px] md:place-items-center md:px-10 md:py-20"
    >
      <div className="relative h-[260px] w-full sm:h-[360px] md:absolute md:inset-0 md:-z-20 md:h-auto">
        <Image quality={90}
          src="/orelia-maison.webp"
          alt="Une arche en pierre dorée dans un mur émeraude profond"
          fill
          sizes="100vw"
          className="object-cover object-[78%_center] md:object-center"
        />
      </div>

      <div className="max-w-[590px] px-6 py-12 md:px-0 md:py-0 md:translate-x-8">
        <p className="orelia-eyebrow mb-4 text-[#d0b36f] sm:mb-5">
          La Maison
        </p>
        <h2
          id="maison-title"
          className="orelia-heading text-[clamp(2rem,4.1vw,3.75rem)]"
        >
          UNE BEAUTÉ <br />
          INTEMPORELLE
        </h2>
        <p className="orelia-copy mx-auto mt-5 max-w-[470px] text-white/90 sm:mt-6">
          Nous créons des bijoux pour les moments les plus précieux —
          <br className="hidden sm:block" />
          avec des matériaux d’exception, des pratiques responsables,
          <br className="hidden sm:block" />
          et la conviction que la beauté peut durer.
        </p>
        <Button
          render={<a href="#maison" />}
          nativeButton={false}
          variant="outline"
          className="orelia-action orelia-button mt-7 h-[50px] rounded-none border-white/75 bg-transparent px-6 text-white hover:border-[#d0b36f] hover:bg-[#d0b36f] hover:text-[#3b2a1c] sm:mt-8"
        >
          Nos engagements
        </Button>
      </div>
    </section>
  );
}
