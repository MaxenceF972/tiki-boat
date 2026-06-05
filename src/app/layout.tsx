import type { Metadata } from "next";
import "./globals.css";

const BASE = "https://tiki-boat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Tiki Boat — Excursions en bateau en Guadeloupe",
    template: "%s | Tiki Boat Guadeloupe",
  },
  description:
    "Excursions en bateau en Guadeloupe : croisière journée Grand Cul de Sac Marin, coucher de soleil, privatisation. Snorkeling, repas créole, îlets. Réservez en ligne — à partir de 55 €.",
  keywords: [
    "excursion bateau Guadeloupe",
    "croisière Guadeloupe",
    "sortie bateau Guadeloupe",
    "Tiki Boat Guadeloupe",
    "Grand Cul de Sac Marin",
    "snorkeling Guadeloupe",
    "excursion mer Guadeloupe",
    "activité nautique Guadeloupe",
    "croisière coucher de soleil Guadeloupe",
    "privatisation bateau Guadeloupe",
    "excursion Pointe-à-Pitre",
    "îlets Guadeloupe bateau",
    "sortie snorkeling Guadeloupe",
    "croisière îlets Guadeloupe",
    "bateau excursion antilles",
    "activité en mer Guadeloupe",
    "excursion famille Guadeloupe",
    "location bateau Guadeloupe",
  ],
  authors: [{ name: "Tiki Boat", url: BASE }],
  creator: "Tiki Boat",
  publisher: "Tiki Boat",
  category: "travel",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Tiki Boat — Excursions en bateau en Guadeloupe",
    description:
      "Croisière journée, coucher de soleil, privatisation. Snorkeling, îlets, repas créole. À partir de 55 €. Réservez en ligne.",
    url: BASE,
    siteName: "Tiki Boat",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tiki Boat — Excursions en bateau en Guadeloupe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiki Boat — Excursions en bateau en Guadeloupe",
    description:
      "Croisière journée, coucher de soleil, privatisation. Snorkeling, îlets, repas créole. À partir de 55 €.",
    images: ["/og-image.jpg"],
    site: "@tikiboadguadeloupe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "TouristInformationCenter"],
      "@id": `${BASE}/#business`,
      name: "Tiki Boat",
      alternateName: "Tiki Boat Guadeloupe",
      description:
        "Excursions en bateau en Guadeloupe : croisière journée Grand Cul de Sac Marin, coucher de soleil, privatisation. Snorkeling, repas créole, îlets Caret, barrière de corail.",
      url: BASE,
      telephone: "+590690495848",
      email: "tikiboatguadeloupe@gmail.com",
      image: `${BASE}/logo.png`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.png`,
      },
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Carte bancaire, Virement, PayPal",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Marina de Pointe-à-Pitre",
        addressLocality: "Pointe-à-Pitre",
        addressRegion: "Guadeloupe",
        postalCode: "97110",
        addressCountry: "GP",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 16.2388,
        longitude: -61.5417,
      },
      areaServed: {
        "@type": "Place",
        name: "Guadeloupe",
        geo: {
          "@type": "GeoShape",
          name: "Guadeloupe",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Excursions en bateau en Guadeloupe",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Croisière Grand Cul de Sac Marin",
              url: `${BASE}/excursions/grand-cul-de-sac-marin`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Croisière Coucher de Soleil",
              url: `${BASE}/excursions/coucher-de-soleil`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "TouristTrip",
              name: "Privatisation du Bateau",
              url: `${BASE}/excursions/privatisation`,
            },
          },
        ],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
          ],
          opens: "07:00",
          closes: "20:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/tikiboadguadeloupe",
        "https://www.instagram.com/tikiboadguadeloupe",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      name: "Tiki Boat",
      url: BASE,
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/excursions?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
