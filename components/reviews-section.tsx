import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "L’émeraude est encore plus lumineuse en vrai. C’est une pièce que je garderai précieusement pendant des années.",
    name: "Amira",
    location: "Casablanca",
    initials: "A",
  },
  {
    quote:
      "Chaque détail est pensé avec soin. C’est le bijou que je porte chaque matin.",
    name: "Lina",
    location: "Paris",
    initials: "L",
  },
  {
    quote:
      "Un magnifique cadeau, emballé avec tant de soin. Toute l’expérience était spéciale.",
    name: "Sofia",
    location: "London",
    initials: "S",
  },
  {
    quote:
      "Élégant sans être précieux. J’aime qu’il s’intègre si naturellement à mon quotidien.",
    name: "Nadia",
    location: "Rabat",
    initials: "N",
  },
  {
    quote:
      "L’or capte magnifiquement la lumière. C’est exactement la touche discrète que je recherchais.",
    name: "Maya",
    location: "Montreal",
    initials: "M",
  },
];

export function ReviewsSection() {
  return (
    <section
      aria-labelledby="reviews-title"
      className="overflow-hidden border-y border-[#e4ddcf] bg-[#f5f1e9] py-14 text-[#171714] sm:py-18"
    >
      <div className="mx-auto mb-9 max-w-3xl px-5 text-center sm:mb-12">
        <p className="orelia-eyebrow text-[#8c7043]">La communauté Orélia</p>
        <h2
          id="reviews-title"
          className="orelia-heading mt-3 text-[clamp(2rem,4vw,3.5rem)] text-[#211b14]"
        >
          Ce que nos clientes en pensent
        </h2>
        <p className="mt-4 font-serif text-[15px] leading-relaxed text-[#6d665b] sm:text-[17px]">
          Quelques mots sur les bijoux qu’elles aiment et gardent près d’elles.
        </p>
      </div>

      <div className="reviews-marquee group/reviews space-y-4 sm:space-y-5">
        {["left", "right"].map((direction) => (
          <div
            key={direction}
            className={`reviews-marquee__track reviews-marquee__track--${direction}`}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="reviews-marquee__group"
                aria-hidden={copy === 1}
              >
                {reviews.map((review, index) => (
                  <article
                    key={`${copy}-${review.name}`}
                    className={`reviews-card reviews-card--${index % 4}`}
                  >
                    <div
                      className="flex gap-1 text-[#a98442]"
                      aria-label="Note de 5 sur 5"
                    >
                      {Array.from({ length: 5 }, (_, star) => (
                        <Star
                          key={star}
                          aria-hidden="true"
                          className="size-3.5 fill-current"
                          strokeWidth={1.2}
                        />
                      ))}
                    </div>
                    <p className="mt-5 min-h-[92px] font-serif text-[17px] italic leading-relaxed text-[#302f29] sm:text-[19px]">
                      “{review.quote}”
                    </p>
                    <div className="mt-5 flex items-center gap-3 border-t border-[#d7cebf]/80 pt-4">
                      <span
                        aria-hidden="true"
                        className="grid size-12 shrink-0 place-items-center rounded-full border border-[#bba982] bg-[#f5f1e9] font-serif text-[17px] text-[#77613d]"
                      >
                        {review.initials}
                      </span>
                      <div>
                        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#29231c]">
                          {review.name}
                        </p>
                        <p className="mt-1 font-serif text-[13px] text-[#746d60]">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
