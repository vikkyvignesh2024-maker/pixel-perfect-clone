export const BIZ = {
  name: "MP Snacks & Bites",
  address: "Waterfront Hotel, Ondikadai, Yercaud, Tamil Nadu 636602",
  phone: "9361072656",
  wa: "919361072656",
  maps: "https://maps.app.goo.gl/KPtnh7goguHw2FhY7",
  instagram: "https://www.instagram.com/mp.snacks_2025/",
  soupServingCups: 1,
  groupMin: 10,
};

export const waLink = (msg: string) => `https://wa.me/${BIZ.wa}?text=${encodeURIComponent(msg)}`;

export const isValidIndianPhone = (p: string) => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(p.replace(/\s/g, ""));

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BIZ.name,
  telephone: "+91" + BIZ.phone,
  servesCuisine: "Indian snacks, tea",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Waterfront Hotel, Ondikadai",
    addressLocality: "Yercaud",
    addressRegion: "Tamil Nadu",
    postalCode: "636602",
    addressCountry: "IN",
  },
  hasMap: BIZ.maps,
};

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `https://example.com${it.path}` })),
});
