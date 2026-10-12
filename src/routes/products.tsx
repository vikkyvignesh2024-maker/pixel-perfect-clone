import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import soup from "@/assets/soup.jpg";
import { Page, PageHero, Faq, faqLd } from "@/components/site/Shell";
import { KilanguOrder } from "@/components/site/Ordering";
import { CATEGORIES, MENU } from "@/lib/menu";
import { BIZ, breadcrumbLd, waLink } from "@/lib/site";
import { seo } from "@/lib/seo";

const FAQ: [string, string][] = [
  ["What snack items are featured?", "Bajji varieties, cauliflower chilli, Maggi, bread omelette, sweet corn, onion bakkoda, chai, coffee and Mudavattu Kilangu."],
  ["Is cauliflower chilli listed on the menu?", "Yes, cauliflower chilli is one of our chilli snacks."],
  ["Are plain and egg Maggi available?", "Both are on the menu. Please check current availability with the shop."],
  ["How can I check item prices?", `Mudavattu Kilangu is ₹150 per kg. For other items, contact us on ${BIZ.phone}.`],
  ["Can I order Mudavattu Kilangu?", "Yes — choose your quantity above and send your order enquiry on WhatsApp."],
  ["How can I ask about current availability?", "Tap any 'Enquire on WhatsApp' button or call the shop."],
];

const productLd = {
  "@context": "https://schema.org", "@type": "Product", name: "Mudavattu Kilangu",
  description: "A traditional local ingredient associated with the Yercaud region.",
  offers: { "@type": "Offer", price: "150", priceCurrency: "INR", unitText: "kg" },
};

export const Route = createFileRoute("/products")({
  head: () => seo("Menu — Bajji, Chai & Mudavattu Kilangu | MP Snacks & Bites", "Explore the snack menu: bajji, cauliflower chilli, Maggi, sweet corn, chai, and Mudavattu Kilangu at ₹150 per kg in Yercaud.", "/products", [productLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]), faqLd(FAQ)]),
  component: Products,
});

function Products() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? MENU : MENU.filter((m) => m.category === cat);
  return (
    <Page>
      <PageHero eyebrow="Our menu" title="Snacks, Chai & Local Flavours" text="Hot, crispy and comforting — everything you need for the perfect hill-station tea break." img={hero} crumbs={[{ label: "Home", to: "/" }, { label: "Products" }]} />
      <section className="container-x py-16">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter menu">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-forest bg-forest text-cream" : "bg-card text-forest hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <article key={m.name} className="card-lift group flex flex-col overflow-hidden rounded-2xl bg-card animate-in fade-in">
              <div className="overflow-hidden"><img src={m.img} alt={m.name} width={912} height={736} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{m.category}</p>
                <h3 className="mt-1 text-2xl font-bold text-forest">{m.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.desc}</p>
                <p className={`mt-4 font-semibold ${m.price ? "text-xl text-primary" : "text-sm text-muted-foreground"}`}>{m.price ?? "Contact us for price"}</p>
                {m.price
                  ? <a href="#kilangu" className="btn btn-primary mt-4">Order Now</a>
                  : <a href={waLink(`Hello MP Snacks & Bites, is ${m.name} available today? What is the price?`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-4 text-forest"><MessageCircle className="h-4 w-4" />Enquire on WhatsApp</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
      <KilanguOrder />
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <img src={soup} alt="Bowl of Mudavattu Kilangu soup with curry leaves" width={912} height={736} loading="lazy" className="reveal w-full rounded-[2rem] object-cover shadow-lift" />
        <div className="reveal">
          <p className="eyebrow">Mudavattu Kilangu soup</p>
          <h2 className="mt-2 text-4xl font-bold text-forest">A Traditional Taste to Warm Your Day</h2>
          <p className="mt-5 text-muted-foreground">Mudavattu Kilangu soup is a distinctive local food experience — a warming, flavourful bowl that feels just right in cool hill-station weather. It's a lovely way to explore traditional ingredients and the recipes built around them.</p>
          <p className="mt-4 rounded-xl bg-muted p-4 text-xs text-muted-foreground">Individual nutritional needs vary. Traditional foods are enjoyed for their taste and heritage and are not a replacement for medical treatment.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink("Hello MP Snacks & Bites, is Mudavattu Kilangu soup available today?")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ask about availability</a>
            <Link to="/flowers" className="btn btn-outline text-forest">See our Flowers page</Link>
          </div>
        </div>
      </section>
      <Faq items={FAQ} />
      <section className="container-x pb-20 text-center"><Link to="/contact" className="btn btn-primary">Questions? Contact us</Link></section>
    </Page>
  );
}
