import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Un service personnalisé",
    description:
      "De la gravure personnalisée à l’entretien expert, nos spécialistes vous aident à créer un bijou qui vous ressemble.",
    image: "/maison-personalized-service.webp",
    alt: "Bagues en or et bracelet chaîne sur du velours émeraude",
    link: "#services",
    action: "Découvrir",
  },
  {
    title: "Notre savoir-faire",
    description:
      "Ancré dans la tradition et pensé pour aujourd’hui. Découvrez l’art et l’innovation qui se cachent derrière chaque création.",
    image: "/maison-craft.webp",
    alt: "Un joaillier sertissant une émeraude sur une bague en or",
    link: "#maison",
    action: "Notre Maison",
  },
  {
    title: "Visitez une boutique",
    description:
      "Découvrez nos collections et profitez des conseils personnalisés de notre équipe.",
    image: "/maison-boutique.webp",
    alt: "Une élégante boutique de joaillerie avec du marbre émeraude et des présentoirs en laiton",
    link: "#boutique",
    action: "Trouver une boutique",
  },
];

export function MaisonServicesSection() {
  return (
    <section
      id="services"
      aria-label="Services et expériences de la Maison"
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
