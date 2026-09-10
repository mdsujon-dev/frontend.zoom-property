/**
 * Real Estate News, Market Intelligence and Architectural Guides.
 *
 * Designed to mirror a high-end property editorial magazine with
 * categorised sections, featured spotlights, and bilingual support (EN/BN).
 */

export type BlogCategory =
  | "All"
  | "Real Estate"
  | "Architecture"
  | "Economy"
  | "Legal"
  | "Technology"
  | "Lifestyle"
  | "Market"
  | "Guide"
  | "NRB";

export interface InsightAuthor {
  name: string;
  nameBn: string;
  role: string;
  roleBn: string;
  avatar: string;
}

export interface Insight {
  id: string;
  title: string;
  titleBn: string;
  excerpt: string;
  excerptBn: string;
  category: BlogCategory;
  readMinutes: number;
  date: string;
  /** The card image on the index. */
  image: string;
  /**
   * The wide banner on the article page.
   *
   * Optional, and separate from `image`, because the two crops do different
   * jobs: a banner is wide with a headline over it, a card is close and has to
   * read small. Absent, the article page uses `image`.
   */
  coverImage?: string;
  author: InsightAuthor;
  featured?: boolean;
  trending?: boolean;
  section?:
    | "hero-main"
    | "hero-top"
    | "hero-list"
    | "architecture"
    | "lifestyle"
    | "advisory"
    | "economy"
    | "real-estate"
    | "technology";
}

const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const authors: Record<string, InsightAuthor> = {
  tanvir: {
    name: "Tanvir Ahmed",
    nameBn: "তানভীর আহমেদ",
    role: "Senior Real Estate Analyst",
    roleBn: "সিনিয়র রিয়েল এস্টেট বিশ্লেষক",
    avatar: photo("photo-1534528741775-53994a69daeb", 200),
  },
  sarah: {
    name: "Ar. Sarah Rahman",
    nameBn: "স্থপতি সারাহ রহমান",
    role: "Architectural Journalist",
    roleBn: "স্থাপত্য বিষয়ক লেখক ও গবেষক",
    avatar: photo("photo-1580489944761-15a19d654956", 200),
  },
  rafiq: {
    name: "Adv. Rafiqul Islam",
    nameBn: "অ্যাডভোকেট রফিকুল ইসলাম",
    role: "Property & Land Law Specialist",
    roleBn: "ভূমি ও প্রপার্টি আইন বিশেষজ্ঞ",
    avatar: photo("photo-1507003211169-0a1dd7228f2d", 200),
  },
  kazi: {
    name: "Kazi Nabil",
    nameBn: "কাজী নাবিল",
    role: "Urban Infrastructure Researcher",
    roleBn: "নগর অবকাঠামো বিশ্লেষক",
    avatar: photo("photo-1500648767791-00dcc994a43e", 200),
  },
};

