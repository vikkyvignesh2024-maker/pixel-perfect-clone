import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, MapPin, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { BIZ, waLink } from "@/lib/site";

const nav = "text-sm font-medium text-forest hover:text-primary transition-colors";
const active = { className: "text-primary" };

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-cream/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="MP Snacks & Bites home">
          <img src={logo.url} alt="MP Snacks & Bites logo" width={56} height={56} className="h-14 w-14" />
          <span className="hidden font-display text-lg font-bold text-forest sm:block">MP Snacks &amp; Bites</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          <Link to="/" className={nav} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/about" className={nav} activeProps={active}>About Us</Link>
          <Link to="/products" className={nav} activeProps={active}>Menu</Link>
          <Link to="/contact" className={nav} activeProps={active}>Contact Us</Link>
          <Link to="/products" hash="kilangu" className="btn btn-primary py-2.5">Order Now</Link>
        </nav>
        <button className="md:hidden text-forest" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-cream md:hidden animate-in slide-in-from-top-2" aria-label="Mobile">
          <div className="container-x flex flex-col gap-1 py-4" onClick={() => setOpen(false)}>
            {([["/", "Home"], ["/about", "About Us"], ["/products", "All Products"], ["/contact", "Contact Us"]] as const).map(([to, l]) => (
              <Link key={to} to={to} className="rounded-lg px-3 py-3 font-medium text-forest hover:bg-muted" activeProps={active} activeOptions={{ exact: true }}>{l}</Link>
            ))}
            <Link to="/products" hash="kilangu" className="btn btn-primary mt-2">Order Now</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo.url} alt="MP Snacks & Bites logo" width={80} height={80} loading="lazy" className="h-20 w-20" />
          <p className="mt-4 font-display text-2xl">Hot Snacks. Cool Yercaud.</p>
          <p className="mt-2 max-w-sm text-sm text-cream/70">Your favourite chai and snack stop in the hills.</p>
        </div>
        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-gold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/products" className="hover:text-primary">Products</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-gold">Visit</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{BIZ.address}</li>
            <li><a href={`tel:${BIZ.phone}`} className="flex gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" />{BIZ.phone}</a></li>
            <li><a href={waLink("Hello MP Snacks & Bites!")} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-primary"><MessageCircle className="h-4 w-4 text-primary" />WhatsApp us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">© {new Date().getFullYear()} MP Snacks &amp; Bites, Yercaud</div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, text, img, crumbs }: { eyebrow: string; title: string; text: string; img: string; crumbs: { label: string; to?: "/" | "/products" }[] }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" width={1280} height={768} />
      <div className="relative container-x py-20 md:py-28">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-cream/80">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span aria-current="page" className="text-gold">{c.label}</span>}
            </span>
          ))}
        </nav>
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg text-cream/85">{text}</p>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <section className="container-x py-20">
      <div className="reveal mx-auto max-w-3xl">
        <p className="eyebrow text-center">Questions</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-forest md:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-3">
          {items.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border bg-card p-5 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forest">
                {q}<ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export const faqLd = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export function SectionTitle({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-bold md:text-4xl ${light ? "text-cream" : "text-forest"}`}>{title}</h2>
      {text && <p className={`mt-4 ${light ? "text-cream/80" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}
