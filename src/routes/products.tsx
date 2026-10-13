import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Page, PageHero, Faq, faqLd } from "@/components/site/Shell";
import { KilanguOrder, StayEnquiries } from "@/components/site/Ordering";
import { CATEGORIES, MENU } from "@/lib/menu";
import { BIZ, breadcrumbLd, waLink } from "@/lib/site";
import { seo } from "@/lib/seo";

const FAQ: [string, string][] = [
  ["What snack items are featured?", "Bajji varieties, cauliflower chilli, Maggi, bread omelette, sweet corn, onion bakkoda, chai, coffee, Delhi Appalam and Mudavattu Kilangu soup."],
  ["Is cauliflower chilli listed on the menu?", "Yes, cauliflower chilli is one of our chilli snacks."],
  ["Are plain and egg Maggi available?", "Both are on the menu. Please check current availability with the shop."],
  ["How can I check item prices?", `Contact us on ${BIZ.phone} for current prices. Soup is served as one cup.`],
  ["Can I order Mudavattu Kilangu?", "Yes — enquire about soup or raw Mudavattu Kilangu on WhatsApp for current details."],
  ["How can I ask about current availability?", "Tap any 'Enquire on WhatsApp' button or call the shop."],
];

export const Route = createFileRoute("/products")({
  head: () => seo("Menu — Bajji, Chai & Mudavattu Kilangu | MP Snacks & Bites", "Explore the snack menu: bajji, cauliflower chilli, Maggi, sweet corn, chai, Delhi Appalam and one-cup Mudavattu Kilangu soup in Yercaud.", "/products", [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]), faqLd(FAQ)]),
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
            <Button variant="outline" key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-forest bg-forest text-cream" : "bg-card text-forest hover:border-primary"}`}>{c}</Button>
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
      <StayEnquiries />
      <Faq items={FAQ} />
      <section className="container-x pb-20 text-center"><Link to="/contact" className="btn btn-primary">Questions? Contact us</Link></section>
    </Page>
  );
}
