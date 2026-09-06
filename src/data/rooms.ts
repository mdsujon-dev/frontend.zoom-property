import type { IconName } from "@/components/common/icon";

/**
 * Room-by-room walkthrough of a representative Zoom Property home.
 *
 * Photography and measurements live here; the names and descriptions are
 * translated, so they sit in `dict.content.rooms` in the same order — the same
 * split used by `features` / `featureIcons`.
 */
export interface Room {
  id: string;
  image: string;
  /** Floor area in sq ft. */
  size: number;
  /** Three short facts shown when the row is open. */
  specs: { icon: IconName; value: string }[];
}

const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const rooms: Room[] = [
  {
    id: "living",
    image: photo("photo-1600607687939-ce8a6c25118c"),
    size: 420,
    specs: [
      { icon: "area", value: "420 sq ft" },
      { icon: "building", value: "Double height" },
      { icon: "location", value: "Lake facing" },
    ],
  },
  {
    id: "dining",
    image: photo("photo-1600607687920-4e2a09cf159d"),
    size: 260,
    specs: [
      { icon: "area", value: "260 sq ft" },
      { icon: "users", value: "Seats 10" },
      { icon: "check", value: "Servery" },
    ],
  },
  {
    id: "bedroom",
    image: photo("photo-1600566753190-17f0baa2a6c3"),
    size: 340,
    specs: [
      { icon: "area", value: "340 sq ft" },
      { icon: "bath", value: "Ensuite" },
      { icon: "furnishing", value: "Walk-in wardrobe" },
    ],
  },
  {
    id: "kitchen",
    image: photo("photo-1552902865-b72c031ac5ea"),
    size: 180,
    specs: [
      { icon: "area", value: "180 sq ft" },
      { icon: "check", value: "Island" },
      { icon: "building", value: "Utility balcony" },
    ],
  },
  {
    id: "bathroom",
    image: photo("photo-1600210492493-0946911123ea"),
    size: 120,
    specs: [
      { icon: "area", value: "120 sq ft" },
      { icon: "bath", value: "Freestanding tub" },
      { icon: "check", value: "Heated floor" },
    ],
  },
  {
    id: "terrace",
    image: photo("photo-1571902943202-507ec2618e8f"),
    size: 900,
    specs: [
      { icon: "area", value: "900 sq ft" },
      { icon: "users", value: "Pool & lounge" },
      { icon: "location", value: "Skyline view" },
    ],
  },
];
