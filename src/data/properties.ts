/**
 * Demo listing data. Shaped like a real API response — every field the UI
 * renders exists here, nothing is computed in a component.
 */

export type Purpose = "sale" | "rent";
export type PropertyStatus = "available" | "sold";

export type PropertyType =
  | "apartment"
  | "duplex"
  | "house"
  | "commercial"
  | "land"
  | "studio"
  | "warehouse"
  | "shop"
  | "sublet"
  | "garage";

export interface Property {
  id: string;
  slug: string;
  title: string;
  /** Neighbourhood, e.g. "Gulshan 2". */
  area: string;
  city: string;
  purpose: Purpose;
  status?: PropertyStatus;
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
  /**
   * The long write-up on the listing page, one string per paragraph.
   *
   * Paragraphs rather than a single blob of HTML: the copy is written by the
   * desk, not pasted from a developer's brochure, and keeping it as data means
   * it can be translated, excerpted and searched without parsing markup.
   */
  description?: string[];
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
          photo("photo-1600210492493-0946911123ea"),
      photo("photo-1600607687920-4e2a09cf159d"),
],
    badge: "Exclusive",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Fully furnished",
    handover: "Ready",
    agentId: "nusrat-jahan",
    amenities: ["Private infinity pool", "Direct lift key", "360° lake view", "4 parking", "Butler quarters"],
    description: [
      "Two floors at the top of a Baridhara Diplomatic tower, taken as one home. The 14th holds the living, dining and kitchen line along the lake elevation, with the terrace and the private infinity pool opening off it; the 15th is bedrooms only, so the entertaining half of the house and the sleeping half never share a corridor.",
      "Five bedrooms, six bathrooms and 5,850 square feet of covered area, which is roughly double what a large Gulshan apartment gives you and is the reason the plan can afford a separate butler quarter, a utility run behind the kitchen and a study that is not a converted bedroom. The lift opens with a dedicated key directly into the entrance hall — there is no shared landing at this level.",
      "It is sold fully furnished and ready, so the handover is a key and a service-charge schedule rather than a fit-out programme. Four parking bays come with the title. The building sits inside the diplomatic zone's own policing cordon, which is what most buyers at this price are actually paying for alongside the view.",
    ],
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
          photo("photo-1600566753190-17f0baa2a6c3"),
      photo("photo-1600585152220-90363fe7e115"),
],
    badge: "Featured",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Semi-furnished",
    handover: "Ready",
    agentId: "nusrat-jahan",
    amenities: ["Lake view", "2 parking", "Gym", "Rooftop garden", "Generator"],
    description: [
      "A four-bedroom floor on the 9th of twelve in Gulshan 2, with the living room, the master and one guest bedroom all facing the lake. At 3,240 square feet it is a full floor plate rather than a subdivided one, so every habitable room has an external window and the internal corridor is short.",
      "The apartment is semi-furnished: the kitchen, the wardrobes and the air conditioning are in, the loose furniture is not, which is the arrangement most buyers here prefer — the expensive fixed work is done and the rooms are still yours to set out. Two parking bays, a building gym, a rooftop garden and a standby generator sized for the whole block are included.",
      "Gulshan 2 is the address the rest of Dhaka is measured against: the circle, the diplomatic missions and the city's densest run of restaurants are inside a ten-minute drive, and the lake walk starts at the gate. Resale here is the most liquid in the country, which matters if this is an investment as much as a home.",
    ],
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
          photo("photo-1600585154340-be6161a56a0c"),
      photo("photo-1618221195710-dd6b41faaea6"),
],
    badge: "Exclusive",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Fully furnished",
    handover: "Ready",
    agentId: "tanvir-ahmed",
    amenities: ["Private lift", "Terrace", "3 parking", "Pool", "Concierge"],
    description: [
      "A duplex over the 11th and 12th floors of a Banani Block F tower, five bedrooms and five bathrooms across 4,720 square feet. The lower level runs living, dining and kitchen in one continuous line to the balcony; the internal stair lands on a family lounge upstairs, with the bedrooms off it.",
      "Fully furnished and ready to occupy. The block sits behind Banani 11, which puts the schools, the clinics and the commercial strip within walking distance while keeping the flat itself off the main road — the noise difference between a Block F address and one on Kemal Ataturk Avenue is the single most underrated thing about this location.",
      "Duplexes of this size come to market in Banani perhaps twice a year, and almost never with the papers already clear. The RAJUK-approved plan, the mutation and the utility clearances have all been checked by our survey team, and copies go to a serious buyer before any viewing.",
    ],
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
          photo("photo-1600047509807-ba8f99d2cdde"),
      photo("photo-1583511655857-d19b40a7a54e"),
],
    badge: "New",
    rajukApproved: true,
    hasVirtualTour: false,
    furnishing: "Unfurnished",
    handover: "Mar 2027",
    agentId: "farhana-rahman",
    amenities: ["Corner unit", "1 parking", "Community hall", "Lift backup"],
    description: [
      "A three-bedroom, 2,150 square foot apartment in a new build off Dhanmondi 27, handing over in March 2027. Buying at this stage means the finishing schedule is still open: floor material, kitchen layout and the bathroom fit-out can all be specified rather than accepted.",
      "The plan is a conventional three-bedroom with a separate drawing and dining, which is what actually resells in Dhanmondi — the neighbourhood's buyers are families trading up from an older flat nearby, and they read a large drawing room as the point of moving. South-facing living windows, one parking bay, a playground inside the block and a mosque on the same street.",
      "It is sold unfurnished. Construction milestones are photographed monthly and shared with buyers, and the payment schedule is tied to those milestones rather than to dates — no payment falls due for a stage that has not been reached.",
    ],
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
          photo("photo-1580489944761-15a19d654956"),
      photo("photo-1523217582562-09d0def993a6"),
],
    badge: "Exclusive",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Unfurnished",
    handover: "Ready",
    agentId: "tanvir-ahmed",
    amenities: ["5 katha land", "Garden", "4 parking", "Servant quarters"],
    description: [
      "An independent house on its own plot in Bashundhara Block I: six bedrooms, six bathrooms, 6,100 square feet of covered area, arranged around a courtyard that carries daylight into the middle of the plan rather than leaving the core rooms dependent on a light well.",
      "Ground floor holds the formal rooms, the kitchen and one guest suite with its own entrance; the family bedrooms are upstairs. The courtyard also does the cooling work — cross ventilation through it drops the reliance on air conditioning through most of the year, which is a running cost, not a detail.",
      "Sold unfurnished and ready. Block I is the quiet end of Bashundhara, laid out on the later plan with wider internal roads and no through traffic, and the plot comes with clear title and a RAJUK-approved building plan — the two documents that decide whether a house of this size is financeable.",
    ],
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
          photo("photo-1502005229762-cf1b2da7c5d6"),
      photo("photo-1560448204-e02f11c3d0e2"),
],
    badge: "Price drop",
    rajukApproved: true,
    hasVirtualTour: false,
    furnishing: "Unfurnished",
    handover: "Ready",
    agentId: "farhana-rahman",
    amenities: ["South facing", "1 parking", "Playground", "Mosque nearby"],
    description: [
      "A three-bedroom, 1,620 square foot apartment in Uttara Sector 4, ready to move into. It is the most common brief we are given — three bedrooms, two bathrooms, one parking bay, under two crore — and the one the market is thinnest on, because everything in that band is either older stock or a long way out.",
      "South-facing, so the living room takes light through the afternoon and the bedrooms stay off the western wall. The building has a lift, a standby generator and a playground; the sector's schools and the Uttara market are both inside a five-minute walk, and the metro station on Line 6 is a short rickshaw ride away.",
      "Unfurnished, with the plan RAJUK-approved and the flat's own papers verified before it went online. At this price the paperwork is where most of the risk sits, which is exactly why we check it first rather than at the offer stage.",
    ],
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
          photo("photo-1554118811-1e0d58224f24"),
      photo("photo-1519501025264-65ba15a82390"),
],
    badge: "Verified",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Fully furnished",
    handover: "Available now",
    agentId: "nusrat-jahan",
    amenities: ["Embassy zone", "2 parking", "Standby generator", "Gym"],
    description: [
      "A four-bedroom, 3,164 square foot apartment on the 7th of nine in Baridhara DOHS, available now on a monthly rent. Fully furnished to a standard that suits a diplomatic or corporate tenancy: the beds, the dining, the appliances and the window treatments are all in place, so a family can move in with suitcases.",
      "Four bedrooms and four bathrooms, all bedrooms en suite, with a separate drawing and dining and a service entrance behind the kitchen. Two parking bays, a standby generator that carries the whole flat rather than just the lights, and a building gym.",
      "DOHS is a gated, cantonment-administered neighbourhood with its own security at every entry — the reason most embassy leases in this city end up here. Leases are usually signed for a year with a two-month advance; longer terms are negotiable and, at this size, usually cheaper.",
    ],
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
          photo("photo-1541339907198-e08756dedf3f"),
      photo("photo-1497366754035-f200968a6e72"),
],
    badge: "Featured",
    rajukApproved: true,
    hasVirtualTour: true,
    furnishing: "Semi-furnished",
    handover: "Available now",
    agentId: "imran-hossain",
    amenities: ["Avenue facing", "12 parking", "Central AC", "High-speed lifts x4"],
    description: [
      "A 5,120 square foot commercial floor on the 4th of fourteen, facing Gulshan Avenue. One open plate with the core to the rear, so it can be cellular, open plan or a mix without moving a service riser — a plan that suits a growing firm better than a floor already divided by someone else's idea of a layout.",
      "Central air conditioning, four high-speed lifts, twelve parking bays and a lobby that reads as an address when a client walks in. The building's generator carries the full floor including the air conditioning, which is not standard on this avenue and is worth checking on anything you compare it against.",
      "Available now, semi-furnished, on a monthly rent. Gulshan 1 is where the head offices sit because the banks, the ministries and the airport road all converge here; a Gulshan Avenue address on a letterhead is doing part of the job of a sales team.",
    ],
  },
  {
    id: "chattogram-hill",
    slug: "hillcrest-apartments-khulshi",
    title: "Hillcrest Luxury Suites",
    area: "Khulshi Hills",
    city: "Chattogram",
    purpose: "sale",
    status: "sold",
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
          photo("photo-1518770660439-4636190af475"),
      photo("photo-1502672260266-1c1ef2d93688"),
],
    badge: "New",
    rajukApproved: true,
    hasVirtualTour: false,
    furnishing: "Unfurnished",
    handover: "Dec 2026",
    agentId: "farhana-rahman",
    amenities: ["Hill view", "1 parking", "Rooftop infinity deck", "Solar backup"],
    description: [
      "A three-bedroom, 2,150 square foot apartment on the 8th of ten in Khulshi Hills, handing over in December 2026. Khulshi is where Chattogram's business families live, and the hill puts the flats far enough above the city for the view to be over rooftops rather than into them.",
      "The plan is three bedrooms and three bathrooms with a large drawing and dining, one parking bay, a rooftop infinity deck shared by the block and solar backup for the common areas. Unfurnished at handover, so the fit-out is the buyer's to specify.",
      "This particular unit has been sold. Similar floors in the same building and along the Khulshi ridge come up regularly — tell us the size and the budget and we will send the ones that match rather than everything on the hill.",
    ],
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
  { value: "studio", label: "Studio Apartments", count: 420 },
  { value: "warehouse", label: "Warehouses & Godowns", count: 310 },
  { value: "shop", label: "Shops & Showrooms", count: 950 },
  { value: "sublet", label: "Rooms & Sublets", count: 530 },
  { value: "garage", label: "Parking & Garages", count: 280 },
];

/** One listing by its slug — the URL segment, not the id. */
export function propertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

/**
 * What to show under a listing: same area first, then same type, then anything
 * else of the same purpose. Sorted that way rather than filtered to it, so the
 * row is never short — three cards with one weak match reads better than one
 * card and a gap.
 */
export function similarProperties(property: Property, limit = 3) {
  const score = (other: Property) =>
    (other.area === property.area ? 2 : 0) + (other.type === property.type ? 1 : 0);

  return properties
    .filter(
      (other) => other.id !== property.id && other.purpose === property.purpose,
    )
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}
