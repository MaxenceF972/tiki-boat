export type Section =
  | { type: "p";  text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; text: string; href: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  coverImage: string;
  coverLabel: string;
  keywords: string[];
  content: Section[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "activites-mer-guadeloupe",
    title: "Les 5 activités en mer incontournables en Guadeloupe",
    excerpt:
      "Snorkeling, îlets, croisière coucher de soleil… La Guadeloupe regorge d'activités nautiques exceptionnelles. Voici notre sélection des 5 expériences à ne pas manquer.",
    category: "Guide",
    date: "2025-05-15",
    readTime: 6,
    coverImage: "/photos/blog-01.jpg",
    coverLabel: "Activités nautiques en Guadeloupe",
    keywords: ["activités mer Guadeloupe", "sortie mer Guadeloupe", "que faire Guadeloupe", "sports nautiques Guadeloupe"],
    content: [
      { type: "p", text: "La Guadeloupe, avec ses eaux turquoise et son lagon naturel protégé, est l'une des destinations idéales des Caraïbes pour les activités nautiques. Que vous soyez en famille, en couple ou entre amis, la mer offre ici des expériences uniques." },
      { type: "h2", text: "1. Le snorkeling dans le Grand Cul de Sac Marin" },
      { type: "p", text: "Le Grand Cul de Sac Marin est classé Parc National et abrite l'un des récifs coraliens les mieux préservés des Petites Antilles. En palmes-masque-tuba, vous côtoyez des poissons multicolores, des raies pastenagues et parfois des tortues marines. L'eau y est chaude (27-29°C), peu profonde et parfaitement transparente." },
      { type: "h2", text: "2. La visite des îlets sauvages" },
      { type: "p", text: "Le lagon de Guadeloupe compte plusieurs îlets totalement préservés, accessibles uniquement en bateau. L'îlet Caret, l'îlet Fajou, l'îlet la Biche et l'îlet aux oiseaux sont autant de petits paradis où poser l'ancre pour une baignade. Sable blanc, eaux cristallines, végétation tropicale — difficile de trouver plus beau." },
      { type: "h2", text: "3. Découvrir les fonds marins au fond de verre" },
      { type: "p", text: "Pas à l'aise avec le snorkeling ? Le fond de verre du Tiki Boat vous permet d'observer les coraux et la faune marine sans même mettre la tête sous l'eau. Une expérience idéale pour les enfants, les bébés et les personnes qui ne savent pas nager." },
      { type: "h2", text: "4. La croisière coucher de soleil" },
      { type: "p", text: "Embarquez en fin d'après-midi pour une croisière de 3 heures sur le lagon. Les couleurs du coucher de soleil guadeloupéen, avec ses teintes orangées et roses sur la mer des Caraïbes, sont absolument inoubliables. Cocktails tropicaux et planches créoles sont au programme." },
      { type: "h2", text: "5. Privatiser un bateau pour un événement" },
      { type: "p", text: "Anniversaire, EVJF, mariage, team building… Privatiser un bateau pour la journée est une façon originale et mémorable de célébrer un moment important. Le Tiki Boat peut accueillir jusqu'à 12 personnes en exclusivité, avec programme entièrement personnalisé." },
      { type: "cta", text: "Réserver une excursion", href: "/reservation" },
    ],
  },
  {
    slug: "grand-cul-de-sac-marin-guide",
    title: "Grand Cul de Sac Marin : guide complet avant de partir",
    excerpt:
      "Le Grand Cul de Sac Marin est le plus grand lagon des Petites Antilles. Faune marine, îlets, épave, mangrove — voici tout ce qu'il faut savoir avant de s'y aventurer.",
    category: "Destination",
    date: "2025-04-20",
    readTime: 7,
    coverImage: "/photos/blog-02.jpg",
    coverLabel: "Vue aérienne du Grand Cul de Sac Marin",
    keywords: ["Grand Cul de Sac Marin", "visite Grand Cul de Sac Marin", "lagon Guadeloupe", "Parc National Guadeloupe"],
    content: [
      { type: "p", text: "Situé au nord de la Grande-Terre, le Grand Cul de Sac Marin est un lagon d'environ 15 000 hectares, classé Parc National depuis 1989. C'est l'un des plus grands lagons fermés des Petites Antilles, protégé par une barrière de corail de plus de 30 km de long." },
      { type: "h2", text: "Une biodiversité exceptionnelle" },
      { type: "p", text: "Les eaux peu profondes et bien protégées du lagon abritent une faune et une flore remarquables. On y trouve des herbiers de posidonies, des mangroves, des récifs coraliens et une grande variété de poissons tropicaux. La tortue verte et la tortue imbriquée y sont régulièrement observées." },
      { type: "h2", text: "Les îlets à visiter" },
      { type: "ul", items: [
        "Îlet Caret — plage de sable blanc immaculé, parfait pour la baignade",
        "Îlet Fajou — réserve naturelle, mangrove préservée",
        "Îlet la Biche — petit îlet sauvage idéal pour le snorkeling",
        "Îlet aux Oiseaux — colonie de frégates et d'ardéidés",
      ]},
      { type: "h2", text: "L'épave et la rivière salée" },
      { type: "p", text: "Le lagon recèle une épave immergée accessible aux plongeurs et aux snorkeleurs confirmés. Non loin, la rivière salée relie le Grand Cul de Sac Marin au Petit Cul de Sac Marin, traversant une mangrove majestueuse. C'est l'un des paysages les plus singuliers de Guadeloupe." },
      { type: "h2", text: "Comment explorer le Grand Cul de Sac Marin" },
      { type: "p", text: "La seule façon sérieuse de découvrir le Grand Cul de Sac Marin est en bateau. Depuis la marina de Pointe-à-Pitre ou le Gosier, le Tiki Boat propose une croisière journée complète qui couvre l'ensemble des sites : îlets, barrière de corail, épave, mangrove et rivière salée." },
      { type: "h2", text: "Bonnes pratiques dans le Parc National" },
      { type: "ul", items: [
        "Ne pas toucher les coraux ni les animaux marins",
        "Ne pas jeter de déchets à l'eau",
        "Utiliser une crème solaire respectueuse des coraux",
        "Respecter les zones de mouillage balisées",
      ]},
      { type: "cta", text: "Voir la croisière journée", href: "/excursions/grand-cul-de-sac-marin" },
    ],
  },
  {
    slug: "snorkeling-guadeloupe",
    title: "Snorkeling en Guadeloupe : spots, conseils et tarifs",
    excerpt:
      "La Guadeloupe est l'un des meilleurs spots de snorkeling des Caraïbes. Découvrez où pratiquer, comment se préparer et pourquoi le Grand Cul de Sac Marin est le site à ne pas manquer.",
    category: "Activité",
    date: "2025-03-10",
    readTime: 5,
    coverImage: "/photos/blog-03.jpg",
    coverLabel: "Snorkeling en Guadeloupe",
    keywords: ["snorkeling Guadeloupe", "masque tuba Guadeloupe", "meilleur spot snorkeling Guadeloupe", "plongée débutant Guadeloupe"],
    content: [
      { type: "p", text: "La Guadeloupe offre des conditions de snorkeling idéales toute l'année : eau à 28°C, visibilité souvent supérieure à 15 mètres, faune marine abondante. Que vous soyez débutant ou pratiquant régulier, les fonds guadeloupéens ont de quoi vous émerveiller." },
      { type: "h2", text: "Le meilleur spot : le Grand Cul de Sac Marin" },
      { type: "p", text: "En cœur de Parc National, le Grand Cul de Sac Marin est sans conteste le site de snorkeling le plus riche de Guadeloupe. La barrière de corail y est intacte, les eaux calmes et peu profondes (2 à 5 mètres), idéales pour les débutants et les enfants. On y observe des dizaines d'espèces de poissons, des langoustes, des oursins et régulièrement des tortues." },
      { type: "h2", text: "Faut-il savoir nager pour faire du snorkeling ?" },
      { type: "p", text: "Il vaut mieux savoir nager pour se sentir à l'aise, mais ce n'est pas indispensable avec un gilet de flottaison. À bord du Tiki Boat, des équipements flottants sont disponibles. Le fond de verre du bateau permet également d'observer les coraux sans mettre la tête sous l'eau — parfait pour les plus petits." },
      { type: "h2", text: "Équipement nécessaire" },
      { type: "ul", items: [
        "Masque et tuba — fournis à bord du Tiki Boat",
        "Palmes — fournies à bord",
        "Combinaison légale (optionnelle, mais confort pour une longue séance)",
        "Crème solaire minérale (obligatoire dans le Parc National)",
      ]},
      { type: "h2", text: "Quelle période pour le snorkeling en Guadeloupe ?" },
      { type: "p", text: "Le snorkeling est praticable toute l'année en Guadeloupe. La saison sèche (décembre à mai) offre généralement une meilleure visibilité sous-marine. En saison des pluies, les averses sont courtes et l'eau reste chaude. Évitez les jours de forte houle (état de mer supérieur à 2 mètres)." },
      { type: "cta", text: "Réserver avec équipement inclus", href: "/reservation" },
    ],
  },
  {
    slug: "excursion-famille-guadeloupe",
    title: "Excursion en bateau en famille en Guadeloupe : ce qu'il faut savoir",
    excerpt:
      "Partir en mer avec des enfants en Guadeloupe, c'est possible et inoubliable. Voici tout ce que les parents doivent savoir avant de réserver une excursion en bateau en famille.",
    category: "Famille",
    date: "2025-02-08",
    readTime: 5,
    coverImage: "/photos/blog-04.jpg",
    coverLabel: "Excursion en famille en Guadeloupe",
    keywords: ["excursion famille Guadeloupe", "activité enfants Guadeloupe", "sortie bateau enfants Guadeloupe", "Guadeloupe bébé"],
    content: [
      { type: "p", text: "Partir en excursion en bateau avec des enfants en bas âge peut sembler compliqué. Pourtant, avec le bon prestataire, c'est l'une des meilleures expériences qu'une famille peut vivre en Guadeloupe. Le Tiki Boat est conçu pour accueillir toutes les générations, des nourrissons aux grands-parents." },
      { type: "h2", text: "Dès quel âge peut-on embarquer ?" },
      { type: "p", text: "Il n'y a pas d'âge minimum à bord du Tiki Boat. Les bébés embarquent gratuitement et des équipements adaptés (pare-soleil, zone ombragée) sont prévus. Les enfants de 3 à 12 ans bénéficient d'un tarif réduit. Le bateau est stable, large et sécurisé." },
      { type: "h2", text: "Quelles activités pour les enfants ?" },
      { type: "ul", items: [
        "Observation des poissons et coraux au fond de verre — sans se mouiller",
        "Snorkeling encadré par l'équipe pour les enfants à l'aise dans l'eau",
        "Baignade sur les plages des îlets",
        "Découverte de la mangrove depuis le bateau",
        "Repas créole — les enfants adorent le menu",
      ]},
      { type: "h2", text: "La sécurité à bord" },
      { type: "p", text: "Le Tiki Boat est équipé de gilets de sauvetage homologués pour toutes les tailles, y compris pour les bébés. Le capitaine est diplômé et l'équipe veille à la sécurité de tous les passagers. Le bateau navigue dans les eaux calmes et protégées du lagon, sans houle." },
      { type: "h2", text: "Conseils pratiques pour les parents" },
      { type: "ul", items: [
        "Prévoir de la crème solaire minérale (index 50+)",
        "Emporter un chapeau et des vêtements anti-UV pour les tout-petits",
        "Apporter de l'eau supplémentaire pour les bébés",
        "Repas inclus mais prévoir un goûter pour les enfants capricieux",
        "Les couches se changent facilement à bord",
      ]},
      { type: "cta", text: "Réserver en famille", href: "/reservation" },
    ],
  },
  {
    slug: "privatisation-bateau-guadeloupe",
    title: "Privatisation de bateau en Guadeloupe : EVJF, anniversaire, mariage",
    excerpt:
      "Envie d'un événement unique en mer ? Privatiser le Tiki Boat en Guadeloupe, c'est la garantie d'une journée sur mesure, inoubliable, que ce soit pour un EVJF, un anniversaire ou un mariage.",
    category: "Événement",
    date: "2025-01-22",
    readTime: 5,
    coverImage: "/photos/blog-05.jpg",
    coverLabel: "Privatisation bateau en Guadeloupe",
    keywords: ["privatisation bateau Guadeloupe", "EVJF Guadeloupe bateau", "anniversaire bateau Guadeloupe", "mariage bateau Guadeloupe", "EVG Guadeloupe"],
    content: [
      { type: "p", text: "La Guadeloupe est une destination de rêve pour organiser un événement en mer. Privatiser le Tiki Boat pour un groupe permet de bénéficier d'une exclusivité totale, d'un programme personnalisé et d'une expérience hors du commun dans le cadre exceptionnel du Grand Cul de Sac Marin." },
      { type: "h2", text: "Pour quels événements ?" },
      { type: "ul", items: [
        "EVJF / EVG — une journée folle en mer pour célébrer les futurs mariés",
        "Anniversaire — adultes comme enfants adorent naviguer en petit comité",
        "Mariage — cérémonie laïque en mer ou simple journée de fête nautique",
        "Team building entreprise — cohésion, dépaysement, convivialité garantis",
        "Sunset privé — soirée romantique pour un couple ou un petit groupe",
        "Réunion de famille — une expérience fédératrice pour tous les âges",
      ]},
      { type: "h2", text: "Ce qui est inclus dans la privatisation" },
      { type: "p", text: "En privatisation, vous bénéficiez du bateau en exclusivité pour votre groupe (jusqu'à 12 personnes). L'équipe s'adapte à vos envies : programme de navigation, arrêts baignade, repas personnalisé, décorations à bord, musique. Tout se construit ensemble en amont." },
      { type: "h2", text: "Les destinations possibles" },
      { type: "p", text: "La privatisation n'est pas limitée au Grand Cul de Sac Marin. Selon la durée choisie, il est possible de naviguer vers Les Saintes ou Marie-Galante pour une journée d'exception. N'hésitez pas à nous soumettre vos idées." },
      { type: "h2", text: "Tarifs et réservation" },
      { type: "p", text: "Le tarif de base pour une journée de privatisation commence à 800 €. Pour une soirée coucher de soleil privé, comptez à partir de 400 €. Un devis personnalisé est établi selon vos souhaits, la durée et les options choisies." },
      { type: "cta", text: "Demander un devis privatisation", href: "/contact?type=privatisation" },
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const formatBlogDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
