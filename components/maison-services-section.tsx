import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Personalized service",
    description:
      "From custom engravings to expert care, our specialists help you create jewelry that’s uniquely yours.",
    image: "/maison-personalized-service.webp",
    alt: "Gold rings and a chain bracelet worn against emerald velvet",
    link: "#services",
    action: "Discover",
  },
  {
    title: "Our craft",
    description:
      "Rooted in tradition, shaped for today. Discover the artistry and innovation behind every piece.",
    image: "/maison-craft.webp",
    alt: "A jeweler setting an emerald into a gold ring",
    link: "#maison",
    action: "Our Maison",
  },
  {
    title: "Visit a boutique",
    description:
      "Experience our collections in person and receive personalized guidance from our team.",
    image: "/maison-boutique.webp",
    alt: "An elegant jewelry boutique with emerald marble and brass displays",
    link: "#boutique",
    action: "Find a location",
  },
];

export function MaisonServicesSection() {
  return (
    <section
      id="services"
      aria-label="Maison services and experiences"
      className="bg-[#f5f1e9] px-5 py-7 text-[#171714] sm:px-[2.2%] sm:py-8"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {services.map((service, index) => (
          <article
            key={service.title}
            data-scroll-reveal-item
            id={index === 2 ? "boutique" : undefined}
            className="min-w-0"
          >
            <div className="relative aspect-[1.5/1] overflow-hidden bg-[#e8e0d4]">
              <Image quality={90}
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 32vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.025] motion-reduce:transition-none"
              />
            </div>
            <h2 className="orelia-heading mt-5 text-[23px] sm:text-[26px]">
              {service.title}
            </h2>
            <p className="orelia-copy mt-3 max-w-[430px] text-[#4b463f]">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
