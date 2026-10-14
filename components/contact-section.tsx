import Image from "next/image";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-[radial-gradient(ellipse_at_50%_0%,#123b2e_0%,#06291f_58%)] px-3 py-10 sm:px-[4%] sm:py-16"
    >
      <div className="mx-auto grid max-w-[1380px] overflow-hidden rounded-[20px] border border-[#d0b36f]/45 bg-[#f5f1e9] text-[#171714] shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:min-h-[590px] md:grid-cols-[0.88fr_1.12fr] lg:rounded-[28px]">
        <div className="relative min-h-[300px] overflow-hidden bg-[#e6dfd3] md:min-h-full">
          <Image
            src="/maison-personalized-service.png"
            alt="A selection of Orélia jewelry against emerald velvet"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071c15]/65 via-[#071c15]/5 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 border border-white/35 p-4 text-[#fffaf0] sm:inset-x-8 sm:bottom-8 sm:p-6">
            <p className="orelia-eyebrow text-[#e1c887]">
              The Orélia promise
            </p>
            <p className="orelia-heading mt-2 max-w-[320px] text-[20px] sm:text-[25px]">
              Considered care, at every step.
            </p>
          </div>
        </div>

        <div className="flex items-center px-6 py-10 sm:px-10 sm:py-14 lg:px-[12%] lg:py-16">
          <div className="w-full max-w-[620px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#aa874b]" />
              <p className="orelia-eyebrow text-[#8b7042]">
                Personal assistance
              </p>
            </div>
            <h2
              id="contact-title"
              className="orelia-heading mt-4 max-w-[500px] text-[clamp(2.35rem,4.3vw,4rem)]"
            >
              Need a little <span className="text-[#8b7042]">guidance?</span>
            </h2>
            <p className="orelia-copy mt-3 max-w-[440px] text-[#5d574f]">
              Contact us and our jewelry specialists will be happy to help.
            </p>

            <form action="mailto:concierge@orelia.com" method="post" encType="text/plain" className="mt-7 space-y-4 sm:mt-9 sm:space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="orelia-eyebrow mb-2 block text-[#4b463f]"
                >
                  Name and surname
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  className="h-11 w-full border border-[#e5dcd2] bg-[#eee8e2] px-3 text-[14px] outline-none transition-colors focus:border-[#aa874b] focus:bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="orelia-eyebrow mb-2 block text-[#4b463f]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-11 w-full border border-[#e5dcd2] bg-[#eee8e2] px-3 text-[14px] outline-none transition-colors focus:border-[#aa874b] focus:bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="orelia-eyebrow mb-2 block text-[#4b463f]"
                >
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-y border border-[#e5dcd2] bg-[#eee8e2] px-3 py-3 text-[14px] leading-relaxed outline-none transition-colors focus:border-[#aa874b] focus:bg-white"
                />
              </div>
              <div className="flex flex-col-reverse gap-5 border-t border-[#d8d0c4] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="tel:+18005550148"
                  className="orelia-action text-[#5d574f] underline decoration-[#aa874b]/60 underline-offset-4 transition-colors hover:text-[#8b7042]"
                >
                  Or call +1 (800) 555-0148
                </a>
                <button
                  type="submit"
                  className="orelia-action orelia-button inline-flex h-12 w-full items-center justify-center bg-[#aa874b] px-8 text-white hover:bg-[#866632] sm:w-auto"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
