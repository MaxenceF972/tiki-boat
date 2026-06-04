import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding excursions...");

  const excursions = [
    {
      slug: "grand-cul-de-sac-marin",
      title: "Croisière Grand Cul de Sac Marin",
      subtitle: "Journée complète inoubliable",
      description:
        "Embarquez pour une journée extraordinaire dans le plus grand lagon des petites Antilles. Découvrez les magnifiques fonds marins grâce au fond de verre du bateau, snorkeling en cœur de Parc National, repas créole les pieds dans l'eau autour de notre bar flottant unique.",
      duration: "Journée complète",
      departureTime: "08h00",
      returnTime: "17h00",
      departurePoint: "Marina de Pointe-à-Pitre / Le Gosier",
      maxPassengers: 12,
      priceAdult: 95,
      priceChild: 55,
      pricePrivate: null,
      included: JSON.stringify([
        "Transport bateau aller-retour",
        "Fond de verre (visite des coraux)",
        "Masque, tuba et palmes",
        "Apéritif de bienvenue",
        "Repas créole complet (100% produits frais)",
        "Boissons",
        "Guide naturaliste",
      ]),
      notIncluded: JSON.stringify(["Transport jusqu'au point de départ", "Pourboires"]),
      highlights: JSON.stringify([
        "Fonds marins avec fond de verre",
        "Îlets Caret, Fajou, la Biche, îlet aux oiseaux",
        "Barrière de corail",
        "Plus grand lagon des petites Antilles",
        "Visite d'une épave",
        "Mangrove & rivière salée",
        "Bar flottant unique aux Antilles",
        "Adapté bébés & séniors",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800",
        "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800",
      ]),
      youtubeId: "gNaCNE7808o",
      badge: "Coup de cœur",
      popular: true,
      isActive: true,
      sortOrder: 0,
    },
    {
      slug: "coucher-de-soleil",
      title: "Croisière Coucher de Soleil",
      subtitle: "Une soirée magique en mer",
      description:
        "Laissez-vous séduire par les couleurs enflammées du coucher de soleil sur le lagon des Antilles. Une croisière romantique et apaisante, accompagnée de cocktails et d'une ambiance musicale créole.",
      duration: "3 heures",
      departureTime: "17h00",
      returnTime: "20h00",
      departurePoint: "Marina de Pointe-à-Pitre / Le Gosier",
      maxPassengers: 12,
      priceAdult: 55,
      priceChild: 30,
      pricePrivate: null,
      included: JSON.stringify([
        "Transport bateau",
        "Cocktails de bienvenue",
        "Planches apéritives créoles",
        "Ambiance musicale",
      ]),
      notIncluded: JSON.stringify(["Transport jusqu'au point de départ"]),
      highlights: JSON.stringify([
        "Vue panoramique sur le coucher de soleil",
        "Cocktails tropicaux",
        "Ambiance romantique",
        "Idéal pour les couples",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
      ]),
      youtubeId: null,
      badge: "Romantique",
      popular: false,
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: "privatisation",
      title: "Privatisation du Bateau",
      subtitle: "Votre événement sur mesure",
      description:
        "Réservez le Tiki Boat en exclusivité pour vos événements privés : anniversaire, EVJF/EVG, mariage, team building entreprise, ou sunset privé. Nous créons l'expérience parfaite selon vos souhaits.",
      duration: "Sur mesure",
      departureTime: "Au choix",
      returnTime: "Au choix",
      departurePoint: "Au choix",
      maxPassengers: 12,
      priceAdult: 0,
      priceChild: 0,
      pricePrivate: 800,
      included: JSON.stringify([
        "Bateau en exclusivité",
        "Capitaine et équipage",
        "Programme personnalisé",
        "Décorations sur demande",
        "Repas/boissons personnalisés",
      ]),
      notIncluded: JSON.stringify(["Options spéciales sur devis"]),
      highlights: JSON.stringify([
        "Anniversaire",
        "EVJF / EVG",
        "Mariage",
        "Team building",
        "Sunset privé",
        "Sur mesure",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      ]),
      youtubeId: null,
      badge: "Sur mesure",
      popular: false,
      isActive: true,
      sortOrder: 2,
    },
  ];

  for (const exc of excursions) {
    await prisma.excursion.upsert({
      where: { slug: exc.slug },
      update: exc,
      create: exc,
    });
  }

  console.log("✓ Excursions seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
