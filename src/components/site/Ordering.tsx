import { useState, type FormEvent } from "react";
import { Minus, Plus, MessageCircle, Info } from "lucide-react";
import kilangu from "@/assets/kilangu.jpg";
import { BIZ, kilanguMessage, kilanguTotal, waLink, isValidIndianPhone } from "@/lib/site";

export function KilanguOrder() {
  const [kg, setKg] = useState(1);
  return (
    <section id="kilangu" className="scroll-mt-24 bg-forest text-cream">
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="reveal overflow-hidden rounded-3xl shadow-lift">
          <img src={kilangu} alt="Fresh Mudavattu Kilangu tubers on a banana leaf" width={1024} height={1024} loading="lazy" className="aspect-square w-full object-cover" />
        </div>
        <div className="reveal">
          <p className="eyebrow">Signature speciality</p>
          <h2 className="mt-2 text-4xl font-bold md:text-5xl">Bring Home a Taste of Yercaud</h2>
          <p className="mt-5 text-cream/85">Discover Mudavattu Kilangu, a traditional local ingredient associated with the flavours of the Yercaud region. Bring home this distinctive ingredient and explore traditional ways of preparing it.</p>
          <p className="mt-6 font-display text-5xl font-bold text-primary">₹150 <span className="font-sans text-lg font-medium text-cream/80">per kg</span></p>
          <div className="mt-8 rounded-2xl bg-forest-deep/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-sm text-cream/70">Quantity (kg)</p>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => setKg(Math.max(1, kg - 1))} className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 hover:bg-cream/10" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center text-2xl font-bold" aria-live="polite">{kg}</span>
                  <button onClick={() => setKg(Math.min(50, kg + 1))} className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 hover:bg-cream/10" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-cream/70">Subtotal</p>
                <p key={kg} className="mt-1 text-3xl font-bold text-gold animate-in fade-in zoom-in-95">₹{kilanguTotal(kg)}</p>
              </div>
            </div>
            <a href={waLink(kilanguMessage(kg))} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
              <MessageCircle className="h-5 w-5" /> Order via WhatsApp
            </a>
            <p className="mt-4 flex gap-2 text-xs text-cream/70"><Info className="h-4 w-4 shrink-0" />This is an order enquiry. The shop will confirm availability, delivery or pickup, and payment before your order is final.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type Errs = Partial<Record<string, string>>;

export function GroupOrderForm() {
  const [errs, setErrs] = useState<Errs>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
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
