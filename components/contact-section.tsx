"use client";

import Image from "next/image";
import { ArrowUpRight, Gift, Gem, Ruler } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const paperStyle = {
  backgroundColor: "#f5efe3",
  backgroundImage:
    'linear-gradient(rgba(245, 239, 227, 0.64), rgba(245, 239, 227, 0.64)), url("/orelia-contact-paper.webp")',
  backgroundSize: "600px 600px",
};

const fieldStyle = {
  color: "#07261b",
  borderBottom: "1px solid #788478",
};

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().max(80),
  email: z.string().trim().email("Enter a valid email address").max(254),
  message: z.string().trim().min(1, "Tell us how we can help").max(1200),
});

function firstError(errors: readonly unknown[]) {
  const error = errors[0];
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return undefined;
}

export function ContactSection() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: ({ value }) => {
      const body = [
        "Name: " + value.firstName.trim() + " " + value.lastName.trim(),
        "Email: " + value.email.trim(),
        "",
        value.message.trim(),
      ].join("\n");
      window.location.href =
        "mailto:concierge@orelia.com?subject=" +
        encodeURIComponent("Orélia concierge inquiry") +
        "&body=" +
        encodeURIComponent(body);
    },
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-[#07261b] px-3 py-10 sm:px-[4%] sm:py-16"
    >
      <div
        style={paperStyle}
        className="contact-paper mx-auto grid max-w-[1380px] overflow-hidden rounded-[18px] border border-[#e2d5bf] text-[#07261b] shadow-[0_24px_70px_rgba(0,0,0,0.18)] lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="flex flex-col px-7 py-10 sm:px-12 sm:py-12 lg:min-h-[660px] lg:justify-between lg:px-[8%] lg:py-14">
          <div className="mx-auto max-w-[700px] text-center lg:mt-10">
            <p
              style={{
                fontFamily:
                  '"Snell Roundhand", "Apple Chancery", "URW Chancery L", "Brush Script MT", cursive',
              }}
              className="contact-script relative z-10 text-[clamp(3.6rem,6.4vw,7rem)] leading-[0.95] text-[#2c8b91]"
            >
              A note to our Maison
            </p>
            <h2
              id="contact-title"
              className="orelia-heading -mt-1 text-[clamp(2.2rem,3.8vw,4.15rem)] leading-[1.04] text-[#07261b]"
            >
              We would love to hear from you.
            </h2>
            <p className="mx-auto mt-6 max-w-[540px] font-serif text-[15px] leading-[1.55] text-[#5f5a51] sm:text-[16px]">
              Every piece has a story. From finding the right piece or size to
              caring for a favorite or choosing a thoughtful gift, our
              specialists are here to help.
            </p>
            <div className="mx-auto mt-9 grid w-full max-w-[680px] grid-cols-1 border-y border-[#9b845d]/40 sm:grid-cols-3">
              {[
                {
                  icon: Gem,
                  title: "Personal advice",
                  detail: "Find a piece that feels like you.",
                },
                {
                  icon: Ruler,
                  title: "Size & care",
                  detail: "Thoughtful help for every piece.",
                },
                {
                  icon: Gift,
                  title: "Meaningful gifts",
                  detail: "Make their moment memorable.",
                },
              ].map(({ icon: Icon, title, detail }) => (
                <a
                  key={title}
                  href="#message"
                  className="group flex min-h-[82px] items-center gap-3 border-b border-[#9b845d]/25 px-1 py-4 text-left transition-colors hover:bg-[#fffaf0]/45 last:border-b-0 sm:min-h-[140px] sm:flex-col sm:items-start sm:justify-center sm:border-b-0 sm:border-r sm:px-4 sm:last:border-r-0 lg:px-5"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-[18px] shrink-0 text-[#927342] transition-transform group-hover:-translate-y-0.5"
                    strokeWidth={1.4}
                  />
                  <span>
                    <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#31463a]">
                      {title}
                    </span>
                    <span className="mt-1 block font-serif text-[13px] leading-snug text-[#6d685d]">
                      {detail}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto size-4 shrink-0 text-[#927342] opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:hidden"
                    strokeWidth={1.4}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-14 border-t border-[#9b845d]/45 pt-5 lg:mt-0">
            <p className="orelia-eyebrow text-[#927342]">The Orélia promise</p>
            <p className="mt-3 font-serif text-[clamp(1.15rem,1.7vw,1.55rem)] italic leading-snug text-[#52665a]">
              Considered care, at every step.
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-[#647267] px-7 pb-10 pt-8 sm:px-10 sm:pb-12 sm:pt-10 lg:border-l lg:border-t-0 lg:px-[8%] lg:py-10">
          <Image quality={90}
            src="/orelia-contact-stamps.webp"
            alt=""
            aria-hidden="true"
            width={2022}
            height={778}
            sizes="(max-width: 1024px) 90vw, 540px"
            className="mx-auto h-auto w-full max-w-[490px]"
          />

          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              void form.handleSubmit();
            }}
            className="mt-8 space-y-5 sm:mt-10"
          >
            <form.Field name="firstName">
              {(field) => {
                const error = firstError(field.state.meta.errors);
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block font-sans text-[15px] text-[#31463a]"
                    >
                      First name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      autoComplete="given-name"
                      aria-required="true"
                      aria-invalid={Boolean(error)}
                      aria-describedby={
                        error ? "contact-first-name-error" : undefined
                      }
                      maxLength={80}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className="contact-line-field h-8"
                      style={fieldStyle}
                    />
                    <p
                      id="contact-first-name-error"
                      role={error ? "alert" : undefined}
                      className="mt-1 min-h-4 text-[12px] leading-4 text-[#a43c08]"
                    >
                      {error ?? "\u00a0"}
                    </p>
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="lastName">
              {(field) => {
                const error = firstError(field.state.meta.errors);
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block font-sans text-[15px] text-[#31463a]"
                    >
                      Last name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      autoComplete="family-name"
                      aria-invalid={Boolean(error)}
                      aria-describedby={
                        error ? "contact-last-name-error" : undefined
                      }
                      maxLength={80}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className="contact-line-field h-8"
                      style={fieldStyle}
                    />
                    <p
                      id="contact-last-name-error"
                      role={error ? "alert" : undefined}
                      className="mt-1 min-h-4 text-[12px] leading-4 text-[#a43c08]"
                    >
                      {error ?? "\u00a0"}
                    </p>
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const error = firstError(field.state.meta.errors);
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block font-sans text-[15px] text-[#31463a]"
                    >
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={Boolean(error)}
                      aria-describedby={
                        error ? "contact-email-error" : undefined
                      }
                      maxLength={254}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className="contact-line-field h-8"
                      style={fieldStyle}
                    />
                    <p
                      id="contact-email-error"
                      role={error ? "alert" : undefined}
                      className="mt-1 min-h-4 text-[12px] leading-4 text-[#a43c08]"
                    >
                      {error ?? "\u00a0"}
                    </p>
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="message">
              {(field) => {
                const error = firstError(field.state.meta.errors);
                return (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block font-sans text-[15px] text-[#31463a]"
                    >
                      How can we help? <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={2}
                      aria-required="true"
                      aria-invalid={Boolean(error)}
                      aria-describedby={
                        error ? "contact-message-error" : undefined
                      }
                      maxLength={1200}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      className="contact-line-field min-h-[72px] resize-y pt-2 leading-relaxed"
                      style={fieldStyle}
                    />
                    <p
                      id="contact-message-error"
                      role={error ? "alert" : undefined}
                      className="mt-1 min-h-4 text-[12px] leading-4 text-[#a43c08]"
                    >
                      {error ?? "\u00a0"}
                    </p>
                  </div>
                );
              }}
            </form.Field>
            <div className="flex flex-col gap-3 pt-2 sm:items-end">
              <button
                type="submit"
                className="orelia-action orelia-button inline-flex h-[50px] items-center justify-center self-end rounded-[12px] border border-[#07261b] bg-transparent px-8 text-[#07261b] hover:bg-[#07261b] hover:text-[#f4eee3]"
              >
                Send message
              </button>
              <p className="text-right font-sans text-[11px] text-[#667064]">
                Opens your email app to send.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
