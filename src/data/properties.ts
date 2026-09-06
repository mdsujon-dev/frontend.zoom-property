/**
 * Demo listing data. Shaped like a real API response — every field the UI
 * renders exists here, nothing is computed in a component.
 */

export type Purpose = "sale" | "rent";

export type PropertyType =
  | "apartment"
  | "duplex"
  | "house"
  | "commercial"
  | "land";

export interface Property {
  id: string;
  slug: string;
  title: string;
  /** Neighbourhood, e.g. "Gulshan 2". */
  area: string;
  city: string;
  purpose: Purpose;
  type: PropertyType;
  /** Sale price, or monthly rent when `purpose` is "rent". Always BDT. */
  price: number;
  beds: number;
  baths: number;
  /** Covered area in sq ft. */
  size: number;
  /** Land size in katha — only meaningful for houses and land. */
  katha?: number;
  floor?: string;
  /** First image is the card image; the rest feed the card's carousel. */
  images: string[];
  badge?: "New" | "Featured" | "Exclusive" | "Verified" | "Price drop";
  /** RAJUK approval is the first thing a buyer here asks about. */
  rajukApproved: boolean;
  hasVirtualTour?: boolean;
  furnishing: "Unfurnished" | "Semi-furnished" | "Fully furnished";
  handover: string;
  agentId: string;
  amenities: string[];
}

