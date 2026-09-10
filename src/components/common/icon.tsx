import type { ComponentType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Expand,
  FileCheck2,
  HardHat,
  Heart,
  Images,
  Languages,
  Layers,
  KeyRound,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Moon,
  Pause,
  Phone,
  Play,
  Quote,
  Ruler,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Sofa,
  Star,
  Sun,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";

/**
 * One icon surface for the whole app.
 *
 * - UI icons come from `lucide-react` (the shadcn default, stroke based).
 * - Brand / social icons come from `react-icons/fa6` (Font Awesome 6).
 *
 * Registering them here keeps sizes, stroke weight and imports consistent, and
 * means a swap of icon set is a one-file change. Sizes are locked to the scale
 * below — do not pass raw `w-*`/`h-*` classes at call sites.
 */
export type IconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

export const icons = {
  // Navigation & actions
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  menu: Menu,
  search: Search,
  share: Share2,
  expand: Expand,
  grid: LayoutGrid,
  gallery: Images,
  heart: Heart,
  star: Star,
  quote: Quote,
  sparkles: Sparkles,
  shield: ShieldCheck,
  // Media
  play: Play,
  pause: Pause,
  volumeOn: Volume2,
  volumeOff: VolumeX,
  // Theme
  sun: Sun,
  moon: Moon,
  // Domain (property)
  bed: BedDouble,
  bath: Bath,
  area: Ruler,
  building: Building2,
  location: MapPin,
  calendar: CalendarDays,
  phone: Phone,
  mail: Mail,
  parking: Car,
  furnishing: Sofa,
  handover: KeyRound,
  construction: HardHat,
  approved: FileCheck2,
  layers: Layers,
  trend: TrendingUp,
  clock: Clock,
  users: Users,
  language: Languages,
  // Brands (Font Awesome 6)
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
} satisfies Record<string, IconComponent>;

export type IconName = keyof typeof icons;

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: { size: "sm" },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  /** Key from the registry above. */
  name?: IconName;
  /** Escape hatch: pass any icon component directly. */
  icon?: IconComponent;
  className?: string;
  /** Provide when the icon is the only content of a control. */
  label?: string;
}

export function Icon({ name, icon, size, className, label }: IconProps) {
  const Component = icon ?? (name ? icons[name] : undefined);
  if (!Component) return null;

  const svg = (
    <Component
      className={cn(iconVariants({ size }), className)}
      aria-hidden={label ? undefined : true}
    />
  );

  return label ? (
    <span role="img" aria-label={label} className="contents">
      {svg}
    </span>
  ) : (
    svg
  );
}

export { iconVariants };
