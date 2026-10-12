import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Page, PageHero, Faq, faqLd } from "@/components/site/Shell";
import { BIZ, breadcrumbLd, localBusinessLd, waLink } from "@/lib/site";
import { seo } from "@/lib/seo";

const FAQ: [string, string][] = [
  ["Where is the shop located?", BIZ.address],
  ["What is the contact phone number?", BIZ.phone],
  ["How do I open the location in Google Maps?", "Tap 'Get Directions' — it opens our location in Google Maps."],
  ["How can I enquire about Mudavattu Kilangu?", "Use the order tool on the Products page, or WhatsApp us."],
  ["How do I book for a group of 10 or more?", "Use the group enquiry form on the home page. The shop will confirm your booking."],
  ["How can I ask about current menu availability?", "Call or WhatsApp us — we'll tell you what's fresh today."],
];

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact MP Snacks & Bites — Ondikadai, Yercaud", `Call ${BIZ.phone}, WhatsApp, or get directions to MP Snacks & Bites at Waterfront Hotel, Ondikadai, Yercaud.`, "/contact", [localBusinessLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }]), faqLd(FAQ)]),
  component: Contact,
});

function Contact() {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const n: Record<string, string> = {};
    if (!f.name?.trim()) n.name = "Please enter your name.";
    if (!f.reach?.trim() || !(/^\S+@\S+\.\S+$/.test(f.reach) || /^[+\d\s-]{10,}$/.test(f.reach))) n.reach = "Enter a valid phone number or email.";
    if (!f.subject?.trim()) n.subject = "Please add a subject.";
    if (!f.message?.trim()) n.message = "Please write a message.";
    setErrs(n);
    if (Object.keys(n).length) return;
    window.open(waLink(`Hello MP Snacks & Bites,\nName: ${f.name}\nContact: ${f.reach}\nSubject: ${f.subject}\n${f.message}`), "_blank", "noopener,noreferrer");
  };
  const label = "mb-1 block text-sm font-medium text-forest";
  const err = (k: string) => errs[k] && <p className="mt-1 text-sm text-destructive">{errs[k]}</p>;
  return (
    <Page>
      <PageHero eyebrow="Get in touch" title="Contact MP Snacks & Bites" text="Call, message, or drop by for chai and snacks at Ondikadai." img={hero} crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]} />
      <section className="container-x grid gap-10 py-20 lg:grid-cols-2">
        <div className="reveal space-y-5">
          <div className="rounded-2xl bg-card p-6 shadow-soft"><MapPin className="h-6 w-6 text-primary" /><h2 className="mt-3 text-2xl font-bold text-forest">Visit us</h2><p className="mt-1 text-muted-foreground">{BIZ.address}</p>
            <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">Get Directions</a></div>
          <div className="rounded-2xl bg-card p-6 shadow-soft"><Phone className="h-6 w-6 text-primary" /><h2 className="mt-3 text-2xl font-bold text-forest">Call or WhatsApp</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`tel:${BIZ.phone}`} className="btn btn-outline text-forest"><Phone className="h-4 w-4" />{BIZ.phone}</a>
              <a href={waLink("Hello MP Snacks & Bites!")} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle className="h-4 w-4" />WhatsApp</a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Opening hours will be shared here once confirmed — please call ahead.</p></div>
          <iframe title="MP Snacks & Bites location map" src="https://www.google.com/maps?q=Waterfront+Hotel+Ondikadai+Yercaud&output=embed" className="h-72 w-full rounded-2xl border" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <form onSubmit={submit} noValidate className="reveal h-fit space-y-4 rounded-3xl bg-card p-6 shadow-lift md:p-8">
          <h2 className="text-2xl font-bold text-forest">Send an enquiry</h2>
          <div><label className={label} htmlFor="c-name">Name *</label><input id="c-name" name="name" className="field" />{err("name")}</div>
          <div><label className={label} htmlFor="c-reach">Phone or email *</label><input id="c-reach" name="reach" className="field" />{err("reach")}</div>
          <div><label className={label} htmlFor="c-sub">Subject *</label><input id="c-sub" name="subject" className="field" />{err("subject")}</div>
          <div><label className={label} htmlFor="c-msg">Message *</label><textarea id="c-msg" name="message" rows={5} className="field" />{err("message")}</div>
          <button className="btn btn-primary w-full"><MessageCircle className="h-4 w-4" />Send via WhatsApp</button>
          <p className="text-center text-xs text-muted-foreground">Your message opens in WhatsApp, ready to send to the shop.</p>
          <p className="text-center text-sm">Group of 10+? <Link to="/" hash="group" className="font-semibold text-primary">Book a group visit</Link> · <Link to="/products" className="font-semibold text-primary">Menu</Link> · <Link to="/about" className="font-semibold text-primary">About</Link></p>
        </form>
      </section>
      <Faq items={FAQ} />
    </Page>
  );
}
