/**
 * Landowner Joint-Venture Partnership model data.
 * Inspired by BTI & D-Premium Homes' landowner monetization programs,
 * elevating trust, transparent ratios, and architectural safety.
 */

export interface LandBenefit {
  title: string;
  description: string;
  icon: "approved" | "check" | "construction" | "building" | "clock" | "users";
}

export interface LandmarkJVProject {
  name: string;
  location: string;
  landSizeKatha: number;
  floors: number;
  ownerSharePercent: number;
  completedYear: number;
  image: string;
}

export const landownerBenefits: LandBenefit[] = [
  {
    title: "Highest Market Ratio",
    description: "Up to 50% - 55% landowner share with upfront signing security deposit guaranteed via bank escrow.",
    icon: "check",
  },
  {
    title: "BNBC 2020 Seismic Code",
    description: "Built to withstand Zone 2/3 earthquakes with pile-depth ultrasonic testing and BUET-vetted structural design.",
    icon: "approved",
  },
  {
    title: "Strict Handover Guarantee",
    description: "36-month construction pledge with penalty compensation per day of any unexpected developer delay.",
    icon: "clock",
  },
  {
    title: "RAJUK Approval By Us",
    description: "Full regulatory clearance handling — Special Project clearance, Fire safety, and WASA/DESCO approvals.",
    icon: "building",
  },
];

export const landmarkJVProjects: LandmarkJVProject[] = [
  {
    name: "The Imperial Serenade",
    location: "Gulshan Avenue, Dhaka",
    landSizeKatha: 14.5,
    floors: 16,
    ownerSharePercent: 52,
    completedYear: 2024,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Lakefront Crest",
    location: "Dhanmondi Road 8/A, Dhaka",
    landSizeKatha: 10.2,
    floors: 14,
    ownerSharePercent: 50,
    completedYear: 2025,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
];
