/**
 * Neighbourhood entry points. Every property portal here buries location
 * behind a dropdown; people actually search by area name first, so it gets a
 * section of its own with real counts and a median price to anchor expectations.
 */

export interface Area {
  id: string;
  name: string;
  city: string;
  listings: number;
  /** Median asking price for a sale listing in this area, BDT. */
  medianPrice: number;
  /** Average price per square foot, BDT */
  pricePerSqft: number;
  /** Estimated annual gross rental yield */
  rentalYield: string;
  image: string;
  /** One line on why people choose it — not marketing filler. */
  note: string;
  securityTier: string;
  metroConnectivity?: string;
}

const photo = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const areas: Area[] = [
  {
    id: "gulshan",
    name: "Gulshan (1 & 2)",
    city: "Dhaka",
    listings: 1284,
    medianPrice: 42_500_000,
    pricePerSqft: 36_000,
    rentalYield: "6.8%",
    image: photo("photo-1512917774080-9991f1c4c750"),
    note: "Diplomatic zone, lakefront promenades and the shortest commute to Banani & Baridhara.",
    securityTier: "24/7 Diplomatic Police",
    metroConnectivity: "10 mins to MRT Line 6",
  },
  {
    id: "baridhara",
    name: "Baridhara DOHS & Diplomatic",
    city: "Dhaka",
    listings: 642,
    medianPrice: 65_000_000,
    pricePerSqft: 42_000,
    rentalYield: "7.4%",
    image: photo("photo-1600596542815-ffad4c1539a9"),
    note: "The most prestigious and secure enclave in Bangladesh with highest expat rental demand.",
    securityTier: "Cantonment & Diplomatic Gated",
    metroConnectivity: "Direct access to Airport Expressway",
  },
  {
    id: "banani",
    name: "Banani (Blocks A–I)",
    city: "Dhaka",
    listings: 962,
    medianPrice: 32_500_000,
    pricePerSqft: 28_500,
    rentalYield: "7.1%",
    image: photo("photo-1493809842364-78817add7ffb"),
    note: "Michelin-standard dining and corporate HQs downstairs, tranquil residential lanes behind.",
    securityTier: "Banani Society CCTV Network",
    metroConnectivity: "Banani Station on Elevated Expressway",
  },
  {
    id: "dhanmondi",
    name: "Dhanmondi Lakeside",
    city: "Dhaka",
    listings: 1147,
    medianPrice: 24_000_000,
    pricePerSqft: 21_000,
    rentalYield: "6.2%",
    image: photo("photo-1502672260266-1c1ef2d93688"),
    note: "Elite English-medium schools, specialized hospitals, cultural heritage and Dhanmondi Lake.",
    securityTier: "Community Patrol & Lake Security",
    metroConnectivity: "MRT Line 6 Farmgate feeder",
  },
  {
    id: "bashundhara",
    name: "Bashundhara R/A",
    city: "Dhaka",
    listings: 1806,
    medianPrice: 18_500_000,
    pricePerSqft: 15_500,
    rentalYield: "6.5%",
    image: photo("photo-1449844908441-8829872d2607"),
    note: "Master-planned blocks (A to P), 120-ft boulevards, top private universities and Evercare Hospital.",
    securityTier: "Bashundhara Group Security",
    metroConnectivity: "Direct 300-ft Purbachal Expressway",
  },
  {
    id: "khulshi",
    name: "Khulshi Hills",
    city: "Chattogram",
    listings: 428,
    medianPrice: 19_800_000,
    pricePerSqft: 16_800,
    rentalYield: "6.4%",
    image: photo("photo-1580587771525-78b9dba3b914"),
    note: "Elevated green hill vistas, port-executive residences, and the calmest tree-lined avenues.",
    securityTier: "Khulshi Police Outpost & Gated",
    metroConnectivity: "Direct access to CDA Avenue",
  },
];
