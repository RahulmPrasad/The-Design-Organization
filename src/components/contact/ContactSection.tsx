"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { areasServed, brandAlt, business, city, siteName } from "@/lib/site";
import "./contact.css";

// Netlify Forms: the static HTML form (name + data-netlify) is detected at deploy, and submissions are
// POSTed to "/" as URL-encoded data with a matching "form-name". They appear under Netlify → Forms.
const FORM_NAME = "contact";

const projectTypes = [
  "Apartment / Flat (2BHK, 3BHK, 4BHK)",
  "Villa / Bungalow",
  "Modular Kitchen",
  "Living Room / Bedroom",
  "Office / Commercial",
  "Café / Restaurant / Hotel",
  "Renovation",
  "Other",
];

const content = {
  label: "Plan Your Space",
  heading: "Contact Us",
  intro: `Tell us about your home, office or commercial space in ${city} and we'll get back to you to arrange a consultation.`,
  image: {
    src: "/images/projects/interior-5.webp",
    alt: "Bedroom with a slatted timber feature wall and pendant lights",
  },
  imageLabel: "Your Dream Space",
  imageText: "From the first sketch to the final styling, designed around how you live.",
  success: { title: "Thank You for Reaching Out.", text: "We've received your message and will be in touch soon." },
  error: "Sorry, something went wrong while sending your message. Please try again, or call or WhatsApp us directly.",
};

type Status = "idle" | "sending" | "sent" | "error";

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="100%" height="100%">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 11 8" fill="none" aria-hidden="true" className="contact_checkbox-icon">
      <path d="M1 4L4 7L10 1" stroke="currentColor" vectorEffect="non-scaling-stroke" strokeWidth="2" />
    </svg>
  );
}

const icons = {
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2M15 3a6 6 0 0 1 6 6M15 7a2 2 0 0 1 2 2" />
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
};

function InfoIcon({ name }: { name: keyof typeof icons }) {
  return (
    <span className="contact_info-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </svg>
    </span>
  );
}

type InfoLine = { text: string; href?: string; external?: boolean };

/** Three columns under the form: the same name, address and phone as the footer and the Business Profile. */
function ContactInfo() {
  const external = { target: "_blank", rel: "noopener noreferrer" };
  const columns: { icon: keyof typeof icons; title: string; lines: InfoLine[] }[] = [
    {
      icon: "phone",
      title: "Call & WhatsApp",
      lines: [
        ...(business.phone ? [{ text: business.phone, href: `tel:${business.phone.replace(/\s/g, "")}` }] : []),
        ...(business.whatsapp ? [{ text: "Chat on WhatsApp", href: `https://wa.me/${business.whatsapp}`, external: true }] : []),
      ],
    },
    {
      icon: "pin",
      title: "Visit Our Studio",
      lines: [
        {
          text: business.address.street ? `${business.address.street}, ${city}` : `${city}, ${business.address.region}`,
          href: business.mapUrl || undefined,
          external: true,
        },
        { text: `Serving homes and businesses across ${city}` },
      ],
    },
    {
      icon: "mail",
      title: "Write to Us",
      lines: [
        ...(business.email ? [{ text: business.email, href: `mailto:${business.email}` }] : []),
        ...business.profiles
          .filter((url) => url.includes("instagram.com"))
          .map((url) => ({ text: "Follow us on Instagram", href: url, external: true })),
      ],
    },
  ];

  return (
    <address data-animate-list="stagger" className="contact_info">
      {columns.map((column) => (
        <div key={column.title} className="contact_info-item">
          <InfoIcon name={column.icon} />
          <h2 className="contact_info-title subtitle-2">{column.title}</h2>
          {column.lines.map((line) =>
            line.href ? (
              <a key={line.text} href={line.href} className="contact_info-line is-link" {...(line.external ? external : {})}>
                {line.text}
              </a>
            ) : (
              <span key={line.text} className="contact_info-line">
                {line.text}
              </span>
            ),
          )}
        </div>
      ))}
    </address>
  );
}

