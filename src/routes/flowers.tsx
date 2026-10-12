import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Flower2 } from "lucide-react";
import flowers from "@/assets/flowers.jpg";
import { Page, PageHero, Faq, faqLd } from "@/components/site/Shell";
import { BIZ, breadcrumbLd, waLink } from "@/lib/site";
import { seo } from "@/lib/seo";

const FAQ: [string, string][] = [
  ["What is featured on the Flowers page?", "A preview of a flower collection we're preparing to share with visitors."],
  ["Are flowers currently available to purchase?", "The collection is coming soon. Please contact us to check."],
  ["How can I ask about flower availability?", "Send us a WhatsApp message or call the shop."],
  ["Are flower prices listed?", "Not yet — prices will be shared once the collection is confirmed."],
  ["Can I enquire through WhatsApp?", "Yes, tap the WhatsApp button on this page."],
  ["How can I contact the business?", `Call ${BIZ.phone} or visit the Contact page.`],
];

// Edit this list once the business confirms what flowers it offers.
const COLLECTION = ["Roses", "Marigolds", "Dahlias"];

export const Route = createFileRoute("/flowers")({
  head: () => seo("Flowers — Coming Soon | MP Snacks & Bites Yercaud", "A flower collection from MP Snacks & Bites in Yercaud is coming soon. Enquire on WhatsApp for details.", "/flowers", [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Flowers", path: "/flowers" }]), faqLd(FAQ)]),
  component: Flowers,
});

function Flowers() {
  return (
    <Page>
      <PageHero eyebrow="Flower collection" title="Blooms from the Hills" text="Our flower collection is coming soon. Ask us what's available." img={flowers} crumbs={[{ label: "Home", to: "/" }, { label: "Products", to: "/products" }, { label: "Flowers" }]} />
      <section className="container-x py-20">
        <img src={flowers} alt="Baskets of roses, marigolds and dahlias with misty hills behind" width={1280} height={768} loading="lazy" className="reveal w-full rounded-[2rem] object-cover shadow-lift" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {COLLECTION.map((f) => (
            <div key={f} className="reveal card-lift rounded-2xl bg-card p-8 text-center">
              <Flower2 className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-2xl font-bold text-forest">{f}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Coming soon — availability and prices to be confirmed.</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={waLink("Hello MP Snacks & Bites, I'd like to ask about your flower collection.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle className="h-4 w-4" />Ask on WhatsApp</a>
          <Link to="/contact" className="btn btn-outline text-forest">Contact Us</Link>
          <Link to="/products" className="btn btn-outline text-forest">Back to Snacks</Link>
        </div>
      </section>
      <Faq items={FAQ} />
    </Page>
  );
}
