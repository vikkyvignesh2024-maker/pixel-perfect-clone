import { useState, type FormEvent } from "react";
import { MessageCircle, Instagram, Coffee } from "lucide-react";
import soup from "@/assets/mudavattu-soup.webp.asset.json";
import { Button } from "@/components/ui/button";
import { BIZ, waLink, isValidIndianPhone } from "@/lib/site";

export function KilanguOrder() {
  return (
    <section id="kilangu" className="scroll-mt-24 bg-forest text-cream">
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="reveal overflow-hidden rounded-2xl shadow-lift">
          <img src={soup.url} alt="Mudavattu Kilangu soup alongside the raw tubers" width={800} height={800} loading="lazy" className="aspect-square w-full object-contain" />
        </div>
        <div className="reveal">
          <p className="eyebrow">Our local speciality</p>
          <h2 className="mt-2 text-4xl font-bold md:text-5xl">Mudavattu Kilangu Soup</h2>
          <p className="mt-5 text-cream/85">Enjoy Mudavattu Kilangu in a warm, savoury soup — a comforting taste of the hills for your Yercaud snack break.</p>
          <p className="mt-6 flex items-center gap-2 text-xl font-semibold text-gold"><Coffee className="h-5 w-5" />Serving: {BIZ.soupServingCups} cup</p>
          <ul className="mt-6 space-y-3 text-cream/85">
            <li>A warming choice for cool hill-station weather.</li>
            <li>A savoury way to enjoy a traditional local ingredient.</li>
            <li>A comforting pause alongside your tea-time favourites.</li>
          </ul>
          <p className="mt-5 text-xs text-cream/70">Enjoyed for its flavour and tradition. No medical or nutritional benefits are claimed; ask us about ingredients before ordering if you have allergies or dietary needs.</p>
          <Button asChild size="lg" className="mt-8 h-auto whitespace-normal py-3 text-center"><a href={waLink("Hello MP Snacks & Bites, I'd like to enquire about one cup of Mudavattu Kilangu soup. Please confirm the price, ingredients and availability.")} target="_blank" rel="noopener noreferrer"><MessageCircle />Enquire about soup</a></Button>
          <div className="mt-8 border-t border-cream/20 pt-6">
            <h3 className="text-xl font-bold text-gold">Raw Mudavattu Kilangu</h3>
            <p className="mt-2 text-sm text-cream/80">Want to prepare it at home? Contact us for updated product details, current pricing and availability.</p>
            <a href={waLink("Hello MP Snacks & Bites, please share updated details, current price and availability for raw Mudavattu Kilangu.")} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-semibold text-gold"><MessageCircle className="h-4 w-4" />Ask about raw Kilangu</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StayEnquiries() {
  return (
    <section className="bg-muted">
      <div className="container-x grid items-center gap-8 py-16 md:grid-cols-[1fr_auto]">
        <div className="reveal">
          <p className="eyebrow">Stay in Yercaud</p>
          <h2 className="mt-2 text-3xl font-bold text-forest md:text-4xl">Rooms &amp; Cottages</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Looking for a room or cottage to stay in Yercaud? DM us on Instagram for more details and bookings!</p>
        </div>
        <Button asChild size="lg" className="h-auto whitespace-normal py-4 text-center"><a href={BIZ.instagram} target="_blank" rel="noopener noreferrer"><Instagram />DM @mp.snacks_2025</a></Button>
      </div>
    </section>
  );
}

type Errs = Partial<Record<string, string>>;

export function GroupOrderForm() {
  const [errs, setErrs] = useState<Errs>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as { name: string; phone: string; date: string; time: string; people: string; snacks: string; notes: string };
    const n: Errs = {};
    if (!f.name?.trim()) n.name = "Please enter your name.";
    if (!isValidIndianPhone(f.phone || "")) n.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!f.date) n.date = "Choose your visit date.";
    if (!f.time) n.time = "Choose an estimated arrival time.";
    if (!(Number(f.people) >= BIZ.groupMin)) n.people = `Group orders need at least ${BIZ.groupMin} people.`;
    setErrs(n);
    if (Object.keys(n).length) return;
    const msg = `Hello MP Snacks & Bites, I'd like to enquire about a group order.\nName: ${f.name}\nPhone: ${f.phone}\nDate: ${f.date}\nArrival: ${f.time}\nPeople: ${f.people}\nPreferred snacks: ${f.snacks || "-"}\nRequests: ${f.notes || "-"}\nPlease confirm.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };
  const err = (k: string) => errs[k] && <p className="mt-1 text-sm text-destructive">{errs[k]}</p>;
  const label = "mb-1 block text-sm font-medium text-forest";
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-card p-6 shadow-lift sm:grid-cols-2 md:p-8">
      <div><label className={label} htmlFor="g-name">Name *</label><input id="g-name" name="name" className="field" />{err("name")}</div>
      <div><label className={label} htmlFor="g-phone">Phone *</label><input id="g-phone" name="phone" type="tel" className="field" placeholder="10-digit mobile" />{err("phone")}</div>
      <div><label className={label} htmlFor="g-date">Date of visit *</label><input id="g-date" name="date" type="date" className="field" />{err("date")}</div>
      <div><label className={label} htmlFor="g-time">Arrival time *</label><input id="g-time" name="time" type="time" className="field" />{err("time")}</div>
      <div><label className={label} htmlFor="g-people">Number of people *</label><input id="g-people" name="people" type="number" min={10} className="field" placeholder="10 or more" />{err("people")}</div>
      <div><label className={label} htmlFor="g-snacks">Preferred snacks</label><input id="g-snacks" name="snacks" className="field" placeholder="Bajji, chai, Maggi…" /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="g-notes">Additional requests</label><textarea id="g-notes" name="notes" rows={3} className="field" /></div>
      <div className="sm:col-span-2">
        <button className="btn btn-primary w-full"><MessageCircle className="h-5 w-5" />Send enquiry on WhatsApp</button>
        <p className="mt-3 text-center text-xs text-muted-foreground">Your booking is not confirmed automatically — the shop will reply to confirm.</p>
      </div>
    </form>
  );
}

export function GroupOrders() {
  return (
    <section id="group" className="scroll-mt-24 bg-muted">
      <div className="container-x grid items-start gap-12 py-20 lg:grid-cols-2">
        <div className="reveal lg:sticky lg:top-28">
          <p className="eyebrow">Groups &amp; families</p>
          <h2 className="mt-2 text-4xl font-bold text-forest">Planning a Family Outing or Group Visit?</h2>
          <p className="mt-4 text-muted-foreground">Make your Yercaud snack stop part of the plan. Contact MP Snacks &amp; Bites for group and family orders.</p>
          <p className="mt-6 inline-block rounded-full bg-primary/15 px-4 py-2 font-semibold text-primary">Minimum 10 people</p>
        </div>
        <div className="reveal"><GroupOrderForm /></div>
      </div>
    </section>
  );
}