/** Light contact page: heading and intro, the enquiry form beside a photo, then contact details in three columns. */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  useScrollReveal(sectionRef);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} className="section_contact text-color-black">
      <Spacer d={180} t={160} m={130} />
      <div className="padding-global">
        <div className="container-large">
          {/* Heading row: label and title on the left, intro bottom-right. */}
          <div className="contact_header">
            <div>
              <p data-label-fade="0" className="label-style-2 text-weight-medium">
                {content.label}
              </p>
              <Spacer d={24} m={16} />
              <h1 className="heading-style-h1">{content.heading}</h1>
            </div>
            <p data-paragraph-fade="200" className="contact_intro subtitle-1 text-style-wrap-pretty">
              {content.intro}
            </p>
          </div>
          <Spacer d={64} m={40} />

          <div className="contact_main">
            <div className="contact_card">
              {status === "sent" ? (
                <div className="contact_success" role="status">
                  <div className="heading-style-h5 text-style-wrap-pretty">{content.success.title}</div>
                  <p className="contact_muted">{content.success.text}</p>
                </div>
              ) : (
                <form name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  {/* Honeypot: hidden from people, filled in by spam bots, which Netlify then discards. */}
                  <p className="contact_honeypot" aria-hidden="true">
                    <label>
                      Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="contact_fields">
                    <label className="contact_field">
                      <span className="contact_label">Name *</span>
                      <input type="text" name="name" placeholder="Your full name" required autoComplete="name" className="contact_input" />
                    </label>
                    <label className="contact_field">
                      <span className="contact_label">Email *</span>
                      <input type="email" name="email" placeholder="you@example.com" required autoComplete="email" className="contact_input" />
                    </label>
                    <label className="contact_field">
                      <span className="contact_label">Phone Number *</span>
                      <input type="tel" name="phone" placeholder="+91 98XXX XXXXX" required autoComplete="tel" className="contact_input" />
                    </label>
                    <label className="contact_field">
                      <span className="contact_label">Project Type *</span>
                      <span className="contact_select">
                        <select name="project-type" required defaultValue="" className="contact_input">
                          <option value="" disabled>
                            Choose your project…
                          </option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <span className="contact_select-icon">
                          <ChevronIcon />
                        </span>
                      </span>
                    </label>
                    <label className="contact_field">
                      <span className="contact_label">Project Location</span>
                      <input
                        type="text"
                        name="location"
                        placeholder={`e.g. ${areasServed.slice(0, 2).join(", ")}`}
                        className="contact_input"
                      />
                    </label>
                    <label className="contact_field">
                      <span className="contact_label">Property Size</span>
                      <input type="text" name="size" placeholder="e.g. 3BHK, 1,800 sq ft" className="contact_input" />
                    </label>
                    <label className="contact_field is-full">
                      <span className="contact_label">Message</span>
                      <textarea
                        name="message"
                        placeholder="Tell us about the rooms you'd like designed, your style and your timeline."
                        className="contact_input is-textarea"
                      />
                    </label>

                    <label className="contact_checkbox is-full">
                      <input type="checkbox" name="consent" value="yes" required className="contact_checkbox-input" />
                      <span className="contact_checkbox-box">
                        <CheckIcon />
                      </span>
                      <span className="contact_muted">
                        I agree to be contacted by {siteName} about my enquiry. * We&apos;ll only use your details to respond to your
                        message.
                      </span>
                    </label>

                    {status === "error" && (
                      <p className="contact_error is-full" role="alert">
                        {content.error}
                      </p>
                    )}

                    <div className="is-full">
                      <Button variant="light" icon type="submit" label={status === "sending" ? "Sending…" : "Send Enquiry"} />
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div data-animate-self="200" className="contact_image-card">
              <Image
                src={content.image.src}
                alt={brandAlt(content.image.alt)}
                fill
                // Above the fold on every screen size (first on phones), and the page's largest image.
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 991px) 100vw, 33vw"
                className="contact_image"
              />
              {/* Same white info card with a dot label as the home page photo. */}
              <div className="info-card contact_image-card-label">
                <div data-wf--label-with-dot--variant="white" className="label-dot_wrapper">
                  <div className="label-dot_dot" />
                  <div className="label-style-1">{content.imageLabel}</div>
                </div>
                <Spacer d={12} />
                <p className="text-style-wrap-pretty">{content.imageText}</p>
              </div>
            </div>
          </div>

          <Spacer d={96} m={64} />
          <ContactInfo />
        </div>
      </div>
      <Spacer d={160} t={120} m={80} />
    </section>
  );
}