export const insights: Insight[] = [
  // --------------------------------------------------------------------------
  // HERO SECTION POSTS
  // --------------------------------------------------------------------------
  {
    id: "top-7-areas-to-buy-plot-in-dhaka",
    title: "Top 7 Areas to Buy a Plot in Dhaka for Smart Investors",
    titleBn: "স্মার্ট বিনিয়োগকারীদের জন্য ঢাকায় প্লট কেনার শীর্ষ ৭টি এলাকা",
    excerpt:
      "From Purbachal New Town and Jolshiri to Bashundhara Blocks N-P: a data-driven breakdown of land valuation, connectivity corridors, and RAJUK layout clearances.",
    excerptBn:
      "পূর্বাচল নতুন শহর, জলসিঁড়ি আবাসন থেকে বসুন্ধরা ব্লকের ভবিষ্যৎ রূপরেখা: জমির মূল্যবৃদ্ধি, যোগাযোগ ব্যবস্থা ও রাজউক অনুমোদনের সমন্বিত পর্যালোচনা।",
    category: "Real Estate",
    readMinutes: 8,
    date: "2026-08-28",
    image: photo("photo-1480714378408-67cf0d13bc1b"),
    author: authors.tanvir,
    featured: true,
    trending: true,
    section: "hero-main",
  },
  {
    id: "commercial-real-estate-dhaka",
    title: "Unlocking Opportunities: Navigating Commercial Real Estate in Dhaka",
    titleBn: "বাণিজ্যিক রিয়েল এস্টেট: ঢাকায় কর্পোরেট স্পেসের নতুন সম্ভাবনা",
    excerpt:
      "Why Grade-A LEED certified commercial office floors in Tejgaon and Gulshan are delivering over 9.2% gross rental yield amidst corporate relocations.",
    excerptBn:
      "তেজগাঁও ও গুলশানে বহুজাতিক কর্পোরেট অফিসের চাহিদা এবং লিড-সার্টিফায়েড ফ্লোরগুলোর ৯.২% গড় ভাড়া আয়ের বাস্তব সমীকরণ।",
    category: "Real Estate",
    readMinutes: 6,
    date: "2026-08-24",
    image: photo("photo-1486406146926-c627a92ad1ab"),
    author: authors.tanvir,
    section: "hero-top",
  },
  {
    id: "architecting-dreams-penthouses",
    title: "Architecting Dreams: Dhaka's Best Kept Secret Lakefront Penthouses",
    titleBn: "স্বপ্নের স্থাপত্য: ঢাকার দৃষ্টিনন্দন লেকফ্রন্ট পেন্টহাউসের অন্দরমহল",
    excerpt:
      "Double-height atrium ceilings, private infinity plunge pools, and uninterrupted Gulshan-Banani water views defining the capital's modern ultra-luxury lifestyle.",
    excerptBn:
      "ডাবল-হাইট সিলিং, প্রাইভেট ইনফিনিটি পুল এবং লেকের প্যানোরামিক ভিউ: ঢাকার অভিজাত পেন্টহাউস লিভিংয়ের নতুন রূপরেখা।",
    category: "Architecture",
    readMinutes: 5,
    date: "2026-08-20",
    image: photo("photo-1600596542815-ffad4c1539a9"),
    author: authors.sarah,
    section: "hero-top",
  },
  {
    id: "rampura-hatirjheel-waterfront",
    title: "Rampura: One of Dhaka's Most Vibrant Waterfront Districts",
    titleBn: "রামপুরা: হাতিরঝিল সংযোগে ঢাকার অন্যতম প্রাণবন্ত আবাসন জোন",
    excerpt:
      "How waterfront promenade connectivity transformed Rampura into a prime rental powerhouse for young professionals.",
    excerptBn:
      "হাতিরঝিল ওয়াটার এক্সপ্রেস ও রিং রোডের কল্যাণে রামপুরা এখন পেশাজীবীদের অন্যতম প্রিয় আবাসিক ঠিকানা।",
    category: "Real Estate",
    readMinutes: 4,
    date: "2026-08-18",
    image: photo("photo-1519501025264-65ba15a82390"),
    author: authors.kazi,
    section: "hero-list",
  },
  {
    id: "mohakhali-commercial-hub",
    title: "Mohakhali: The Next High-Yield Commercial & Cultural Nexus",
    titleBn: "মহাখালী: ঢাকার ভবিষ্যৎ বাণিজ্যিক ও সাংস্কৃতিক প্রাণকেন্দ্র",
    excerpt:
      "With direct elevated expressway off-ramps and multi-story corporate towers, Mohakhali's commercial valuations continue upward.",
    excerptBn:
      "এলিভেটেড এক্সপ্রেসওয়ে সংযোগ এবং আধুনিক কর্পোরেট টাওয়ারের কারণে মহাখালীর কমার্শিয়াল ভ্যালুয়েশন দ্রুত বাড়ছে।",
    category: "Economy",
    readMinutes: 5,
    date: "2026-08-15",
    image: photo("photo-1498084393753-b411b2d26b34"),
    author: authors.tanvir,
    section: "hero-list",
  },
  {
    id: "motijheel-commercial-heartbeat",
    title: "Motijheel: Preserving the Commercial Heartbeat of the Capital",
    titleBn: "মতিঝিল: মেট্রোরেল সংযোগে বদলে যাওয়া ঐতিহাসিক সেন্ট্রাল বিজনেস ডিস্ট্রিক্ট",
    excerpt:
      "MRT Line-6 accessibility is rejuvenating traditional headquarters and spurring high-density corporate retrofitting in Motijheel.",
    excerptBn:
      "মেট্রোরেল লাইন-৬ চালুর পর মতিঝিলের কর্পোরেট ভবনগুলোতে নতুন বিনিয়োগ ও আধুনিকীকরণের জোয়ার।",
    category: "Economy",
    readMinutes: 5,
    date: "2026-08-12",
    image: photo("photo-1544620347-c4fd4a3d5957"),
    author: authors.kazi,
    section: "hero-list",
  },
  {
    id: "banani-11-retail-surge",
    title: "Banani 11: Inside the Fine Dining & Boutique Retail Real Estate Surge",
    titleBn: "বনানী ১১: ঢাকার রিটেইল, ক্যাফে ও লাইফস্টাইল প্রপার্টির প্রাণকেন্দ্র",
    excerpt:
      "High footfall premium corridors continue to command record per-square-foot lease values in Banani's commercial sector.",
    excerptBn:
      "বুটিক ক্যাফে ও গ্লোবাল ফ্যাশন আউটলেটের উপস্থিতিতে বনানী ১১ নম্বর সড়কের কমার্শিয়াল রেন্টাল ভ্যালু সর্বোচ্চ পর্যায়ে।",
    category: "Lifestyle",
    readMinutes: 4,
    date: "2026-08-10",
    image: photo("photo-1554118811-1e0d58224f24"),
    author: authors.sarah,
    section: "hero-list",
  },

  // --------------------------------------------------------------------------
  // ARCHITECTURE SECTION
  // --------------------------------------------------------------------------
  {
    id: "furniture-design-trends-bangladesh",
    title: "Top Furniture & Interior Design Trends in Bangladesh",
    titleBn: "বাংলাদেশে ফার্নিচার ও ইন্টেরিয়র ডিজাইনের সেরা আধুনিক ট্রেন্ডসমূহ",
    excerpt:
      "Minimalist teak craft, fluted acoustic panels, and smart modular storage solutions dominating luxury apartments in 2026.",
    excerptBn:
      "বার্মাটিক কাঠের মিনিমালিস্ট কারুকাজ, অ্যাকোস্টিক প্যানেলিং এবং স্মার্ট মডুলার স্পেস সেভিং ফার্নিচারের নতুন রূপরেখা।",
    category: "Architecture",
    readMinutes: 6,
    date: "2026-08-14",
    image: photo("photo-1618221195710-dd6b41faaea6"),
    author: authors.sarah,
    section: "architecture",
  },
  {
    id: "exploring-bangladesh-architecture",
    title: "Exploring the Rich Tapestry of Bangladesh's Modernist Architecture",
    titleBn: "বাংলাদেশের আধুনিক স্থাপত্যকলার অনন্য বিকাশ ও ঐতিহ্যের মেলবন্ধন",
    excerpt:
      "From Muzharul Islam's exposed red brick aesthetics to contemporary low-carbon residential towers designed for tropical monsoons.",
    excerptBn:
      "মাজহারুল ইসলামের এক্সপোজড ব্রিক আর্কিটেকচার থেকে শুরু করে আজকের পরিবেশবান্ধব ট্রপিক্যাল গ্রিন হাই-রাইজ নকশা।",
    category: "Architecture",
    readMinutes: 7,
    date: "2026-08-08",
    image: photo("photo-1600585154340-be6161a56a0c"),
    author: authors.sarah,
    section: "architecture",
  },
  {
    id: "biophilic-sky-gardens-dhaka",
    title: "Biophilic Architecture: Integrating Sky Gardens in Dhaka High-Rises",
    titleBn: "বায়োফিলিক স্থাপত্য: ঢাকার বহুতল ভবনে স্কাই গার্ডেনের নান্দনিক রূপায়ন",
    excerpt:
      "Vertical living walls, cantilevered greenery decks, and cross-ventilation shafts keeping ambient temperatures lower in high-density urban zones.",
    excerptBn:
      "ভার্টিক্যাল গ্রিন ওয়াল, ব্যালকনি গার্ডেন ও ন্যাচারাল ভেন্টিলেশন শ্যাফট: ঘনবসতিপূর্ণ শহরে প্রকৃতির পরশ ও শীতল আবহাওয়া।",
    category: "Architecture",
    readMinutes: 5,
    date: "2026-08-06",
    image: photo("photo-1512917774080-9991f1c4c750"),
    author: authors.sarah,
    section: "architecture",
  },
  {
    id: "sustainable-green-building-dhaka",
    title: "Sustainable Luxury: Green Building Architecture Redefining Gulshan",
    titleBn: "গ্রিন আর্কিটেকচার: গুলশানে পরিবেশবান্ধব ও টেকসই বিলাসবহুল আবাসন",
    excerpt:
      "Solar rooftop arrays, rainwater harvesting reservoirs, and smart thermal glazing delivering unprecedented energy efficiency.",
    excerptBn:
      "রুফটপ সোলার প্যানেল, বৃষ্টির পানি সংরক্ষণ ব্যবস্থা এবং থার্মাল নিরোধক গ্লাস: পরিবেশবান্ধব ও শক্তি সাশ্রয়ী ভবিষ্যৎ আবাসন।",
    category: "Architecture",
    readMinutes: 6,
    date: "2026-08-01",
    image: photo("photo-1600596542815-ffad4c1539a9"),
    author: authors.sarah,
    section: "architecture",
  },

  // --------------------------------------------------------------------------
  // AWARDS & LIFESTYLE SECTION
  // --------------------------------------------------------------------------
  {
    id: "top-5-cafes-in-dhaka",
    title: "Top 5 Cafes in Dhaka: A Coffee Lover's Guide to the Capital",
    titleBn: "ঢাকার সেরা ৫টি নান্দনিক ক্যাফে: কফিপ্রেমী ও রিমোট ওয়ার্কারদের গাইড",
    excerpt:
      "Artisan roasteries, lush botanical terraces, and high-speed fiber spaces that make Gulshan and Dhanmondi cafe culture thrive.",
    excerptBn:
      "আর্টিজান কফি, সবুজ ব্যালকনি ও শান্ত পরিবেশ: গুলশান, বনানী ও ধানমন্ডির নির্বাচিত সেরা ক্যাফে কালচার।",
    category: "Lifestyle",
    readMinutes: 5,
    date: "2026-08-07",
    image: photo("photo-1501339847302-ac426a4a7cbb"),
    author: authors.sarah,
    featured: true,
    section: "lifestyle",
  },
  {
    id: "top-5-restaurants-dhaka",
    title: "Top 5 Restaurants in Dhaka: A Food Lover's Guide to the Best Dining",
    titleBn: "ঢাকার শীর্ষ ৫টি ফাইন ডাইনিং রেস্তোরাঁ ও গ্যাস্ট্রোনমি গাইড",
    excerpt:
      "From authentic pan-Asian robata grills to contemporary Bengali fine dining with skyline panoramic decks.",
    excerptBn:
      "ঐতিহ্যবাহী স্বাদ থেকে শুরু করে আন্তর্জাতিক ফাইন ডাইনিং অভিজ্ঞতা: রাজধানীর শীর্ষ রেস্তোরাঁ সমাচার।",
    category: "Lifestyle",
    readMinutes: 4,
    date: "2026-08-05",
    image: photo("photo-1517248135467-4c7edcad34c4"),
    author: authors.sarah,
    section: "lifestyle",
  },
  {
    id: "top-international-schools-dhaka",
    title: "Top 10 International Schools in Dhaka: Proximity Guide for Homebuyers",
    titleBn: "ঢাকার শীর্ষ ১০টি আন্তর্জাতিক স্কুল: ফ্ল্যাট ও বাড়ি ক্রেতাদের জন্য লোকেশন গাইড",
    excerpt:
      "Why families prioritize homes within a 15-minute radius of IB and Cambridge world schools in Gulshan, Baridhara, and Uttara.",
    excerptBn:
      "সন্তানদের মানসম্মত শিক্ষার সুবিধার্থে বারিধারা, গুলশান ও উত্তরার বিশ্বমানের স্কুলগুলোর কাছাকাছি আবাসনের চাহিদা।",
    category: "Lifestyle",
    readMinutes: 6,
    date: "2026-08-03",
    image: photo("photo-1523240795612-9a054b0db644"),
    author: authors.kazi,
    section: "lifestyle",
  },
  {
    id: "top-10-universities-bangladesh-rankings",
    title: "Top 10 Universities in Bangladesh | Rankings, Admission, Programs & Fees",
    titleBn: "বাংলাদেশের শীর্ষ ১০টি বিশ্ববিদ্যালয় | র‍্যাংকিং, ভর্তি ও ক্যাম্পাস গাইড",
    excerpt:
      "A complete guide to premier higher education institutions in Dhaka for families planning residential property relocations.",
    excerptBn:
      "উচ্চশিক্ষার সেরা প্রতিষ্ঠান, ক্যাম্পাস সুবিধা ও শিক্ষার্থীদের যাতায়াত বিবেচনায় রাজধানীর নির্বাচিত আবাসন গাইড।",
    category: "Lifestyle",
    readMinutes: 6,
    date: "2026-08-01",
    image: photo("photo-1541339907198-e08756dedf3f"),
    author: authors.kazi,
    section: "lifestyle",
  },
  {
    id: "boutique-luxury-developments-banani",
    title: "Boutique Developments Redefining Luxury Living in Banani",
    titleBn: "বুটিক অ্যাপার্টমেন্ট: অভিজাত আবাসনের নতুন ধারা বনানীতে",
    excerpt:
      "Single-unit-per-floor floorplans offering 4,200+ sq ft with dedicated dual lift lobbies and acoustic glass enclosures.",
    excerptBn:
      "এক ফ্লোরে একটি ফ্ল্যাট, সম্পূর্ণ ব্যক্তিগত ডাবল লিফট লবি ও শব্দনিরোধক গ্লাসের বিলাসবহুল লাইফস্টাইল।",
    category: "Architecture",
    readMinutes: 5,
    date: "2026-07-30",
    image: photo("photo-1512917774080-9991f1c4c750"),
    author: authors.sarah,
    section: "lifestyle",
  },

  // --------------------------------------------------------------------------
  // COMPANY & ADVISORY SECTION
  // --------------------------------------------------------------------------
  {
    id: "property-insurance-industry-overview",
    title: "Examining Bangladesh's Property Insurance Industry & Buyer Safeguards",
    titleBn: "বাংলাদেশের প্রপার্টি ইন্স্যুরেন্স ও আবাসন ক্রেতা সুরক্ষা নীতিমালা",
    excerpt:
      "Comprehensive structural risk, fire liability, and completion bonds: how institutional buyers safeguard multi-crore real estate assets.",
    excerptBn:
      "ভবনের কাঠামোগত নিরাপত্তা, অগ্নিনির্বাপণ বীমা ও নির্মাণ নিরাপত্তা বন্ড: কোটি টাকার প্রপার্টি সুরক্ষার নির্ভরযোগ্য উপায়।",
    category: "Legal",
    readMinutes: 7,
    date: "2026-08-16",
    image: photo("photo-1450101499163-c8848c66ca85"),
    author: authors.rafiq,
    section: "advisory",
  },
  {
    id: "banking-financial-services-overview",
    title: "Overview of Bangladesh's Banking and Financial Services Sector",
    titleBn: "বাংলাদেশের ব্যাংকিং ও আর্থিক খাত: হোম লোন ও বিনিয়োগ নির্দেশিকা",
    excerpt:
      "Comparing mortgage interest brackets, processing velocity, and loan-to-value ratios across leading commercial banks.",
    excerptBn:
      "দেশের শীর্ষ ব্যাংকগুলোর হোম লোনের সুদের হার, দ্রুততম সময়ে ঋণ মঞ্জুরি প্রক্রিয়া ও এলটিভি অনুপাতের তুলনা।",
    category: "Economy",
    readMinutes: 8,
    date: "2026-08-14",
    image: photo("photo-1460925895917-afdab827c52f"),
    author: authors.tanvir,
    section: "advisory",
  },
  {
    id: "luxury-hotels-hospitality-dhaka",
    title: "Hotels to Stay in Dhaka: Your Complete Guide to Luxury Hospitality",
    titleBn: "ঢাকার লাক্সারি হোটেল ও হসপিটালিটি সেক্টরের রিয়েল এস্টেট বিশ্লেষণ",
    excerpt:
      "High business traveler occupancy rates and why international hotel brand residences are emerging as attractive passive income assets.",
    excerptBn:
      "আন্তর্জাতিক চেইন হোটেলগুলোর উচ্চ অকুপেন্সি রেট এবং ব্র্যান্ডেড সার্ভিসড অ্যাপার্টমেন্টে প্যাসিভ আয়ের সুযোগ।",
    category: "Lifestyle",
    readMinutes: 6,
    date: "2026-08-11",
    image: photo("photo-1566073771259-6a8506099945"),
    author: authors.tanvir,
    section: "advisory",
  },
  {
    id: "managing-pets-dhaka-apartments",
    title: "Managing Pets in Dhaka: Complete Guide to Pet-Friendly Living",
    titleBn: "ঢাকায় পেট-ফ্রেন্ডলি অ্যাপার্টমেন্ট ও কমিউনিটি নীতিমালা গাইড",
    excerpt:
      "Bylaws, rooftop exercise zones, and veterinary clinic accessibility for families seeking animal-friendly building cultures.",
    excerptBn:
      "পোষা প্রাণী পালনের আধুনিক বিল্ডিং রুলস, রুফটপ পেটস জোন ও ঢাকা শহরের সেরা পেট-বান্ধব আবাসিক এলাকা।",
    category: "Lifestyle",
    readMinutes: 4,
    date: "2026-08-02",
    image: photo("photo-1583511655857-d19b40a7a54e"),
    author: authors.sarah,
    section: "advisory",
  },

  // --------------------------------------------------------------------------
  // ECONOMY & MEGAPROJECTS SECTION
  // --------------------------------------------------------------------------
  {
    id: "infrastructure-projects-transforming-bangladesh",
    title: "Top Infrastructure Projects Transforming Bangladesh: Bridges, Metro, Expressways",
    titleBn: "বাংলাদেশের মেগাপ্রকল্প: মেট্রোরেল, এক্সপ্রেসওয়ে ও নতুন অর্থনৈতিক করিডোর",
    excerpt:
      "Detailed analysis of how MRT Line-1, Dhaka Elevated Expressway, and Purbachal 300-ft Expressway are reshaping property capital gains.",
    excerptBn:
      "এমআরটি লাইন-১, ঢাকা এলিভেটেড এক্সপ্রেসওয়ে এবং ৩০০ ফুট এক্সপ্রেসওয়ে ঘিরে জমির মূল্য বৃদ্ধির বাস্তব চিত্র।",
    category: "Economy",
    readMinutes: 7,
    date: "2026-08-15",
    image: photo("photo-1513836279014-a89f7a76ae86"),
    author: authors.kazi,
    section: "economy",
  },
  {
    id: "foreign-remittance-real-estate-nrb",
    title: "Foreign Remittance & Wage Earner's Bonds in Real Estate",
    titleBn: "প্রবাসী রেমিট্যান্স ও রিয়েল এস্টেট বিনিয়োগ: সম্পূর্ণ ট্যাক্স-ফ্রি সুবিধা",
    excerpt:
      "How non-resident Bangladeshis can leverage banking channels to acquire verified residential deeds with zero double-taxation.",
    excerptBn:
      "বৈধ ব্যাংকিং চ্যানেলে রেমিট্যান্স পাঠিয়ে বাংলাদেশে নিষ্কণ্টক জমি বা ফ্ল্যাট কেনার সহজ আইনি ও কর প্রক্রিয়া।",
    category: "NRB",
    readMinutes: 6,
    date: "2026-08-09",
    image: photo("photo-1436450412740-6b988f486c6b"),
    author: authors.rafiq,
    section: "economy",
  },
  {
    id: "banking-reforms-mortgage-rates",
    title: "Understanding Bangladesh's Banking Reforms and Mortgage Liquidity",
    titleBn: "ব্যাংকিং খাতের সংস্কার ও আবাসন ঋণের ভবিষ্যৎ রূপরেখা",
    excerpt:
      "What market-driven lending rates mean for long-term apartment buyers and developer project financing in Dhaka.",
    excerptBn:
      "সুদের হারের বাজারভিত্তিক পরিবর্তন দীর্ঘমেয়াদী আবাসন ক্রেতা ও ডেভেলপারদের অর্থায়নে কী প্রভাব ফেলবে।",
    category: "Economy",
    readMinutes: 5,
    date: "2026-08-06",
    image: photo("photo-1559526324-4b87b5e36e44"),
    author: authors.tanvir,
    section: "economy",
  },
  {
    id: "macroeconomic-banking-sector-guide",
    title: "Overview of Bangladesh's Banking and Financial Services Sector: A Complete Guide",
    titleBn: "বাংলাদেশের ব্যাংকিং ও আর্থিক খাত: রিয়েল এস্টেট বিনিয়োগকারীদের পূর্ণাঙ্গ গাইড",
    excerpt:
      "A comprehensive review of interest rate caps, single-borrower exposure limits, and sovereign bond yields affecting Dhaka real estate capital allocations.",
    excerptBn:
      "ব্যাংকিং খাতের তারল্য, একক ঋণগ্রহীতা সীমা ও সরকারি বন্ডের প্রভাব: দেশের আবাসন খাতে পুঁজি প্রবাহের বিশদ বিশ্লেষণ।",
    category: "Economy",
    readMinutes: 8,
    date: "2026-08-16",
    image: photo("photo-1486406146926-c627a92ad1ab"),
    author: authors.tanvir,
    featured: true,
    section: "economy",
  },

  // --------------------------------------------------------------------------
  // REAL ESTATE SECTION
  // --------------------------------------------------------------------------
  {
    id: "commercial-offices-gulshan-two",
    title: "Unlocking Opportunities: Navigating Commercial Hubs in Gulshan",
    titleBn: "গুলশানে বাণিজ্যিক অফিসের আকাশচুম্বী চাহিদা ও সেরা বিনিয়োগ এলাকা",
    excerpt:
      "Why multinational corporations and embassies maintain preference for Gulshan-2 Avenue corridors.",
    excerptBn:
      "বহুজাতিক প্রতিষ্ঠান ও কূটনৈতিক জোনের উপস্থিতিতে গুলশান-২ এভিনিউর বাণিজ্যিক ভবনের নিরবচ্ছিন্ন চাহিদা।",
    category: "Real Estate",
    readMinutes: 5,
    date: "2026-08-11",
    image: photo("photo-1486406146926-c627a92ad1ab"),
    author: authors.tanvir,
    section: "real-estate",
  },
  {
    id: "rampura-waterfront-lifestyle",
    title: "Rampura: One of Dhaka's Most Vibrant Waterfront Districts",
    titleBn: "রামপুরা: আধুনিক হাতিরঝিল ওয়াটারফ্রন্টের প্রাণবন্ত জীবনযাত্রা",
    excerpt:
      "Modern apartment developments with front-row Hatirjheel sunset views and direct ramp connectivity.",
    excerptBn:
      "হাতিরঝিল লেক ভিউ ও সরাসরি এক্সপ্রেসওয়ে কানেক্টিভিটিতে রামপুরার আবাসন প্রকল্পগুলোর অভাবনীয় জনপ্রিয়তা।",
    category: "Real Estate",
    readMinutes: 4,
    date: "2026-08-05",
    image: photo("photo-1506744038136-46273834b3fb"),
    author: authors.kazi,
    section: "real-estate",
  },
  {
    id: "mohakhali-cultural-nexus-property",
    title: "Mohakhali: One of Dhaka's Popular Cultural & Corporate Centers",
    titleBn: "মহাখালী: ঢাকার অন্যতম ব্যস্ত কর্পোরেট ও সাংস্কৃতিক প্রাণকেন্দ্র",
    excerpt:
      "Positioned adjacent to Gulshan and Banani with half the per-square-foot entry barrier for smart homebuyers.",
    excerptBn:
      "গুলশান ও বনানীর ঠিক পাশেই অপেক্ষাকৃত সাশ্রয়ী মূল্যে প্রিমিয়াম আবাসনের সুযোগ মহাখালীতে।",
    category: "Real Estate",
    readMinutes: 5,
    date: "2026-07-28",
    image: photo("photo-1480714378408-67cf0d13bc1b"),
    author: authors.tanvir,
    section: "real-estate",
  },
  {
    id: "motijheel-commercial-heritage",
    title: "Motijheel: Preserving the Commercial Heartbeat of the Capital",
    titleBn: "মতিঝিল: দেশের সবচেয়ে ঐতিহ্যবাহী বাণিজ্যিক কেন্দ্রের আধুনিকায়ন",
    excerpt:
      "Financial institutions, central bank headquarters, and high-rise commercial lease dynamics.",
    excerptBn:
      "বাংলাদেশ ব্যাংক, প্রধান প্রধান বাণিজ্যিক ব্যাংকের হেড অফিস ও আধুনিক বহুতল টাওয়ারের কমার্শিয়াল রূপরেখা।",
    category: "Real Estate",
    readMinutes: 6,
    date: "2026-07-25",
    image: photo("photo-1498084393753-b411b2d26b34"),
    author: authors.kazi,
    section: "real-estate",
  },

  // --------------------------------------------------------------------------
  // TECHNOLOGY SECTION
  // --------------------------------------------------------------------------
  {
    id: "technology-transforming-bangladesh-megaprojects",
    title: "Mega Infrastructure Projects Transforming Bangladesh: Metro Rail & Expressways",
    titleBn: "মেগাপ্রকল্পে নতুন যুগের সূচনা: মেট্রোরেল ও এলিভেটেড এক্সপ্রেসওয়ের প্রভাব",
    excerpt:
      "How mass transit lines are shrinking inter-city commutes and unlocking satellite residential hubs across Dhaka North.",
    excerptBn:
      "মেট্রোরেল নেটওয়ার্ক রাজধানীর যানজট কমিয়ে উত্তরা, মিরপুর ও ধানমন্ডির প্রপার্টি ভ্যালুয়েশনকে নতুন উচ্চতায় নিচ্ছে।",
    category: "Technology",
    readMinutes: 7,
    date: "2026-08-17",
    image: photo("photo-1544620347-c4fd4a3d5957"),
    author: authors.kazi,
    featured: true,
    section: "technology",
  },
  {
    id: "fast-internet-broadband-providers",
    title: "Best Internet Providers in Bangladesh: 7 Top Broadband & Fiber Networks",
    titleBn: "বাংলাদেশে সেরা ইন্টারনেট সেবা: দ্রুতগতির ৭টি ব্রডব্যান্ড ও ফাইবার নেটওয়ার্ক",
    excerpt:
      "Evaluating ultra-low latency optical fiber ISPs essential for modern smart homes and remote work professionals.",
    excerptBn:
      "স্মার্ট হোম অটোমেশন ও রিমোট ওয়ার্কের উপযোগী সেরা অপটিক্যাল ফাইবার নেটওয়ার্ক সমাচার।",
    category: "Technology",
    readMinutes: 5,
    date: "2026-08-09",
    image: photo("photo-1544717305-2782549b5136"),
    author: authors.kazi,
    section: "technology",
  },
  {
    id: "role-of-technology-in-real-estate",
    title: "The Role of Technology & PropTech in Real Estate Services",
    titleBn: "রিয়েল এস্টেট সেবায় আধুনিক প্রযুক্তি ও প্রপটেকের যুগান্তকারী ভূমিকা",
    excerpt:
      "From AI-assisted title searches to 3D BIM digital twins and drone land topography surveys.",
    excerptBn:
      "এআই নির্ভর দলিল যাচাইকরণ, থ্রিডি ভার্চুয়াল ওয়াকথ্রু এবং ড্রোন সার্ভের মাধ্যমে নিখুঁত রিয়েল এস্টেট সেবা।",
    category: "Technology",
    readMinutes: 6,
    date: "2026-08-04",
    image: photo("photo-1518770660439-4636190af475"),
    author: authors.kazi,
    section: "technology",
  },
  {
    id: "bangladesh-online-marketplace-proptech",
    title: "Exploring Bangladesh's Thriving Online Property & PropTech Market",
    titleBn: "বাংলাদেশের সম্ভাবনাময় প্রপটেক মার্কেটপ্লেস ও ডিজিটাল ল্যান্ড ভেরিফিকেশন",
    excerpt:
      "How digital transparency and land records digitization are building institutional trust for property buyers.",
    excerptBn:
      "অনলাইন ভূমি রেকর্ড ও ডিজিটাল যাচাই ব্যবস্থার কল্যাণে সাধারণ ক্রেতাদের মধ্যে শতভাগ আস্থার পরিবেশ সৃষ্টি।",
    category: "Technology",
    readMinutes: 5,
    date: "2026-07-29",
    image: photo("photo-1451187580459-43490279c0fa"),
    author: authors.tanvir,
    section: "technology",
  },

  // --------------------------------------------------------------------------
  // LEGAL & CORE ADVISORY (Classic Guides)
  // --------------------------------------------------------------------------
  {
    id: "rajuk-checklist",
    title: "The seven RAJUK documents to see before you pay a booking fee",
    titleBn: "বুকিং মানি দেওয়ার আগে রাজউকের যে ৭টি মূল দলিল দেখা বাধ্যতামূলক",
    excerpt:
      "Approval, occupancy, mutation and four more. What each one proves, and what a developer's excuse for not having it usually means.",
    excerptBn:
      "রাজউক অনুমোদিত নকশা, অকুপেন্সি সনদ, নামজারি পর্চা ও আরও চারটি জরুরি কাগজ। কোনটি কী প্রমাণ করে আর কোনোটা না থাকার অর্থ কী।",
    category: "Legal",
    readMinutes: 6,
    date: "2026-08-19",
    image: photo("photo-1450101499163-c8848c66ca85"),
    author: authors.rafiq,
    section: "advisory",
  },
  {
    id: "gulshan-q2",
    title: "Gulshan asking prices cooled 4% this quarter — here is where",
    titleBn: "গুলশানের প্রপার্টি দর: চলতি প্রান্তিকে কোন ব্লকে কেমন পরিবর্তন",
    excerpt:
      "Lake-facing units held their value. Interior blocks above 3,000 sq ft did not. A block-by-block read of what actually closed.",
    excerptBn:
      "লেকমুখী অ্যাপার্টমেন্টগুলোর দর অটুট থাকলেও ৩,০০০ বর্গফুটের বেশি অভ্যন্তরীণ ফ্ল্যাটগুলোর দরে পরিবর্তন এসেছে।",
    category: "Market",
    readMinutes: 8,
    date: "2026-08-04",
    image: photo("photo-1460925895917-afdab827c52f"),
    author: authors.tanvir,
    section: "real-estate",
  },
  {
    id: "nrb-remittance",
    title: "Buying from abroad: the remittance route that avoids double tax",
    titleBn: "বিদেশ থেকে জমি বা ফ্ল্যাট কেনা: বৈধ রেমিট্যান্স ও ট্যাক্স অব্যাহতি গাইড",
    excerpt:
      "Wage earner's bond, NRB account or direct transfer. The paperwork each one needs and how long registration takes without you present.",
    excerptBn:
      "ওয়েজ আর্নার্স বন্ড, এনআরবি অ্যাকাউন্ট নাকি সরাসরি ব্যাংক ট্রান্সফার? দেশে না এসেও কীভাবে পাওয়ার অব অ্যাটর্নির মাধ্যমে রেজিস্ট্রেশন সম্ভব।",
    category: "NRB",
    readMinutes: 7,
    date: "2026-07-22",
    image: photo("photo-1436450412740-6b988f486c6b"),
    author: authors.rafiq,
    section: "advisory",
  },
];