const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const properties: Property[] = [
  {
    id: "baridhara-royal-penthouse",
    slug: "royal-penthouse-baridhara-diplomatic",
    title: "The Diplomatic Crown Penthouse",
    area: "Baridhara Diplomatic",
    city: "Dhaka",
    purpose: "sale",
    type: "duplex",
    price: 115_000_000, // ৳11.5 Crore
    beds: 5,
    baths: 6,
    size: 5850,
    floor: "14th & 15th (Top)",
    images: [
      photo("photo-1600596542815-ffad4c1539a9"),
      photo("photo-1600607687939-ce8a6c25118c"),
      photo("photo-1613490493576-7fde63acd811"),
    ],
    badge: "Exclusive",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Fully furnished",
    handover: "Ready",
    agentId: "nusrat-jahan",
    amenities: ["Private infinity pool", "Direct lift key", "360° lake view", "4 parking", "Butler quarters"],
  },
  {
    id: "gulshan-lake-view",
    slug: "lake-view-residence-gulshan-2",
    title: "Lake View Residence",
    area: "Gulshan 2",
    city: "Dhaka",
    purpose: "sale",
    type: "apartment",
    price: 42_500_000,
    beds: 4,
    baths: 4,
    size: 3240,
    floor: "9th of 12",
    images: [
      photo("photo-1600596542815-ffad4c1539a9"),
      photo("photo-1600607687939-ce8a6c25118c"),
      photo("photo-1600566753190-17f0baa2a6c3"),
    ],
    badge: "Featured",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Semi-furnished",
    handover: "Ready",
    agentId: "nusrat-jahan",
    amenities: ["Lake view", "2 parking", "Gym", "Rooftop garden", "Generator"],
  },
  {
    id: "banani-sky-duplex",
    slug: "sky-duplex-banani-block-f",
    title: "Sky Duplex Residence",
    area: "Banani Block F",
    city: "Dhaka",
    purpose: "sale",
    type: "duplex",
    price: 68_000_000,
    beds: 5,
    baths: 5,
    size: 4720,
    floor: "11th–12th",
    images: [
      photo("photo-1613490493576-7fde63acd811"),
      photo("photo-1600585152220-90363fe7e115"),
      photo("photo-1600047509807-ba8f99d2cdde"),
    ],
    badge: "Exclusive",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Fully furnished",
    handover: "Ready",
    agentId: "tanvir-ahmed",
    amenities: ["Private lift", "Terrace", "3 parking", "Pool", "Concierge"],
  },
  {
    id: "dhanmondi-heritage",
    slug: "heritage-court-dhanmondi-27",
    title: "Heritage Court Suite",
    area: "Dhanmondi 27",
    city: "Dhaka",
    purpose: "sale",
    type: "apartment",
    price: 24_800_000,
    beds: 3,
    baths: 3,
    size: 2150,
    floor: "5th of 8",
    images: [
      photo("photo-1600585154340-be6161a56a0c"),
      photo("photo-1600607687920-4e2a09cf159d"),
      photo("photo-1600210492493-0946911123ea"),
    ],
    badge: "New",
    rajukApproved: true,
    hasVirtualTour: false,
    furnishing: "Unfurnished",
    handover: "Mar 2027",
    agentId: "farhana-rahman",
    amenities: ["Corner unit", "1 parking", "Community hall", "Lift backup"],
  },
  {
    id: "bashundhara-family-home",
    slug: "courtyard-house-bashundhara-block-i",
    title: "Courtyard Villa Estate",
    area: "Bashundhara Block I",
    city: "Dhaka",
    purpose: "sale",
    type: "house",
    price: 95_000_000,
    beds: 6,
    baths: 6,
    size: 6100,
    katha: 5,
    images: [
      photo("photo-1600585154526-990dced4db0d"),
      photo("photo-1600566752355-35792bedcfea"),
      photo("photo-1600573472550-8090b5e0745e"),
    ],
    badge: "Exclusive",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Unfurnished",
    handover: "Ready",
    agentId: "tanvir-ahmed",
    amenities: ["5 katha land", "Garden", "4 parking", "Servant quarters"],
  },
  {
    id: "uttara-sector-4",
    slug: "meadow-apartments-uttara-sector-4",
    title: "Meadow Apartments",
    area: "Uttara Sector 4",
    city: "Dhaka",
    purpose: "sale",
    type: "apartment",
    price: 15_900_000,
    beds: 3,
    baths: 2,
    size: 1620,
    floor: "6th of 10",
    images: [
      photo("photo-1560448204-e02f11c3d0e2"),
      photo("photo-1560185007-cde436f6a4d0"),
      photo("photo-1554995207-c18c203602cb"),
    ],
    badge: "Price drop",
    rajukApproved: true,
    hasVirtualTour: false,
    furnishing: "Unfurnished",
    handover: "Ready",
    agentId: "farhana-rahman",
    amenities: ["South facing", "1 parking", "Playground", "Mosque nearby"],
  },
  {
    id: "baridhara-diplomatic",
    slug: "diplomatic-zone-residence-baridhara",
    title: "Diplomatic Enclave Residence",
    area: "Baridhara DOHS",
    city: "Dhaka",
    purpose: "rent",
    type: "apartment",
    price: 285_000,
    beds: 4,
    baths: 4,
    size: 3164,
    floor: "7th of 9",
    images: [
      photo("photo-1502672260266-1c1ef2d93688"),
      photo("photo-1493809842364-78817add7ffb"),
      photo("photo-1512917774080-9991f1c4c750"),
    ],
    badge: "Verified",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Fully furnished",
    handover: "Available now",
    agentId: "nusrat-jahan",
    amenities: ["Embassy zone", "2 parking", "Standby generator", "Gym"],
  },
  {
    id: "gulshan-office",
    slug: "avenue-office-floor-gulshan-1",
    title: "Gulshan Avenue Commercial Floor",
    area: "Gulshan 1",
    city: "Dhaka",
    purpose: "rent",
    type: "commercial",
    price: 650_000,
    beds: 0,
    baths: 4,
    size: 5120,
    floor: "4th of 14",
    images: [
      photo("photo-1497366754035-f200968a6e72"),
      photo("photo-1497366811353-6870744d04b2"),
      photo("photo-1524758631624-e2822e304c36"),
    ],
    badge: "Featured",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Semi-furnished",
    handover: "Available now",
    agentId: "imran-hossain",
    amenities: ["Avenue facing", "12 parking", "Central AC", "High-speed lifts x4"],
  },
  {
    id: "chattogram-hill",
    slug: "hillcrest-apartments-khulshi",
    title: "Hillcrest Luxury Suites",
    area: "Khulshi Hills",
    city: "Chattogram",
    purpose: "sale",
    type: "apartment",
    price: 19_800_000,
    beds: 3,
    baths: 3,
    size: 2150,
    floor: "8th of 10",
    images: [
      photo("photo-1580587771525-78b9dba3b914"),
      photo("photo-1570129477492-45c003edd2be"),
      photo("photo-1449844908441-8829872d2607"),
    ],
    badge: "New",
    rajukApproved: true,
    hasVirtualTour: false,
    furnishing: "Unfurnished",
    handover: "Dec 2026",
    agentId: "farhana-rahman",
    amenities: ["Hill view", "1 parking", "Rooftop infinity deck", "Solar backup"],
  },
];

export const featuredProperties = properties.filter(
  (property) => property.badge === "Featured" || property.badge === "Exclusive",
);

export function propertiesByPurpose(purpose: Purpose) {
  return properties.filter((property) => property.purpose === purpose);
}

export const propertyTypes: { value: PropertyType; label: string; count: number }[] = [
  { value: "apartment", label: "Apartments", count: 8420 },
  { value: "duplex", label: "Duplexes & Penthouses", count: 612 },
  { value: "house", label: "Independent Houses", count: 1180 },
  { value: "commercial", label: "Commercial Floors", count: 2340 },
  { value: "land", label: "Residential Plots", count: 760 },
];
