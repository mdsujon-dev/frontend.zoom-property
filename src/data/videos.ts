export interface VideoItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  youtubeUrl: string;
  poster: string;
  duration: string;
  category: string;
  categoryBn: string;
  location: string;
  locationBn: string;
  views?: string;
  channelName: string;
}

/**
 * High-resolution luxury architectural backdrop for the video showcase section.
 */
export const videoSectionBackdrop =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80";

export const zoomItYoutubeChannel = "https://www.youtube.com/@thezoomit";

export const homeVideos: VideoItem[] = [
  {
    id: "penthouse-walkthrough",
    title: "The Luminary Duplex — Grand Living Walkthrough",
    titleBn: "দ্য লুমিনারি ডুপ্লেক্স — গ্র্যান্ড লিভিং ওয়াকথ্রু",
    description: "Experience 6,800 sq.ft of curated luxury overlooking Gulshan Lake with custom Italian marble and double-height salons.",
    descriptionBn: "গুলশান লেকের মনোরম দৃশ্যসহ ৬,৮০০ বর্গফুটের কিউরেটেড লাক্সারি ডুপ্লেক্স এবং ডাবল-হাইট লিভিং স্যালন।",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    poster: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    duration: "03:45",
    category: "Penthouse Tour",
    categoryBn: "পেন্টহাউস ট্যুর",
    location: "Gulshan 2, Dhaka",
    locationBn: "গুলশান ২, ঢাকা",
    views: "24.5K views",
    channelName: "Zoom IT & Zoom Property",
  },
  {
    id: "lakefront-crest-tour",
    title: "Lakefront Crest — Structural Milestone & Site Inspection",
    titleBn: "লেকফ্রন্ট ক্রেস্ট — স্ট্রাকচারাল মাইলস্টোন ও সাইট পরিদর্শন",
    description: "Audited structural concrete pouring and seismic dampening inspection at Dhanmondi's premier residential tower.",
    descriptionBn: "ধানমন্ডির অভিজাত রেসিডেন্সিয়াল টাওয়ারের লাইভ কনস্ট্রাকশন অগ্রগতি ও স্ট্রাকচারাল পরিদর্শন।",
    youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    poster: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    duration: "04:18",
    category: "Construction Update",
    categoryBn: "নির্মাণ আপডেট",
    location: "Dhanmondi 8/A, Dhaka",
    locationBn: "ধানমন্ডি ৮/এ, ঢাকা",
    views: "18.2K views",
    channelName: "Zoom IT & Zoom Property",
  },
  {
    id: "smart-villa-estate",
    title: "The Courtyard Villa — Smart Architecture & Greenery",
    titleBn: "দ্য কোর্টইয়ার্ড ভিলা — স্মার্ট আর্কিটেকচার ও সবুজ প্রকৃতি",
    description: "A masterclass in tropical brutalism and integrated smart-home automation with private courtyard swimming pool.",
    descriptionBn: "আধুনিক স্মার্ট হোম অটোমেশন ও প্রাইভেট পুল সমন্বিত মনোরম ট্রপিক্যাল আর্কিটেকচারাল ভিলা।",
    youtubeUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    poster: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    duration: "05:12",
    category: "Villa Walkthrough",
    categoryBn: "ভিলা ওয়াকথ্রু",
    location: "Bashundhara R/A, Dhaka",
    locationBn: "বসুন্ধরা আ/এ, ঢাকা",
    views: "31.0K views",
    channelName: "Zoom IT & Zoom Property",
  },
  {
    id: "skyline-penthouse",
    title: "Sky Lounge & Terrace Garden — Panoramic Banani View",
    titleBn: "স্কাই লাউঞ্জ ও টেরেস গার্ডেন — প্যানোরামিক বনানী ভিউ",
    description: "360-degree skyline views, infinity plunge pool, and bespoke acoustic entertainment suite in Banani diplomatic zone.",
    descriptionBn: "৩৬০ ডিগ্রি প্যানোরামিক স্কাইলাইন ভিউ ও রুফটপ ইনফিনিটি পুলসহ বনানীর এক্সক্লুসিভ স্কাই লাউঞ্জ।",
    youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    poster: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    duration: "03:15",
    category: "Sky Residence",
    categoryBn: "স্কাই রেসিডেন্স",
    location: "Banani, Dhaka",
    locationBn: "বনানী, ঢাকা",
    views: "19.8K views",
    channelName: "Zoom IT & Zoom Property",
  },
  {
    id: "baridhara-diplomatic",
    title: "Baridhara Diplomatic Enclave — Luxury Interior Walkthrough",
    titleBn: "বারিধারা ডিপ্লোম্যাটিক জোন — লাক্সারি ইন্টেরিয়র ওয়াকথ্রু",
    description: "Handcrafted teak woodwork, German triple-glazed acoustic facades, and state-of-the-art climate filtration systems.",
    descriptionBn: "জার্মান সাউন্ডপ্রুফ গ্লাস ও প্রিমিয়াম ইন্টেরিয়রসহ বারিধারা ডিপ্লোম্যাটিক জোনের অ্যাপার্টমেন্ট।",
    youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    poster: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    duration: "04:45",
    category: "Interior Showcase",
    categoryBn: "ইন্টেরিয়র শোকেস",
    location: "Baridhara, Dhaka",
    locationBn: "বারিধারা, ঢাকা",
    views: "15.7K views",
    channelName: "Zoom IT & Zoom Property",
  },
];
