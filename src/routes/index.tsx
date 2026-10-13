import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Coffee, MapPin, Users, Phone, Leaf, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import chai from "@/assets/chai.jpg";
import gobi from "@/assets/gobi.jpg";
import maggi from "@/assets/maggi.jpg";
import corn from "@/assets/corn.jpg";
import soupAsset from "@/assets/mudavattu-soup.webp.asset.json";
import appalam from "@/assets/delhi-appalam.jpg";
const soup = soupAsset.url;
import omelette from "@/assets/omelette.jpg";

import { Page, Faq, faqLd, SectionTitle } from "@/components/site/Shell";
import { KilanguOrder, GroupOrders, StayEnquiries } from "@/components/site/Ordering";
import { BIZ, breadcrumbLd, localBusinessLd } from "@/lib/site";
import { seo } from "@/lib/seo";

const FAQ: [string, string][] = [
  ["Where is MP Snacks & Bites located?", `We're at ${BIZ.address}. Tap "Get Directions" for Google Maps.`],
  ["What snacks can I explore on the website?", "Bajji varieties, cauliflower chilli, plain and egg Maggi, bread omelette, sweet corn, onion bakkoda, Delhi Appalam, chai and coffee."],
  ["What is Mudavattu Kilangu?", "A traditional local ingredient associated with the flavours of the Yercaud region, which you can take home and prepare."],
  ["How much does Mudavattu Kilangu cost?", "Ask the shop for current soup and raw Kilangu prices. Soup is served as one cup."],
  ["Can families or groups place orders?", "Yes — group and family orders are welcome for 10 people or more. Send an enquiry and the shop will confirm."],
  ["How can I contact the shop?", `Call or WhatsApp ${BIZ.phone}.`],
];

export const Route = createFileRoute("/")({
  head: () => seo("MP Snacks & Bites Yercaud — Hot Snacks & Chai", "Snacks shop in Yercaud serving hot bajji, cauliflower chilli, chai Delhi Appalam and Mudavattu Kilangu soup. Group orders welcome.", "/", [localBusinessLd, breadcrumbLd([{ name: "Home", path: "/" }]), faqLd(FAQ)]),
  component: Home,
});

const highlights = [
  [Flame, "Fresh Snacks", "Crispy favourites prepared hot."],
  [Coffee, "Chai-Time Comfort", "The perfect cup for cool hills."],
  [MapPin, "Yercaud Location", "At Ondikadai, Waterfront Hotel."],
  [Users, "Group Orders", "Families & groups of 10+."],
] as const;

const popular = [
  ["Bajji Varieties", chai], ["Cauliflower Chilli", gobi], ["Egg Maggi", maggi], ["Delhi Appalam", appalam],
] as const;

