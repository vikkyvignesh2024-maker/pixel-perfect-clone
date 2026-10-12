import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import chai from "@/assets/chai.jpg";
import { Page, PageHero, Faq, faqLd } from "@/components/site/Shell";
import { BIZ, breadcrumbLd, localBusinessLd } from "@/lib/site";
import { seo } from "@/lib/seo";

const FAQ: [string, string][] = [
  ["What is MP Snacks & Bites?", "A tea and snacks stop in Yercaud serving hot snacks, chai and the local speciality Mudavattu Kilangu."],
  ["Where is the shop located?", BIZ.address],
  ["What type of food is featured?", "Indian tea-time snacks like bajji, onion bakkoda, cauliflower chilli, Maggi, bread omelette and sweet corn."],
  ["What makes the shop suitable for a tea break?", "Hot snacks and chai are a comforting match for Yercaud's cool hill weather."],
  ["Can I enquire about group orders?", "Yes, for groups of 10 or more. Use the group enquiry form on the home page or contact us."],
  ["How can I learn more about the menu?", "Visit the Products page or call us to check current availability."],
];

export const Route = createFileRoute("/about")({
  head: () => seo("About MP Snacks & Bites — Tea & Snacks in Yercaud", "The story of MP Snacks & Bites, a welcoming chai and snack stop at Ondikadai, Yercaud.", "/about", [localBusinessLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]), faqLd(FAQ)]),
  component: About,
});

function About() {
  return (
    <Page>
      <PageHero eyebrow="Our story" title="Good Snacks. Great Chai. Beautiful Yercaud." text="A local snack destination for everyone who loves comforting tea and crispy snacks." img={hero} crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]} />
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <img src={chai} alt="Chai with bajji and onion bakkoda" width={1024} height={1024} loading="lazy" className="reveal aspect-square w-full rounded-[2rem] object-cover shadow-lift" />
        <div className="reveal">
          <h2 className="text-4xl font-bold text-forest">A snack stop made for the hills</h2>
          <p className="mt-5 text-muted-foreground">MP Snacks &amp; Bites is a local snack destination for people who enjoy comforting tea, crispy snacks, and tasty food during their Yercaud visit. Whether you are passing through Ondikadai or planning a day out, it's a place to pause and warm up.</p>
          <ul className="mt-6 space-y-3 text-brown">
            {["A welcoming snack-stop experience", "Popular Indian tea-time snacks", "Comforting hot food in a hill-station setting", "Mudavattu Kilangu as a featured local speciality", "Family and group order options"].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />{t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn btn-primary">Discover Our Menu</Link>
            <Link to="/contact" className="btn btn-outline text-forest">Contact Us</Link>
          </div>
        </div>
      </section>
      <section className="bg-forest text-cream">
        <div className="container-x reveal py-16 text-center">
          <h2 className="text-3xl font-bold">Our commitment</h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream/85">We aim to make every visit friendly and relaxed — good food, a warm cup, and a happy moment in the hills. Questions about the menu? Just ask us.</p>
        </div>
      </section>
      <Faq items={FAQ} />
    </Page>
  );
}
