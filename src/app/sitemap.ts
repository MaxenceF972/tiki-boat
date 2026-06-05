import type { MetadataRoute } from "next";
import { excursions } from "@/data/excursions";

const BASE = "https://tikiboat.fr";

function urls(path: string) {
  return [
    BASE + path,
    BASE + "/en" + path,
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    ...urls("/").map(u => ({ url: u, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 })),
    ...urls("/excursions").map(u => ({ url: u, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 })),
    ...urls("/reservation").map(u => ({ url: u, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...urls("/avis").map(u => ({ url: u, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.75 })),
    ...urls("/galerie").map(u => ({ url: u, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.65 })),
    ...urls("/contact").map(u => ({ url: u, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];

  const excursionPages: MetadataRoute.Sitemap = excursions.flatMap((e) =>
    urls("/excursions/" + e.slug).map(u => ({
      url: u,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return [...staticPages, ...excursionPages];
}