function Home() {
  return (
    <Page>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="eyebrow">A taste of Yercaud</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] text-forest md:text-7xl">Hot Snacks.<br /><span className="text-primary">Cool Yercaud.</span></h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">Freshly prepared snacks, comforting chai, and local flavours made for your Yercaud moments.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary">Explore Our Menu</Link>
              <Link to="/products" hash="kilangu" className="btn btn-outline text-forest">Try Mudavattu Kilangu Soup</Link>
            </div>
            <p className="mt-8 text-sm font-medium text-brown/80">Tea-time favourites • Freshly prepared snacks • Group orders welcome</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img src={hero} alt="Chai, bajji, onion bakkoda, cauliflower chilli and sweet corn overlooking the Yercaud hills" width={1280} height={1024} className="hero-drift aspect-[5/4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-card px-5 py-3 shadow-soft md:-left-8">
              <Leaf className="h-6 w-6 text-forest" /><div><p className="text-xs text-muted-foreground">Mudavattu Kilangu Soup</p><p className="font-bold text-primary">One cup of comfort</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-x pb-20 pt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(([Icon, t, d]) => (
            <div key={t} className="reveal card-lift rounded-2xl bg-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-cream"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-xl font-bold text-forest">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <KilanguOrder />

      {/* Popular */}
      <section className="container-x py-20">
        <SectionTitle eyebrow="Popular snacks" title="Tea-Time Favourites" text="Crispy, spicy and comforting — explore what visitors love." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map(([n, img]) => (
            <Link to="/products" key={n} className="reveal card-lift group overflow-hidden rounded-2xl bg-card">
              <img src={img} alt={n} width={912} height={736} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <p className="p-5 font-display text-xl font-bold text-forest">{n}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/products" className="btn btn-outline text-forest">See full menu</Link></div>
      </section>

      {/* Chai */}
      <section className="bg-muted">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
          <div className="reveal order-2 lg:order-1">
            <p className="eyebrow">For chai lovers</p>
            <h2 className="mt-2 text-4xl font-bold text-forest md:text-5xl">Every Great Snack Deserves a Cup of Chai</h2>
            <p className="mt-5 text-muted-foreground">Take a break, enjoy your favourite tea-time snacks, and make your Yercaud visit a little more memorable.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary">Explore Snacks</Link>
              <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-forest">Find Our Shop</a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Menu availability can vary — call {BIZ.phone} to check what's fresh today.</p>
          </div>
          <img src={chai} alt="Steaming chai with crispy bajji and onion bakkoda" width={1024} height={1024} loading="lazy" className="reveal order-1 aspect-square w-full rounded-[2rem] object-cover shadow-lift lg:order-2" />
        </div>
      </section>

      <StayEnquiries />

      <GroupOrders />

      {/* Why */}
      <section className="bg-forest-deep text-cream">
        <div className="container-x py-20">
          <SectionTitle light eyebrow="Why us" title="Why Choose MP Snacks & Bites?" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[["Freshly prepared", "Snacks made hot, the way tea-time should be."], ["A local speciality", "Mudavattu Kilangu, a taste linked to the Yercaud region."], ["Easy to reach", "Order, enquire and get directions in a tap."]].map(([t, d]) => (
              <div key={t} className="reveal rounded-2xl border border-cream/15 p-6"><h3 className="text-2xl font-bold text-gold">{t}</h3><p className="mt-2 text-cream/80">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-x py-20">
        <SectionTitle eyebrow="Gallery" title="A Taste of the Hills" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[[hero, "Snack spread with hill view"], [soup, "Mudavattu Kilangu soup"], [appalam, "Delhi Appalam"], [omelette, "Bread omelette"], [gobi, "Cauliflower chilli"], [corn, "Sweet corn"], [maggi, "Egg Maggi"], [chai, "Chai and bajji"]].map(([s, a], i) => (
            <img key={a} src={s} alt={a} loading="lazy" width={600} height={600} className={`reveal h-full w-full rounded-2xl object-cover ${i === 0 ? "md:col-span-2 md:row-span-2" : "aspect-square"}`} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-muted">
        <div className="container-x py-20 text-center">
          <SectionTitle eyebrow="Reviews" title="Visited Us? Share Your Experience" text="We'd love to hear about your snack stop. Real customer reviews will appear here — leave yours on Google Maps." />
          <div className="mt-6 flex justify-center gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}</div>
          <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">Review us on Google</a>
        </div>
      </section>

      {/* Location */}
      <section className="container-x py-20">
        <div className="reveal grid gap-8 rounded-3xl bg-forest p-8 text-cream md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="mt-2 text-3xl font-bold">Ondikadai, Yercaud</h2>
            <p className="mt-4 text-cream/85">{BIZ.address}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <a href={BIZ.maps} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MapPin className="h-4 w-4" />Get Directions</a>
            <a href={`tel:${BIZ.phone}`} className="btn btn-outline"><Phone className="h-4 w-4" />Call {BIZ.phone}</a>
          </div>
        </div>
      </section>

      <Faq items={FAQ} />

      <section className="container-x pb-20 text-center">
        <h2 className="reveal text-4xl font-bold text-forest">Your favourite chai and snack stop in the hills.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/products" className="btn btn-primary">Explore Our Menu</Link>
          <Link to="/about" className="btn btn-outline text-forest">Our Story</Link>
        </div>
      </section>
    </Page>
  );
}
