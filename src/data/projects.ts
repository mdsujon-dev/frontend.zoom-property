/**
 * Under-construction developments with live progress transparency.
 * Surpasses BTI & D-Premium Homes by showing milestone breakdown,
 * inspection stamps, and live CCTV feed verification status.
 */

export interface ConstructionMilestone {
  label: string;
  percent: number;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  area: string;
  city: string;
  /** Completion, 0–100. */
  progress: number;
  handover: string;
  units: number;
  unitsLeft: number;
  sizeRange: string;
  startingPrice: number;
  image: string;
  status: "Piling" | "Structure" | "Finishing" | "Handover ready";
  lastInspected: string;
  cctvStreamActive: boolean;
  rajukPermitNo: string;
  milestones: ConstructionMilestone[];
}

const photo = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    id: "the-quay",
    name: "The Quay Residences",
    area: "Gulshan 2 (Lakefront)",
    city: "Dhaka",
    progress: 84,
    handover: "Jun 2027",
    units: 24,
    unitsLeft: 4,
    sizeRange: "3,200 – 4,400 sq ft",
    startingPrice: 48_000_000,
    image: photo("photo-1545324418-cc1a3fa10c00"),
    status: "Finishing",
    lastInspected: "Sep 2026",
    cctvStreamActive: true,
    rajukPermitNo: "RAJUK/EM/2023/1842",
    milestones: [
      { label: "Deep Piling (110 ft)", percent: 100, completed: true },
      { label: "Basement & Structure", percent: 100, completed: true },
      { label: "MEP & Fire Systems", percent: 85, completed: false },
      { label: "Interior Marble & Glass", percent: 55, completed: false },
    ],
  },
  {
    id: "aurora-heights",
    name: "Aurora Heights Diplomatic",
    area: "Baridhara Diplomatic",
    city: "Dhaka",
    progress: 62,
    handover: "Dec 2027",
    units: 18,
    unitsLeft: 6,
    sizeRange: "3,800 – 5,600 sq ft",
    startingPrice: 62_000_000,
    image: photo("photo-1600596542815-ffad4c1539a9"),
    status: "Structure",
    lastInspected: "Aug 2026",
    cctvStreamActive: true,
    rajukPermitNo: "RAJUK/DP/2024/0912",
    milestones: [
      { label: "Deep Piling & Raft", percent: 100, completed: true },
      { label: "14-Storey RCC Frame", percent: 80, completed: false },
      { label: "Curtain Wall Glazing", percent: 40, completed: false },
      { label: "Smart Automation Fitout", percent: 15, completed: false },
    ],
  },
  {
    id: "aster-green",
    name: "Aster Green Eco-Suites",
    area: "Bashundhara Block I",
    city: "Dhaka",
    progress: 32,
    handover: "Dec 2028",
    units: 56,
    unitsLeft: 31,
    sizeRange: "1,850 – 2,400 sq ft",
    startingPrice: 16_500_000,
    image: photo("photo-1517245386807-bb43f82c33c4"),
    status: "Piling",
    lastInspected: "Sep 2026",
    cctvStreamActive: true,
    rajukPermitNo: "RAJUK/BS/2024/3104",
    milestones: [
      { label: "Soil Treatment & Piling", percent: 95, completed: false },
      { label: "Substructure & Raft", percent: 20, completed: false },
      { label: "Superstructure Frame", percent: 0, completed: false },
      { label: "Finishing & Landscaping", percent: 0, completed: false },
    ],
  },
];
