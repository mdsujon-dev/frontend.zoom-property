/**
 * Agents and client reviews.
 *
 * Agents carry a face, a patch and a response time — the three things that
 * decide whether someone calls. Reviews carry which property the person
 * actually bought, because an unattributed quote reads as invented.
 */

export interface Agent {
  id: string;
  name: string;
  role: string;
  /** Neighbourhoods this agent actually covers. */
  patch: string[];
  deals: number;
  rating: number;
  /** Typical first reply, in minutes. */
  respondsIn: number;
  image: string;
  languages: string[];
}

export interface Review {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** What they bought or rented — ties the quote to something real. */
  property: string;
  rating: number;
  image: string;
  /**
   * Present when the client said it on camera. The quote still has to be
   * written out: it is what the card shows before anyone presses play, and it
   * is the only version a crawler or a muted visitor ever reads.
   */
  video?: {
    /**
     * Placeholder clips until the real recordings are uploaded — swap the id
     * for the client's own video and nothing else here has to change.
     */
    youtubeUrl: string;
    /**
     * A frame of the person talking, not the property. The whole point of a
     * filmed review is the face saying it, so the still shows the same face as
     * `image` — a wider crop of the same photograph.
     */
    poster: string;
    duration: string;
  };
}

const face = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`;

const still = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const agents: Agent[] = [
  {
    id: "nusrat-jahan",
    name: "Nusrat Jahan",
    role: "Senior Consultant",
    patch: ["Gulshan", "Baridhara"],
    deals: 214,
    rating: 4.9,
    respondsIn: 8,
    image: face("photo-1573496359142-b8d87734a5a2"),
    languages: ["Bangla", "English"],
  },
  {
    id: "tanvir-ahmed",
    name: "Tanvir Ahmed",
    role: "Head of Luxury",
    patch: ["Banani", "Bashundhara"],
    deals: 178,
    rating: 4.8,
    respondsIn: 12,
    image: face("photo-1560250097-0b93528c311a"),
    languages: ["Bangla", "English", "Hindi"],
  },
  {
    id: "farhana-rahman",
    name: "Farhana Rahman",
    role: "Residential Specialist",
    patch: ["Dhanmondi", "Uttara"],
    deals: 236,
    rating: 4.9,
    respondsIn: 6,
    image: face("photo-1580489944761-15a19d654956"),
    languages: ["Bangla", "English"],
  },
  {
    id: "imran-hossain",
    name: "Imran Hossain",
    role: "Commercial Lead",
    patch: ["Gulshan", "Tejgaon", "Mirpur"],
    deals: 141,
    rating: 4.7,
    respondsIn: 15,
    image: face("photo-1507003211169-0a1dd7228f2d"),
    languages: ["Bangla", "English"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    quote:
      "They sent me four flats that actually matched my budget instead of twenty that did not. The RAJUK papers were in my inbox before I asked.",
    name: "Sadia Karim",
    role: "Bought in Dhanmondi",
    property: "Heritage Court, Dhanmondi 27",
    rating: 5,
    image: face("photo-1487412720507-e7ab37603c6f"),
    video: {
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      poster: still("photo-1487412720507-e7ab37603c6f"),
      duration: "02:14",
    },
  },
  {
    id: "r2",
    quote:
      "I was moving from Toronto and could not visit. The video walkthrough was honest about the road noise, which is the first time an agent has told me something inconvenient.",
    name: "Rezaul Haque",
    role: "NRB buyer",
    property: "Lake View Residence, Gulshan 2",
    rating: 5,
    image: face("photo-1500648767791-00dcc994a43e"),
    video: {
      youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      poster: still("photo-1500648767791-00dcc994a43e"),
      duration: "03:02",
    },
  },
  {
    id: "r3",
    quote:
      "Handover took three weeks instead of the three months I was braced for. Every fee was itemised on the first call.",
    name: "Anika Tabassum",
    role: "Rented in Baridhara",
    property: "Diplomatic Zone Residence",
    rating: 5,
    image: face("photo-1438761681033-6461ffad8d80"),
    video: {
      youtubeUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      poster: still("photo-1438761681033-6461ffad8d80"),
      duration: "01:48",
    },
  },
  {
    id: "r4",
    quote:
      "We needed 5,000 sq ft of office space in Gulshan in six weeks. They found three floors, negotiated the rent free period and handled the deed.",
    name: "Mahbub Alam",
    role: "Operations Director",
    property: "Avenue Office Floor, Gulshan 1",
    rating: 4,
    image: face("photo-1519085360753-af0119f7cbe7"),
    video: {
      youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      poster: still("photo-1519085360753-af0119f7cbe7"),
      duration: "02:36",
    },
  },
  {
    id: "r5",
    quote:
      "I asked for the service charge history before signing. They sent four years of it the same afternoon, including the year it went up and why.",
    name: "Farhana Rahman",
    role: "Bought in Bashundhara",
    property: "Courtyard Villa, Bashundhara R/A",
    rating: 5,
    image: face("photo-1544005313-94ddf0286df2"),
    video: {
      youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      poster: still("photo-1544005313-94ddf0286df2"),
      duration: "02:05",
    },
  },
];
