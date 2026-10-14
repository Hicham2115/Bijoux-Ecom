import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "The emerald is even more luminous in person. It feels like a piece I’ll treasure for years.",
    name: "Amira",
    location: "Casablanca",
    initials: "A",
  },
  {
    quote:
      "Every detail feels considered. It has become the piece I reach for every morning.",
    name: "Lina",
    location: "Paris",
    initials: "L",
  },
  {
    quote:
      "A beautiful gift, wrapped with such care. The whole experience felt special.",
    name: "Sofia",
    location: "London",
    initials: "S",
  },
  {
    quote:
      "Elegant without feeling precious. I love how easily it fits into everyday life.",
    name: "Nadia",
    location: "Rabat",
    initials: "N",
  },
  {
    quote:
      "The gold catches the light beautifully. Exactly the quiet statement I wanted.",
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
        <p className="orelia-eyebrow text-[#8c7043]">The Orélia community</p>
        <h2
          id="reviews-title"
          className="orelia-heading mt-3 text-[clamp(2rem,4vw,3.5rem)] text-[#101710]"
        >
          What our clients are saying
        </h2>
        <p className="mt-4 font-serif text-[15px] leading-relaxed text-[#6d665b] sm:text-[17px]">
          Personal notes on the pieces they love and keep close.
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
                      aria-label="Rated 5 out of 5"
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
                        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-[#252720]">
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
