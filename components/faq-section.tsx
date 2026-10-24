import { Plus } from "lucide-react";

const questions = [
  {
    question: "Comment entretenir mes bijoux Orélia ?",
    answer:
      "Rangez chaque bijou dans son écrin lorsque vous ne le portez pas et évitez le contact avec le parfum, les cosmétiques et les produits ménagers. Un chiffon doux et sec lui rendra tout son éclat.",
  },
  {
    question: "La livraison est-elle offerte ?",
    answer:
      "La livraison est offerte pour toutes les commandes. Votre bijou est soigneusement préparé dans un écrin Orélia et expédié avec un numéro de suivi.",
  },
  {
    question: "Puis-je retourner ou échanger ma commande ?",
    answer:
      "Si votre choix ne vous convient pas, vous pouvez demander un retour ou un échange dans les 30 jours suivant la livraison, à condition que le bijou n’ait pas été porté et soit dans son emballage d’origine.",
  },
  {
    question: "Proposez-vous un emballage cadeau et une personnalisation ?",
    answer:
      "Chaque commande est présentée dans notre emballage signature. Certains bijoux peuvent également être personnalisés par une gravure ; cette option est indiquée sur la page du produit.",
  },
  {
    question: "Comment connaître ma taille de bague ?",
    answer:
      "Rendez-vous dans une boutique Orélia pour une prise de mesure offerte, ou contactez nos spécialistes pour recevoir un guide des tailles à imprimer et des conseils personnalisés.",
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
            À votre écoute
          </p>
          <h2
            id="faq-title"
            className="orelia-heading mt-4 max-w-[420px] text-[clamp(2.4rem,4vw,3.8rem)]"
          >
            Quelques réponses à vos questions
          </h2>
          <p className="orelia-copy mt-5 max-w-[340px] text-[#5d574f]">
            Retrouvez les informations utiles ou laissez notre équipe vous conseiller.
          </p>
          <a
            href="#contact"
            className="orelia-action mt-7 inline-flex min-h-11 items-center border-b border-[#aa874b] text-[#25241f] transition-colors hover:text-[#8b7042]"
          >
            Parler à une spécialiste
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
