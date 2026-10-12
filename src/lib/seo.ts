export const seo = (title: string, description: string, path: string, ld: object[]) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: `https://example.com${path}` }],
  scripts: ld.map((o) => ({ type: "application/ld+json", children: JSON.stringify(o) })),
});
