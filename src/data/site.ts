import type { IconName } from "@/components/common/icon";

export const siteConfig = {
  name: "Zoom Property",
  tagline: "Find the address you have been looking for",
  description:
    "A modern property platform — curated listings, virtual tours and a team that answers before the market moves.",
  url: "https://zoom-property.example.com",
} as const;

export const mainNav = [
  { label: "Listings", href: "#listings" },
  { label: "Gallery", href: "#gallery" },
  { label: "Tour", href: "#tour" },
  { label: "FAQ", href: "#faq" },
] as const;

export const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/10000000000", icon: "whatsapp" },
];

export const stats = [
  { label: "Properties listed", value: 12500, suffix: "+", compact: true },
  { label: "Cities covered", value: 48 },
  { label: "Average close time", value: 21, suffix: " days" },
  { label: "Client satisfaction", value: 98, suffix: "%" },
];

export const features: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Verified listings",
    description:
      "Every property is checked by our team before it goes live — no ghost listings, no stale prices.",
    icon: "shield",
  },
  {
    title: "Virtual tours",
    description:
      "Walk through the whole place from your sofa with 4K video tours and 360° galleries.",
    icon: "play",
  },
  {
    title: "Neighbourhood data",
    description:
      "Schools, transit, noise and price history for every street, right next to the listing.",
    icon: "location",
  },
  {
    title: "Instant scheduling",
    description:
      "Pick a slot and the agent confirms in minutes. No phone tag, no waiting on email.",
    icon: "calendar",
  },
  {
    title: "Smart matching",
    description:
      "Tell us what matters and we surface the three homes worth your Saturday.",
    icon: "sparkles",
  },
  {
    title: "Transparent fees",
    description:
      "One number, all in. What you see on the listing is what you sign for.",
    icon: "check",
  },
];

export const listings = [
  {
    id: "harbour-view-loft",
    title: "Harbour View Loft",
    location: "Marina District",
    price: 845000,
    beds: 3,
    baths: 2,
    area: 1840,
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cedar-hill-house",
    title: "Cedar Hill House",
    location: "Northside",
    price: 1290000,
    beds: 5,
    baths: 4,
    area: 3260,
    tag: "Featured",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "glass-court-villa",
    title: "Glass Court Villa",
    location: "Ridgeway Park",
    price: 2150000,
    beds: 6,
    baths: 5,
    area: 4720,
    tag: "Exclusive",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    alt: "Open plan living room with floor to ceiling windows",
    width: 1600,
    height: 1067,
    caption: "Living room, Cedar Hill House",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    alt: "Bedroom with warm morning light",
    width: 1600,
    height: 1067,
    caption: "Primary bedroom",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    alt: "Kitchen island in a modern kitchen",
    width: 1600,
    height: 1067,
    caption: "Kitchen, Harbour View Loft",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
    alt: "Bathroom with stone finishes",
    width: 1600,
    height: 1067,
    caption: "Ensuite bathroom",
  },
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    alt: "House exterior at dusk",
    width: 1600,
    height: 1067,
    caption: "Glass Court Villa at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
    alt: "Terrace with garden view",
    width: 1600,
    height: 1067,
    caption: "Terrace",
  },
];

export const partners = [
  "Northwind Estates",
  "Bluepine Capital",
  "Harbour Group",
  "Aster Homes",
  "Meridian Trust",
  "Oakline Realty",
];

export const faqs = [
  {
    question: "How do I book a viewing?",
    answer:
      "Open any listing and pick a slot from the agent's live calendar. You get a confirmation within minutes and a reminder the day before.",
  },
  {
    question: "Are the virtual tours up to date?",
    answer:
      "Tours are re-shot whenever a property changes hands or is renovated. Each tour shows the capture date under the player.",
  },
  {
    question: "What fees should I expect?",
    answer:
      "The price on the listing is the price you negotiate from. Our commission, legal costs and transfer fees are itemised before you sign anything.",
  },
  {
    question: "Can I sell through Zoom Property?",
    answer:
      "Yes. Send us the address and we will come back with a valuation, a photo and video plan, and a launch date, usually within 48 hours.",
  },
];
