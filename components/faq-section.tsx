import { Plus } from "lucide-react";

const questions = [
  {
    question: "How should I care for my Orélia jewelry?",
    answer:
      "Keep each piece in its pouch when not being worn, and avoid contact with perfume, cosmetics, and household products. A soft, dry cloth will help restore its natural glow.",
  },
  {
    question: "Do you offer complimentary shipping?",
    answer:
      "Complimentary delivery is available on all orders. Your piece is carefully prepared in an Orélia gift box and shipped with tracking so you can follow its journey.",
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "If your selection isn’t quite right, you may request a return or exchange within 30 days of delivery, provided the piece is unworn and in its original packaging.",
  },
  {
    question: "Do you offer gift wrapping and personalization?",
    answer:
      "Every order arrives in our signature packaging. Select pieces can also be personalized with an engraving; availability is shown on the product page.",
  },
  {
    question: "How can I find my ring size?",
    answer:
      "Visit an Orélia boutique for a complimentary fitting, or contact our specialists for a printable size guide and personal advice.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-[#f5f1e9] px-5 py-16 text-[#171714] sm:px-[8%] sm:py-24"
    >
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="orelia-eyebrow text-[#8b7042]">
            Here to help
          </p>
          <h2
            id="faq-title"
            className="orelia-heading mt-4 max-w-[420px] text-[clamp(2.4rem,4vw,3.8rem)]"
          >
            A few things you may wonder
          </h2>
          <p className="orelia-copy mt-5 max-w-[340px] text-[#5d574f]">
            Find the details you need, or let our team guide you personally.
          </p>
          <a
            href="#services"
            className="orelia-action mt-7 inline-flex min-h-11 items-center border-b border-[#aa874b] text-[#25241f] transition-colors hover:text-[#8b7042]"
          >
            Speak with a specialist
          </a>
        </div>

        <div className="border-t border-[#cfc6b8]">
          {questions.map((item) => (
            <details
              key={item.question}
              data-scroll-reveal-item
              className="group border-b border-[#cfc6b8]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-serif text-[18px] leading-[1.35] transition-colors duration-200 hover:text-[#8b7042] focus-visible:text-[#8b7042] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aa874b] marker:content-none sm:py-6 sm:text-[20px] [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <Plus
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#8b7042] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  strokeWidth={1.5}
                />
              </summary>
              <div className="faq-answer-grid">
                <p className="faq-answer-inner orelia-copy max-w-[620px] pr-8 text-[#5d574f]">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
