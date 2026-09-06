/**
 * Market notes. Kept short and specific — a portal's blog earns trust by
 * answering the question the buyer already has, not by publishing "Top 10 tips".
 */

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: "Market" | "Legal" | "Guide" | "NRB";
  readMinutes: number;
  date: string;
  image: string;
}

const photo = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const insights: Insight[] = [
  {
    id: "rajuk-checklist",
    title: "The seven RAJUK documents to see before you pay a booking fee",
    excerpt:
      "Approval, occupancy, mutation and four more. What each one proves, and what a developer's excuse for not having it usually means.",
    category: "Legal",
    readMinutes: 6,
    date: "2026-08-19",
    image: photo("photo-1450101499163-c8848c66ca85"),
  },
  {
    id: "gulshan-q2",
    title: "Gulshan asking prices cooled 4% this quarter — here is where",
    excerpt:
      "Lake-facing units held their value. Interior blocks above 3,000 sq ft did not. A block-by-block read of what actually closed.",
    category: "Market",
    readMinutes: 8,
    date: "2026-08-04",
    image: photo("photo-1460925895917-afdab827c52f"),
  },
  {
    id: "nrb-remittance",
    title: "Buying from abroad: the remittance route that avoids double tax",
    excerpt:
      "Wage earner's bond, NRB account or direct transfer. The paperwork each one needs and how long registration takes without you present.",
    category: "NRB",
    readMinutes: 7,
    date: "2026-07-22",
    image: photo("photo-1436450412740-6b988f486c6b"),
  },
];
