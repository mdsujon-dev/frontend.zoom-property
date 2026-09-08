import type { BlogCategory, Insight } from "@/data/insights";
import type { Locale } from "@/i18n/config";

/**
 * Article bodies for `/blog/[slug]`.
 *
 * The site has no CMS, so the body is composed here rather than fetched. Each
 * post opens with its own excerpt as the lead, then draws its sections from a
 * pack keyed by category — so a Legal piece reads about deeds and a Market
 * piece reads about pricing, instead of every post sharing one filler body.
 *
 * That is a deliberate trade for a demo build: real per-post copy would live in
 * a CMS field and drop straight into `blocksFor` in place of the pack. The
 * footer already tells visitors this is demo data.
 *
 * Both languages are written out. A machine-translated Bangla body next to a
 * hand-written English one is worse than no Bangla at all.
 */

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "quote"; text: string; attribution: string };

interface Section {
  heading: string;
  paragraphs: string[];
}

interface Pack {
  takeawaysTitle: string;
  takeaways: string[];
  sections: Section[];
  quote: string;
  quoteBy: string;
  closing: string;
}

type CategoryKey = Exclude<BlogCategory, "All">;

const EN: Record<CategoryKey, Pack> = {
  "Real Estate": {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "Where the demand is actually coming from, not where it is advertised.",
      "The paperwork that decides whether a good price is a good deal.",
      "What a buyer should ask before a deposit changes hands.",
    ],
    sections: [
      {
        heading: "Reading the corridor, not the listing",
        paragraphs: [
          "A residential corridor is priced by access long before it is priced by finish. Two plots a few hundred metres apart can differ by a third per katha purely because one sits on an approved connector and the other waits on a road that exists only on a layout plan. The listing photograph tells you nothing about this; the RAJUK layout sheet does.",
          "That is why the first thing our advisory desk pulls for any enquiry is not comparable prices but the approved layout for the block. Where the connector is built, prices have already moved. Where it is funded but unbuilt, there is a window. Where it is neither, the discount on offer is not a discount at all.",
        ],
      },
      {
        heading: "The documents that decide the deal",
        paragraphs: [
          "Title search, mutation, up-to-date land development tax receipts and the approved building plan are the four that settle most questions. A seller who can produce all four inside a week is usually a seller whose price is real. One who cannot is asking you to fund the resolution of a problem they already know about.",
          "For apartments, add the developer's own chain: the joint-venture deed with the landowner, the allocation letter, and the occupancy certificate if the building is complete. A flat sold before the occupancy certificate is issued is a different risk from one sold after it, and it should be a different price.",
        ],
      },
      {
        heading: "What to ask before the deposit",
        paragraphs: [
          "Ask who else has viewed it and what they said no to — the honest answer is usually more informative than the brochure. Ask for the last three transacted prices in the same building or block, not the asking prices. And ask what happens to your deposit if the title search comes back unclear; if that answer is not in writing, it is not an answer.",
        ],
      },
    ],
    quote:
      "The price you are quoted is an opinion. The registered price of the last three sales in that building is a fact. Buy on the fact.",
    quoteBy: "Zoom Property advisory desk",
    closing:
      "If you are weighing a specific plot or apartment, our advisory team will run the title and layout check before you commit to anything — the same check we run on every listing we publish.",
  },

  Architecture: {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "The design decisions that survive a Dhaka summer.",
      "Where cost goes in a well-built residential floor plate.",
      "What separates a considered building from a decorated one.",
    ],
    sections: [
      {
        heading: "Designing for the climate you actually have",
        paragraphs: [
          "A glass elevation looks decisive in a render and behaves badly in April. Orientation, shading depth and cross-ventilation do more for comfort in this city than any mechanical system bolted on afterwards, and they cost less. The buildings that age well here are the ones where the shading was drawn before the facade material was chosen.",
          "The practical version is unglamorous: deep enough reveals on the west face, openable panels on opposite walls of every habitable room, and a service core placed where it blocks the worst afternoon sun rather than the best view. None of that shows up in a photograph. All of it shows up in the electricity bill.",
        ],
      },
      {
        heading: "Where the money goes",
        paragraphs: [
          "In a well-run residential project, structure and envelope take the larger share and finishes take the smaller one. When that ratio inverts, you are buying marble over a frame that was value-engineered out of its margin. Ask for the structural drawings and the seismic design basis before you ask about the kitchen.",
          "BNBC 2020 raised the seismic requirements, and the honest developers priced it in. A building quoted well below the block average in the same year is usually explaining something about its frame, whether or not anyone says so out loud.",
        ],
      },
      {
        heading: "Considered versus decorated",
        paragraphs: [
          "The test is whether the plan works with the decoration stripped away. Room proportions, daylight from two sides where possible, circulation that does not cut through living space, and a service entry that does not run past the dining table — these are the things a resident notices in year three, long after the lobby has stopped impressing anyone.",
        ],
      },
    ],
    quote:
      "Anyone can specify a good tile. Very few plans survive having the tiles taken away.",
    quoteBy: "Ar. Sarah Rahman",
    closing:
      "Every project we publish carries its structural basis and approval status on the listing. If a building's drawings are not available to a serious buyer, that is itself the answer.",
  },

  Economy: {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "The infrastructure that moves valuations, and the timeline it moves on.",
      "How financing cost feeds through to asking prices.",
      "Which signals lead the market and which merely follow it.",
    ],
    sections: [
      {
        heading: "Infrastructure moves prices before it opens",
        paragraphs: [
          "Valuations along a new corridor tend to move twice: once when funding is confirmed and again when the route actually opens. The gap between the two is where most of the return sits, and it is also where most of the risk sits, because a funded project is not a finished one.",
          "The elevated expressway and MRT alignments have both demonstrated this. Blocks with a confirmed access point repriced years before commuters used them, while blocks a few hundred metres off the alignment repriced barely at all. Proximity on a map is not the same as access.",
        ],
      },
      {
        heading: "Financing cost is the quieter driver",
        paragraphs: [
          "Home finance rates set the size of the buyer pool far more directly than sentiment does. When rates move, the effect shows up first in the mid-market, where buyers are closest to their borrowing limit, and only later at the top, where more transactions are cash.",
          "This is why a headline about falling prices often describes two different markets at once. Reading a single citywide average across those segments produces a number that is true and useless.",
        ],
      },
      {
        heading: "Leading signals worth watching",
        paragraphs: [
          "Registration volumes, utility connection approvals and construction material imports all turn before asking prices do. Asking prices are the last thing to move, because a seller changes their mind slowly. If you want to know where the market is going, watch what is being registered, not what is being advertised.",
        ],
      },
    ],
    quote:
      "Asking prices tell you what sellers hope. Registration volumes tell you what buyers did.",
    quoteBy: "Zoom Property research",
    closing:
      "Our monthly market memo tracks these indicators for Dhaka and Chattogram. It is free, and it says when we were wrong the previous month.",
  },

  Legal: {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "The searches that must happen before money moves.",
      "Where transactions most often come apart, and why.",
      "What a buyer can insist on putting in writing.",
    ],
    sections: [
      {
        heading: "The search comes first",
        paragraphs: [
          "A title search at the sub-registry office, a mutation check at the AC Land office, and a review of the land development tax record are the minimum. Together they answer whether the seller can actually sell, whether the state agrees they own it, and whether anything is owed against it.",
          "Doing this after a deposit is paid inverts the leverage. The point of searching first is that you are still free to walk away at no cost, which is the only real protection a buyer has.",
        ],
      },
      {
        heading: "Where deals come apart",
        paragraphs: [
          "Inherited property with an incomplete partition, a power of attorney that was never registered, and older mutations that were never updated after a sale account for most of the failures we see. None of these are exotic; all of them are found by a search that costs a fraction of the deposit.",
          "For apartments, the recurring problem is the gap between the joint-venture deed and what was actually built. If the deed allots the owner different units from the ones in the handover schedule, that discrepancy will surface at registration, and it will surface as your problem.",
        ],
      },
      {
        heading: "Put it in writing, or it did not happen",
        paragraphs: [
          "A deposit refundable on an unclear title, a fixed handover date with a defined consequence, and a schedule of exactly which units and parking spaces are being transferred — all three belong in the agreement, not in a conversation. A seller who resists writing them down is telling you something.",
        ],
      },
    ],
    quote:
      "Every dispute we have been asked to help unwind would have cost less to prevent than the first month of arguing about it.",
    quoteBy: "Adv. Rafiqul Islam",
    closing:
      "Our legal work is done in-house rather than subcontracted, so the search that decides whether a purchase is safe is run by people who answer to the buyer.",
  },

  Technology: {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "Which building technology earns its cost, and which is a line item.",
      "What smart infrastructure means for running cost.",
      "The questions to ask a developer about systems you cannot see.",
    ],
    sections: [
      {
        heading: "The systems worth paying for",
        paragraphs: [
          "Metering, water treatment and a properly sized backup supply change how a building lives day to day. App-controlled lighting does not. The difference is that the first three reduce running cost and disputes between residents, while the last is a feature demonstrated once during a viewing.",
          "Sub-metered utilities in particular remove the single most common source of friction in shared buildings, because every unit pays for exactly what it used and nobody has to litigate the corridor bill.",
        ],
      },
      {
        heading: "Running cost is the real specification",
        paragraphs: [
          "A building's service charge is set by decisions made before it was built: pump sizing, lift count against population, whether the generator was specified for the whole load or only for lifts and corridors. Ask for the projected service charge per square foot and the assumptions behind it.",
          "Where a developer cannot produce those assumptions, the projection is a marketing number. Where they can, you have something you can compare across buildings.",
        ],
      },
      {
        heading: "What to ask about what you cannot see",
        paragraphs: [
          "Who maintains the systems after handover, for how long, and under what contract? A five-year maintenance commitment from the developer and a handover of the as-built drawings to the owners' association is the arrangement that actually protects residents. Anything shorter transfers the risk to you at exactly the point the equipment starts to age.",
        ],
      },
    ],
    quote:
      "Ask what the building costs to run, not what it costs to show.",
    quoteBy: "Zoom Property project team",
    closing:
      "Our engineers inspect every active project monthly, and the completion figure published on a listing is the one they signed off.",
  },

  Lifestyle: {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "How daily routine, not floor area, decides where to live.",
      "What proximity is worth in commute time rather than kilometres.",
      "The amenities residents keep using after the first year.",
    ],
    sections: [
      {
        heading: "Measure in minutes, not kilometres",
        paragraphs: [
          "The distance between two addresses in this city says very little. The same three kilometres can be eleven minutes or fifty depending on which side of a junction you sit and which direction you travel at eight in the morning. Any serious comparison of two neighbourhoods has to be made in commute time, in both directions, at the hours you will actually travel.",
          "Buyers who do this often reorder their shortlist entirely. A slightly smaller apartment on the right side of a corridor routinely returns more usable hours per week than a larger one two junctions away.",
        ],
      },
      {
        heading: "The amenities that survive year one",
        paragraphs: [
          "Rooftop gardens, a functioning community hall and enough parking are used continuously. Elaborate gyms and infinity pools in mid-sized buildings are used enthusiastically for a season and then maintained by everyone forever. The service charge does not distinguish between the two.",
          "The most valuable shared facility in most Dhaka buildings turns out to be the most boring one: reliable water and power, and a management that answers the phone.",
        ],
      },
      {
        heading: "Schools, clinics and the weekly loop",
        paragraphs: [
          "Map the places you go every week — school, clinic, groceries, the one restaurant you actually return to — and see how many sit inside a fifteen-minute loop. Neighbourhoods that score well on that test hold their rental demand through market cycles, because the people who live there are reluctant to leave.",
        ],
      },
    ],
    quote:
      "People rarely move because the apartment was too small. They move because the journey wore them out.",
    quoteBy: "Zoom Property client research",
    closing:
      "Every area guide we publish lists commute times to the main employment corridors at peak hour, not straight-line distance.",
  },

  Market: {
    takeawaysTitle: "What this piece covers",
    takeaways: [
      "What actually transacted, against what was advertised.",
      "Which segments moved and which only appeared to.",
      "How to read an average that hides two different markets.",
    ],
    sections: [
      {
        heading: "Transacted, not asked",
        paragraphs: [
          "Asking prices are a poor instrument. They move slowly, they are set by sellers with different levels of urgency, and they stay posted long after the market has passed them. Registered transaction values are slower to obtain and far more useful.",
          "When the two diverge — asking prices flat while transacted values fall — that gap is the story. It usually means volume has thinned and only motivated sellers are closing, which is a state that persists until asking prices catch up.",
        ],
      },
      {
        heading: "Segments move separately",
        paragraphs: [
          "Lake-facing stock, interior blocks and large-format units above three thousand square feet behave like three different markets. Averaging them produces a citywide number that describes none of them, and any headline built on that average will be misleading in a specific and predictable way.",
          "Read the segment you are actually buying in. If a report does not break its numbers down that far, it is not a report you can transact on.",
        ],
      },
      {
        heading: "Volume before price",
        paragraphs: [
          "Turning points show up in volume first. Transactions thin out while prices are still nominally holding, then prices follow. If you are timing an entry or an exit, the count of deals closed is the earlier signal and the more honest one.",
        ],
      },
    ],
    quote:
      "A citywide average across three segments is a number that is true about nothing.",
    quoteBy: "Zoom Property research",
    closing:
      "Our quarterly reads are published block by block, including the quarters where the numbers went against what we expected.",
  },

  Guide: {
    takeawaysTitle: "What this guide covers",
    takeaways: [
      "The sequence to follow, in the order it should happen.",
      "What each step costs and how long it realistically takes.",
      "The points where it is still cheap to change your mind.",
    ],
    sections: [
      {
        heading: "Get the order right",
        paragraphs: [
          "Most avoidable losses come from doing the right things in the wrong sequence. Budget confirmed before viewing, title searched before deposit, agreement drafted before advance, registration before handover. Each step protects the one after it, and skipping ahead removes that protection entirely.",
          "The sequence also determines your leverage. Everything is negotiable before money moves and very little is negotiable afterwards, so front-load the questions you care about most.",
        ],
      },
      {
        heading: "Time and cost, honestly",
        paragraphs: [
          "A title search takes days, not hours. A mutation update after registration takes weeks and sometimes months. Bank finance approval runs on its own timetable regardless of the seller's deadline. Building a purchase plan on optimistic timelines is how buyers end up accepting terms they would otherwise refuse.",
          "Register the costs that are easy to forget: registration fees and stamp duty, mutation charges, utility transfer, and the service charge that starts the day you take possession rather than the day you move in.",
        ],
      },
      {
        heading: "The exits worth keeping open",
        paragraphs: [
          "Keep a written exit at two points: after the title search, and after the survey or inspection. Both should return your deposit in full. A seller who agrees to both is confident about what you will find, which is the most useful thing you can learn early.",
        ],
      },
    ],
    quote:
      "Do it in order and most of the risk removes itself. Do it out of order and no amount of care puts it back.",
    quoteBy: "Zoom Property advisory desk",
    closing:
      "If you want this run through against your own situation, the advisory desk will walk the sequence with you before you commit to a specific property.",
  },

  NRB: {
    takeawaysTitle: "What this guide covers",
    takeaways: [
      "The remittance routes and what each one requires.",
      "Buying and registering without being in the country.",
      "The tax position, and the paperwork that establishes it.",
    ],
    sections: [
      {
        heading: "Getting the funds in cleanly",
        paragraphs: [
          "The route the money takes determines the paperwork you will need years later, when you sell or repatriate. Funds that arrive through formal banking channels with the encashment certificates retained are straightforward to account for. Funds that arrive any other way are not, regardless of how legitimate their source.",
          "Keep every certificate. The document that proves how the purchase was funded is the same document that supports repatriation of the proceeds, and reconstructing it after the fact ranges from difficult to impossible.",
        ],
      },
      {
        heading: "Buying without being present",
        paragraphs: [
          "A registered power of attorney, correctly attested at the mission in your country of residence, lets a trusted representative complete registration on your behalf. The two failure points are attestation done incorrectly and a power of attorney drafted too narrowly to cover what actually needs signing.",
          "Have the scope drafted against the specific transaction rather than using a general template, and confirm the attestation requirements with the mission before travelling to it. Both are avoidable delays that regularly cost months.",
        ],
      },
      {
        heading: "The position you will need to prove",
        paragraphs: [
          "Your residency status, the source of funds and the treaty position between the two countries together determine what is owed and where. Establish this before purchase, in writing, with an adviser in each jurisdiction — after the fact, you are negotiating from a much weaker position.",
        ],
      },
    ],
    quote:
      "The certificate you cannot be bothered to file today is the one you will spend six months trying to reconstruct.",
    quoteBy: "Adv. Rafiqul Islam",
    closing:
      "Our NRB desk handles registration by power of attorney regularly and will tell you at the outset which parts of your plan will not work.",
  },
};

const BN: Record<CategoryKey, Pack> = {
  "Real Estate": {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "চাহিদা আসলে কোথা থেকে আসছে, বিজ্ঞাপনে যা বলা হয় তা নয়।",
      "যে কাগজপত্র ঠিক করে দেয় ভালো দাম মানেই ভালো চুক্তি কি না।",
      "বায়না দেওয়ার আগে ক্রেতার যা জেনে নেওয়া দরকার।",
    ],
    sections: [
      {
        heading: "লিস্টিং নয়, করিডোর পড়ুন",
        paragraphs: [
          "আবাসিক করিডোরের দাম ঠিক হয় ফিনিশিং দিয়ে নয়, সংযোগ দিয়ে। কয়েকশ মিটার দূরত্বের দুটি প্লটের কাঠাপ্রতি দামে এক-তৃতীয়াংশ পার্থক্য হতে পারে শুধু এই কারণে যে একটি অনুমোদিত সংযোগ সড়কের গায়ে, অন্যটি এমন রাস্তার অপেক্ষায় যা এখনো কেবল লেআউট প্ল্যানে আছে। ছবি এ কথা বলে না, রাজউকের লেআউট শিট বলে।",
          "তাই যেকোনো অনুসন্ধানে আমাদের অ্যাডভাইজরি ডেস্ক প্রথমে তুলনামূলক দাম নয়, ব্লকের অনুমোদিত লেআউট বের করে। যেখানে সংযোগ সড়ক হয়ে গেছে, দাম আগেই বেড়ে গেছে। যেখানে অর্থায়ন হয়েছে কিন্তু কাজ শুরু হয়নি, সেখানে সুযোগ আছে। আর যেখানে দুটোর কোনোটিই নেই, সেখানকার ছাড় আসলে ছাড় নয়।",
        ],
      },
      {
        heading: "যে কাগজগুলো চুক্তি ঠিক করে",
        paragraphs: [
          "টাইটেল সার্চ, নামজারি, হালনাগাদ ভূমি উন্নয়ন কর রসিদ এবং অনুমোদিত নকশা — এই চারটিই বেশিরভাগ প্রশ্নের মীমাংসা করে। যে বিক্রেতা এক সপ্তাহের মধ্যে চারটিই দিতে পারেন, তাঁর দামটাও সাধারণত বাস্তব। যিনি পারেন না, তিনি আসলে তাঁর জানা একটি সমস্যার সমাধানে আপনার টাকা চাইছেন।",
          "ফ্ল্যাটের ক্ষেত্রে ডেভেলপারের নিজের চেইনও দেখুন: জমির মালিকের সঙ্গে জয়েন্ট ভেঞ্চার দলিল, বরাদ্দপত্র এবং ভবন সম্পন্ন হলে অকুপেন্সি সার্টিফিকেট। অকুপেন্সি সার্টিফিকেটের আগে বিক্রি হওয়া ফ্ল্যাটের ঝুঁকি পরের চেয়ে আলাদা, তাই দামও আলাদা হওয়া উচিত।",
        ],
      },
      {
        heading: "বায়নার আগে যা জিজ্ঞেস করবেন",
        paragraphs: [
          "আর কারা দেখে গেছেন এবং কী কারণে না করেছেন — সৎ উত্তরটি ব্রোশিওরের চেয়ে বেশি কাজে দেয়। একই ভবন বা ব্লকে সর্বশেষ তিনটি রেজিস্ট্রি হওয়া দাম চান, চাওয়া দাম নয়। আর জিজ্ঞেস করুন, টাইটেল সার্চে সমস্যা ধরা পড়লে বায়নার টাকার কী হবে; এই উত্তর লিখিত না হলে সেটি উত্তরই নয়।",
        ],
      },
    ],
    quote:
      "আপনাকে বলা দামটি একটি মতামত। ওই ভবনের সর্বশেষ তিনটি রেজিস্ট্রি দাম একটি তথ্য। তথ্যের ওপর কিনুন।",
    quoteBy: "জুম প্রপার্টি অ্যাডভাইজরি ডেস্ক",
    closing:
      "নির্দিষ্ট কোনো প্লট বা ফ্ল্যাট বিবেচনা করলে আমাদের পরামর্শক দল আগেই টাইটেল ও লেআউট যাচাই করে দেবে — প্রকাশিত প্রতিটি লিস্টিংয়ে আমরা যা করি।",
  },

  Architecture: {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "ঢাকার গ্রীষ্ম যে নকশাগুলো টিকিয়ে রাখে।",
      "ভালো আবাসিক ফ্লোরে খরচ কোথায় যায়।",
      "ভাবনাচিন্তা করে বানানো ভবন আর সাজানো ভবনের পার্থক্য।",
    ],
    sections: [
      {
        heading: "যে আবহাওয়া সত্যিই আছে, তার জন্য নকশা",
        paragraphs: [
          "কাচের ফ্যাসাদ রেন্ডারে দুর্দান্ত দেখায়, এপ্রিলে খারাপ আচরণ করে। এই শহরে অভিমুখ, ছায়ার গভীরতা আর ক্রস-ভেন্টিলেশন যেকোনো যান্ত্রিক ব্যবস্থার চেয়ে বেশি আরাম দেয়, খরচও কম। যেসব ভবন সময়ের সঙ্গে ভালো থাকে, সেগুলোতে ফ্যাসাদের উপকরণ বাছার আগেই ছায়ার পরিকল্পনা আঁকা হয়েছিল।",
          "বাস্তব সমাধানটি চমকপ্রদ নয়: পশ্চিম দিকে যথেষ্ট গভীর রিভিল, প্রতিটি বাসযোগ্য ঘরের বিপরীত দেয়ালে খোলা যায় এমন প্যানেল, আর সার্ভিস কোর এমন জায়গায় যেখানে তা বিকেলের রোদ আটকায়, সেরা ভিউ নয়। ছবিতে এর কিছুই ধরা পড়ে না। বিদ্যুৎ বিলে সবটাই ধরা পড়ে।",
        ],
      },
      {
        heading: "টাকা কোথায় যায়",
        paragraphs: [
          "সুপরিচালিত আবাসিক প্রকল্পে কাঠামো ও এনভেলপে বড় অংশ যায়, ফিনিশিংয়ে ছোট অংশ। এই অনুপাত উল্টে গেলে বুঝতে হবে, মার্জিন বাঁচাতে কাটছাঁট করা ফ্রেমের ওপর মার্বেল কিনছেন। রান্নাঘরের কথা জিজ্ঞেস করার আগে স্ট্রাকচারাল ড্রয়িং আর সিসমিক ডিজাইন ভিত্তি চান।",
          "বিএনবিসি ২০২০ ভূমিকম্প-সংক্রান্ত শর্ত কঠোর করেছে, এবং সৎ ডেভেলপাররা সেই খরচ দামে ধরেছেন। একই বছরে ব্লকের গড়ের অনেক নিচে দর দেওয়া ভবন সাধারণত তার ফ্রেম নিয়ে কিছু একটা বলছে — কেউ মুখে বলুক বা না বলুক।",
        ],
      },
      {
        heading: "ভাবনা বনাম সাজসজ্জা",
        paragraphs: [
          "পরীক্ষাটি সহজ: সাজসজ্জা সরিয়ে নিলে প্ল্যানটি টেকে কি না। ঘরের অনুপাত, সম্ভব হলে দুই দিক থেকে দিনের আলো, বসার ঘর কেটে না যাওয়া চলাচলের পথ, আর খাবার টেবিলের পাশ দিয়ে না যাওয়া সার্ভিস এন্ট্রি — তিন বছর পর বাসিন্দা এগুলোই খেয়াল করেন, লবি ততদিনে কাউকে আর মুগ্ধ করে না।",
        ],
      },
    ],
    quote:
      "ভালো টাইলস যে কেউ বাছতে পারেন। টাইলস সরিয়ে নিলে খুব কম প্ল্যানই টেকে।",
    quoteBy: "স্থপতি সারাহ রহমান",
    closing:
      "আমাদের প্রকাশিত প্রতিটি প্রকল্পের লিস্টিংয়ে কাঠামোগত ভিত্তি ও অনুমোদনের অবস্থা দেওয়া থাকে। কোনো ভবনের ড্রয়িং আগ্রহী ক্রেতাকে দেখানো না হলে সেটিই উত্তর।",
  },

  Economy: {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "যে অবকাঠামো দাম নড়ায়, আর তা কোন সময়সীমায় নড়ায়।",
      "ঋণের খরচ কীভাবে চাওয়া দামে গিয়ে পৌঁছায়।",
      "কোন সংকেত বাজারের আগে আসে, কোনটি কেবল পিছু নেয়।",
    ],
    sections: [
      {
        heading: "অবকাঠামো চালুর আগেই দাম নড়ে",
        paragraphs: [
          "নতুন করিডোরে দাম সাধারণত দুবার নড়ে: একবার অর্থায়ন নিশ্চিত হলে, আরেকবার পথটি সত্যিই খুলে গেলে। এই দুইয়ের মাঝের ব্যবধানেই বেশিরভাগ রিটার্ন, আবার বেশিরভাগ ঝুঁকিও — কারণ অর্থায়ন হওয়া প্রকল্প মানেই সম্পন্ন প্রকল্প নয়।",
          "এলিভেটেড এক্সপ্রেসওয়ে ও মেট্রোরেলের অ্যালাইনমেন্ট দুটোই এটি দেখিয়েছে। নিশ্চিত অ্যাক্সেস পয়েন্টওয়ালা ব্লকগুলোতে যাত্রী চলাচলের বছরখানেক আগেই দাম বদলে গিয়েছিল, অথচ অ্যালাইনমেন্ট থেকে কয়েকশ মিটার দূরের ব্লকে প্রায় কিছুই বদলায়নি। মানচিত্রে কাছে থাকা আর প্রবেশাধিকার থাকা এক নয়।",
        ],
      },
      {
        heading: "ঋণের খরচই নীরব চালিকাশক্তি",
        paragraphs: [
          "হোম লোনের সুদহার ক্রেতার সংখ্যা নির্ধারণে মনোভাবের চেয়ে অনেক বেশি সরাসরি ভূমিকা রাখে। হার বদলালে প্রভাব আগে দেখা যায় মধ্যবাজারে, যেখানে ক্রেতারা ঋণসীমার কাছাকাছি; উপরের বাজারে পরে, কারণ সেখানে লেনদেন বেশি নগদে হয়।",
          "এ কারণেই দাম কমার শিরোনাম প্রায়ই একসঙ্গে দুটি ভিন্ন বাজারের কথা বলে। এই স্তরগুলো মিলিয়ে একটি নগরব্যাপী গড় বের করলে সংখ্যাটি সত্য হয়, কিন্তু কোনো কাজে আসে না।",
        ],
      },
      {
        heading: "যে সংকেতগুলো আগে আসে",
        paragraphs: [
          "রেজিস্ট্রেশনের সংখ্যা, ইউটিলিটি সংযোগের অনুমোদন আর নির্মাণসামগ্রীর আমদানি — এই তিনটিই চাওয়া দামের আগে ঘোরে। চাওয়া দাম সবার শেষে নড়ে, কারণ বিক্রেতা ধীরে মত বদলান। বাজার কোথায় যাচ্ছে জানতে চাইলে কী বিজ্ঞাপিত হচ্ছে নয়, কী রেজিস্ট্রি হচ্ছে তা দেখুন।",
        ],
      },
    ],
    quote:
      "চাওয়া দাম বলে বিক্রেতা কী আশা করছেন। রেজিস্ট্রেশনের সংখ্যা বলে ক্রেতা কী করেছেন।",
    quoteBy: "জুম প্রপার্টি গবেষণা",
    closing:
      "আমাদের মাসিক মার্কেট মেমো ঢাকা ও চট্টগ্রামের এই সূচকগুলো অনুসরণ করে। এটি বিনামূল্যে, এবং আগের মাসে আমরা ভুল ছিলাম কি না তাও বলে দেয়।",
  },

  Legal: {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "টাকা দেওয়ার আগে যে যাচাইগুলো হতেই হবে।",
      "লেনদেন সবচেয়ে বেশি কোথায় ভেঙে যায়, এবং কেন।",
      "ক্রেতা কোন কোন বিষয় লিখিতভাবে দাবি করতে পারেন।",
    ],
    sections: [
      {
        heading: "আগে যাচাই, পরে সবকিছু",
        paragraphs: [
          "সাব-রেজিস্ট্রি অফিসে টাইটেল সার্চ, এসি ল্যান্ড অফিসে নামজারি যাচাই এবং ভূমি উন্নয়ন কর রেকর্ড পরীক্ষা — এটুকু ন্যূনতম। এই তিনটি মিলে বলে দেয় বিক্রেতা আদৌ বিক্রি করতে পারেন কি না, রাষ্ট্র তাঁকে মালিক মানে কি না, এবং সম্পত্তির বিপরীতে কিছু বকেয়া আছে কি না।",
          "বায়না দেওয়ার পর এটি করলে দর-কষাকষির ক্ষমতা উল্টে যায়। আগে যাচাইয়ের মূল কারণ হলো, তখনো আপনি বিনা খরচে সরে আসতে পারেন — ক্রেতার হাতে এটিই একমাত্র বাস্তব সুরক্ষা।",
        ],
      },
      {
        heading: "চুক্তি যেখানে ভাঙে",
        paragraphs: [
          "অসম্পূর্ণ বণ্টনসহ উত্তরাধিকারসূত্রে পাওয়া সম্পত্তি, অনিবন্ধিত পাওয়ার অব অ্যাটর্নি, আর বিক্রির পর হালনাগাদ না হওয়া পুরোনো নামজারি — আমাদের দেখা বেশিরভাগ ব্যর্থতার কারণ এগুলোই। কোনোটিই বিরল নয়; বায়নার সামান্য ভগ্নাংশ খরচের একটি সার্চেই সবগুলো ধরা পড়ে।",
          "ফ্ল্যাটের ক্ষেত্রে বারবার ফিরে আসা সমস্যাটি হলো জয়েন্ট ভেঞ্চার দলিল আর বাস্তবে যা নির্মিত হয়েছে তার ফারাক। দলিলে মালিককে যে ইউনিট বরাদ্দ, হস্তান্তর তালিকায় তা না থাকলে সেই অসঙ্গতি রেজিস্ট্রেশনের সময় সামনে আসবে — এবং আপনার সমস্যা হয়েই আসবে।",
        ],
      },
      {
        heading: "লিখিত না হলে তা ঘটেনি",
        paragraphs: [
          "টাইটেল অস্পষ্ট হলে ফেরতযোগ্য বায়না, নির্দিষ্ট পরিণামসহ নির্দিষ্ট হস্তান্তরের তারিখ, আর ঠিক কোন ইউনিট ও পার্কিং হস্তান্তর হচ্ছে তার তালিকা — তিনটিই চুক্তিপত্রে থাকা দরকার, আলাপে নয়। যে বিক্রেতা এগুলো লিখতে আপত্তি করেন, তিনি আসলে কিছু একটা জানিয়ে দিচ্ছেন।",
        ],
      },
    ],
    quote:
      "যত বিরোধ নিষ্পত্তিতে আমাদের ডাকা হয়েছে, প্রতিটিই প্রতিরোধ করতে প্রথম মাসের তর্কের চেয়েও কম খরচ হতো।",
    quoteBy: "অ্যাডভোকেট রফিকুল ইসলাম",
    closing:
      "আমাদের আইনি কাজ সাবকন্ট্রাক্ট নয়, নিজস্ব দলের — তাই যে যাচাই ঠিক করে কেনাটি নিরাপদ কি না, তা করেন এমন মানুষেরা যাঁরা ক্রেতার কাছে জবাবদিহি করেন।",
  },

  Technology: {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "কোন প্রযুক্তি খরচ উসুল করে, কোনটি কেবল তালিকার একটি লাইন।",
      "স্মার্ট অবকাঠামো পরিচালন ব্যয়ে কী পার্থক্য আনে।",
      "চোখে না দেখা ব্যবস্থাগুলো নিয়ে ডেভেলপারকে যা জিজ্ঞেস করবেন।",
    ],
    sections: [
      {
        heading: "যেসব ব্যবস্থার জন্য টাকা দেওয়া যায়",
        paragraphs: [
          "মিটারিং, পানি শোধন আর সঠিক মাপের ব্যাকআপ সরবরাহ ভবনের দৈনন্দিন জীবন বদলে দেয়। অ্যাপ দিয়ে নিয়ন্ত্রিত আলো দেয় না। পার্থক্যটি হলো, প্রথম তিনটি পরিচালন ব্যয় ও বাসিন্দাদের বিরোধ কমায়, শেষেরটি কেবল ভিজিটের সময় একবার দেখানো হয়।",
          "বিশেষ করে সাব-মিটারিং শেয়ার্ড ভবনের সবচেয়ে সাধারণ ঝগড়াটি একেবারেই তুলে দেয়, কারণ প্রতিটি ইউনিট ঠিক যতটা ব্যবহার করেছে ততটারই বিল দেয়, করিডোরের বিল নিয়ে কাউকে তর্ক করতে হয় না।",
        ],
      },
      {
        heading: "আসল স্পেসিফিকেশন হলো পরিচালন ব্যয়",
        paragraphs: [
          "ভবনের সার্ভিস চার্জ ঠিক হয়ে যায় নির্মাণের আগেই নেওয়া সিদ্ধান্তে: পাম্পের মাপ, বাসিন্দার তুলনায় লিফটের সংখ্যা, জেনারেটর পুরো লোডের জন্য নাকি কেবল লিফট ও করিডোরের জন্য। প্রতি বর্গফুটে প্রক্ষেপিত সার্ভিস চার্জ এবং তার পেছনের অনুমানগুলো চেয়ে নিন।",
          "ডেভেলপার সেই অনুমান দিতে না পারলে প্রক্ষেপণটি নিছক বিপণনের সংখ্যা। দিতে পারলে আপনার হাতে এমন কিছু থাকে যা ভবনে ভবনে তুলনা করা যায়।",
        ],
      },
      {
        heading: "যা চোখে দেখা যায় না, তা নিয়ে প্রশ্ন",
        paragraphs: [
          "হস্তান্তরের পর ব্যবস্থাগুলো কে রক্ষণাবেক্ষণ করবে, কতদিন, কোন চুক্তিতে? ডেভেলপারের পাঁচ বছরের রক্ষণাবেক্ষণ প্রতিশ্রুতি এবং মালিক সমিতির কাছে অ্যাজ-বিল্ট ড্রয়িং হস্তান্তর — এই ব্যবস্থাটিই বাসিন্দাদের সত্যিকারের সুরক্ষা দেয়। এর চেয়ে কম মেয়াদ মানে ঠিক যন্ত্রপাতি পুরোনো হতে শুরু করার সময়েই ঝুঁকিটি আপনার ঘাড়ে।",
        ],
      },
    ],
    quote: "ভবনটি দেখাতে কত খরচ তা নয়, চালাতে কত খরচ তা জিজ্ঞেস করুন।",
    quoteBy: "জুম প্রপার্টি প্রকল্প দল",
    closing:
      "আমাদের প্রকৌশলীরা প্রতি মাসে প্রতিটি চলমান প্রকল্প পরিদর্শন করেন, আর লিস্টিংয়ে প্রকাশিত অগ্রগতির হিসাবটি তাঁদেরই অনুমোদিত।",
  },

  Lifestyle: {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "আয়তন নয়, দৈনন্দিন রুটিনই ঠিক করে কোথায় থাকবেন।",
      "কিলোমিটারে নয়, যাতায়াতের সময়ে নৈকট্যের হিসাব।",
      "প্রথম বছরের পরেও বাসিন্দারা যেসব সুবিধা ব্যবহার করেন।",
    ],
    sections: [
      {
        heading: "কিলোমিটারে নয়, মিনিটে মাপুন",
        paragraphs: [
          "এই শহরে দুটি ঠিকানার দূরত্ব খুব সামান্যই বলে। একই তিন কিলোমিটার এগারো মিনিটও হতে পারে, পঞ্চাশও — নির্ভর করে আপনি মোড়ের কোন পাশে আছেন এবং সকাল আটটায় কোন দিকে যাচ্ছেন। দুটি এলাকার যেকোনো গুরুত্বপূর্ণ তুলনা করতে হবে যাতায়াতের সময়ে, দুই দিকেই, আপনি যে সময়ে সত্যিই যাবেন সেই সময়ে।",
          "যাঁরা এটি করেন, তাঁদের পছন্দের তালিকা প্রায়ই পুরো উল্টে যায়। করিডোরের সঠিক পাশে একটু ছোট ফ্ল্যাট দুই মোড় দূরের বড় ফ্ল্যাটের চেয়ে সপ্তাহে বেশি কাজের ঘণ্টা ফিরিয়ে দেয়।",
        ],
      },
      {
        heading: "প্রথম বছর পেরিয়ে যা টেকে",
        paragraphs: [
          "ছাদের বাগান, ব্যবহারযোগ্য কমিউনিটি হল আর যথেষ্ট পার্কিং — এগুলো নিয়মিত ব্যবহৃত হয়। মাঝারি ভবনে জাঁকালো জিম আর ইনফিনিটি পুল এক মৌসুম উৎসাহভরে ব্যবহৃত হয়, তারপর সবাই মিলে চিরকাল রক্ষণাবেক্ষণ করে। সার্ভিস চার্জ কিন্তু দুটোর মধ্যে পার্থক্য করে না।",
          "ঢাকার বেশিরভাগ ভবনে সবচেয়ে মূল্যবান সুবিধাটি আসলে সবচেয়ে নিরস: নির্ভরযোগ্য পানি ও বিদ্যুৎ, আর এমন ব্যবস্থাপনা যারা ফোন ধরে।",
        ],
      },
      {
        heading: "স্কুল, ক্লিনিক আর সাপ্তাহিক চক্র",
        paragraphs: [
          "প্রতি সপ্তাহে যেসব জায়গায় যান — স্কুল, ক্লিনিক, বাজার, যে রেস্তোরাঁয় সত্যিই বারবার যান — সেগুলো মানচিত্রে বসান, দেখুন কতগুলো পনেরো মিনিটের বৃত্তে পড়ে। এই পরীক্ষায় ভালো করা এলাকাগুলো বাজারের ওঠানামায়ও ভাড়ার চাহিদা ধরে রাখে, কারণ সেখানকার বাসিন্দারা সহজে জায়গা ছাড়তে চান না।",
        ],
      },
    ],
    quote:
      "ফ্ল্যাট ছোট বলে মানুষ খুব কমই বাসা বদলায়। বদলায় যাতায়াত ক্লান্ত করে ফেলেছে বলে।",
    quoteBy: "জুম প্রপার্টি ক্লায়েন্ট গবেষণা",
    closing:
      "আমাদের প্রকাশিত প্রতিটি এলাকা-গাইডে সরলরৈখিক দূরত্ব নয়, ব্যস্ত সময়ে প্রধান কর্মস্থল করিডোরে পৌঁছানোর সময় দেওয়া থাকে।",
  },

  Market: {
    takeawaysTitle: "এই লেখায় যা আছে",
    takeaways: [
      "বিজ্ঞাপিত দামের বিপরীতে সত্যিই কত দামে লেনদেন হয়েছে।",
      "কোন স্তর সত্যিই নড়েছে আর কোনটি কেবল নড়েছে বলে মনে হয়েছে।",
      "যে গড় দুটি আলাদা বাজার আড়াল করে, তা কীভাবে পড়বেন।",
    ],
    sections: [
      {
        heading: "চাওয়া দাম নয়, লেনদেনের দাম",
        paragraphs: [
          "চাওয়া দাম দুর্বল মাপকাঠি। এটি ধীরে নড়ে, ভিন্ন ভিন্ন তাড়াহুড়োর বিক্রেতারা ঠিক করেন, আর বাজার পেরিয়ে যাওয়ার অনেক পরেও ঝুলে থাকে। রেজিস্ট্রি হওয়া লেনদেনের মূল্য পেতে সময় লাগে বেশি, কাজে লাগে অনেক বেশি।",
          "দুটি যখন আলাদা হয়ে যায় — চাওয়া দাম স্থির অথচ লেনদেনের দাম নামছে — সেই ফারাকটিই আসল খবর। সাধারণত এর মানে লেনদেনের সংখ্যা কমে গেছে এবং কেবল বাধ্য বিক্রেতারাই বিক্রি করছেন; চাওয়া দাম না নামা পর্যন্ত অবস্থাটি চলতেই থাকে।",
        ],
      },
      {
        heading: "স্তরগুলো আলাদাভাবে নড়ে",
        paragraphs: [
          "লেকমুখী ফ্ল্যাট, অভ্যন্তরীণ ব্লক আর তিন হাজার বর্গফুটের বেশি বড় ইউনিট — তিনটি কার্যত তিনটি আলাদা বাজার। এগুলোর গড় করলে যে নগরব্যাপী সংখ্যা আসে তা কোনোটিরই বর্ণনা দেয় না, আর সেই গড়ে দাঁড় করানো যেকোনো শিরোনাম নির্দিষ্ট ও অনুমেয় উপায়ে বিভ্রান্তিকর হবে।",
          "আপনি যে স্তরে কিনছেন সেটিই পড়ুন। কোনো প্রতিবেদন যদি এতটা ভেঙে না দেখায়, সেটির ওপর ভিত্তি করে লেনদেন করা যায় না।",
        ],
      },
      {
        heading: "দামের আগে সংখ্যা",
        paragraphs: [
          "মোড় ঘোরার লক্ষণ আগে দেখা যায় লেনদেনের সংখ্যায়। দাম নামমাত্র স্থির থাকতে থাকতেই লেনদেন কমতে শুরু করে, তারপর দাম অনুসরণ করে। প্রবেশ বা প্রস্থানের সময় ঠিক করতে চাইলে সম্পন্ন চুক্তির সংখ্যাই আগের এবং অধিকতর সৎ সংকেত।",
        ],
      },
    ],
    quote: "তিনটি স্তরের ওপর করা নগরব্যাপী গড় এমন একটি সংখ্যা, যা কোনো কিছুরই সত্য নয়।",
    quoteBy: "জুম প্রপার্টি গবেষণা",
    closing:
      "আমাদের ত্রৈমাসিক পর্যালোচনা ব্লকভিত্তিক প্রকাশিত হয় — যেসব প্রান্তিকে সংখ্যা আমাদের প্রত্যাশার বিপরীতে গিয়েছিল, সেগুলোসহ।",
  },

  Guide: {
    takeawaysTitle: "এই গাইডে যা আছে",
    takeaways: [
      "কোন কাজ কোন ক্রমে করবেন।",
      "প্রতিটি ধাপে খরচ কত আর বাস্তবে সময় কত লাগে।",
      "কোন কোন জায়গায় মত বদলানো তখনো সস্তা।",
    ],
    sections: [
      {
        heading: "ক্রমটা ঠিক রাখুন",
        paragraphs: [
          "এড়ানো যেত এমন বেশিরভাগ ক্ষতি হয় ঠিক কাজগুলো ভুল ক্রমে করার কারণে। দেখার আগে বাজেট নিশ্চিত, বায়নার আগে টাইটেল যাচাই, অগ্রিমের আগে চুক্তিপত্র, হস্তান্তরের আগে রেজিস্ট্রেশন। প্রতিটি ধাপ পরেরটিকে রক্ষা করে, আর লাফিয়ে এগোলে সেই রক্ষাটুকুই থাকে না।",
          "ক্রমটি আপনার দর-কষাকষির ক্ষমতাও ঠিক করে দেয়। টাকা হাতবদলের আগে সবই আলোচনাসাপেক্ষ, পরে প্রায় কিছুই নয় — তাই যে প্রশ্নগুলো আপনার কাছে সবচেয়ে জরুরি, সেগুলো আগে সেরে নিন।",
        ],
      },
      {
        heading: "সময় ও খরচ, সৎভাবে",
        paragraphs: [
          "টাইটেল সার্চে ঘণ্টা নয়, কয়েক দিন লাগে। রেজিস্ট্রেশনের পর নামজারি হালনাগাদে সপ্তাহ, কখনো মাস। ব্যাংক ঋণের অনুমোদন বিক্রেতার সময়সীমা মানে না, নিজের সময়েই চলে। আশাবাদী সময়সীমার ওপর পরিকল্পনা দাঁড় করালে ক্রেতা এমন শর্ত মেনে নেন যা অন্য সময় মানতেন না।",
          "যে খরচগুলো ভুলে যাওয়া সহজ সেগুলোও ধরুন: রেজিস্ট্রেশন ফি ও স্ট্যাম্প ডিউটি, নামজারি খরচ, ইউটিলিটি হস্তান্তর, আর সার্ভিস চার্জ — যা আপনি ওঠার দিন নয়, দখল নেওয়ার দিন থেকেই শুরু হয়।",
        ],
      },
      {
        heading: "যে পথগুলো খোলা রাখবেন",
        paragraphs: [
          "দুটি জায়গায় লিখিত প্রস্থানের সুযোগ রাখুন: টাইটেল সার্চের পরে, আর জরিপ বা পরিদর্শনের পরে। দুটিতেই বায়না পুরোপুরি ফেরত পাওয়ার শর্ত থাকুক। যে বিক্রেতা দুটিতেই রাজি, তিনি জানেন আপনি কী পাবেন — শুরুতেই এর চেয়ে কাজের তথ্য আর হয় না।",
        ],
      },
    ],
    quote:
      "ক্রম মেনে করলে ঝুঁকির বেশিরভাগ নিজেই সরে যায়। ক্রম ভাঙলে যত সাবধানতাই নিন, তা আর ফেরে না।",
    quoteBy: "জুম প্রপার্টি অ্যাডভাইজরি ডেস্ক",
    closing:
      "নিজের পরিস্থিতিতে এটি মিলিয়ে দেখতে চাইলে নির্দিষ্ট কোনো সম্পত্তিতে এগোনোর আগেই আমাদের পরামর্শক দল আপনার সঙ্গে ধাপগুলো ধরে এগোবে।",
  },

  NRB: {
    takeawaysTitle: "এই গাইডে যা আছে",
    takeaways: [
      "রেমিট্যান্সের পথগুলো এবং প্রতিটির জন্য কী কী লাগে।",
      "দেশে না এসে কেনা ও রেজিস্ট্রেশন করা।",
      "করের অবস্থান, এবং তা প্রমাণ করার কাগজপত্র।",
    ],
    sections: [
      {
        heading: "টাকা পরিষ্কারভাবে দেশে আনা",
        paragraphs: [
          "টাকা যে পথে আসে, বছরখানেক পরে বিক্রি বা প্রত্যাবাসনের সময় সেই পথই ঠিক করে দেয় কোন কাগজ লাগবে। এনক্যাশমেন্ট সার্টিফিকেট সংরক্ষণ করে আনুষ্ঠানিক ব্যাংকিং চ্যানেলে আসা অর্থের হিসাব দেওয়া সহজ। অন্য যেকোনো পথে আসা অর্থের নয় — উৎস যত বৈধই হোক।",
          "প্রতিটি সার্টিফিকেট রেখে দিন। যে কাগজ প্রমাণ করে কেনাটির অর্থ কোথা থেকে এসেছে, সেই কাগজই বিক্রির অর্থ প্রত্যাবাসনের সমর্থন দেয় — আর পরে তা পুনর্গঠন করা কঠিন থেকে অসম্ভবের মধ্যে ঘোরাফেরা করে।",
        ],
      },
      {
        heading: "দেশে না এসে কেনা",
        paragraphs: [
          "আপনার বসবাসের দেশের মিশনে সঠিকভাবে সত্যায়িত একটি নিবন্ধিত পাওয়ার অব অ্যাটর্নি থাকলে বিশ্বস্ত প্রতিনিধি আপনার পক্ষে রেজিস্ট্রেশন সম্পন্ন করতে পারেন। ব্যর্থতার দুটি জায়গা: ভুলভাবে করা সত্যায়ন, আর এত সংকীর্ণভাবে লেখা পাওয়ার অব অ্যাটর্নি যে প্রয়োজনীয় স্বাক্ষরগুলোই কভার করে না।",
          "সাধারণ টেমপ্লেট ব্যবহার না করে নির্দিষ্ট লেনদেনের জন্যই পরিধি লেখান, আর মিশনে যাওয়ার আগে সত্যায়নের শর্ত নিশ্চিত করে নিন। দুটোই এড়ানো যায় এমন বিলম্ব, অথচ নিয়মিত কয়েক মাস খরচ করায়।",
        ],
      },
      {
        heading: "যে অবস্থানটি প্রমাণ করতে হবে",
        paragraphs: [
          "আপনার আবাসিক অবস্থা, অর্থের উৎস এবং দুই দেশের মধ্যে চুক্তিভিত্তিক অবস্থান — এই তিনটি মিলে ঠিক করে কোথায় কী দিতে হবে। কেনার আগেই দুই দেশের পরামর্শকের কাছ থেকে এটি লিখিতভাবে নিশ্চিত করুন; পরে করলে আপনি অনেক দুর্বল অবস্থান থেকে আলোচনা করবেন।",
        ],
      },
    ],
    quote:
      "যে সার্টিফিকেটটি আজ গুছিয়ে রাখার সময় হয় না, সেটিই পরে ছয় মাস ধরে খুঁজতে হয়।",
    quoteBy: "অ্যাডভোকেট রফিকুল ইসলাম",
    closing:
      "আমাদের এনআরবি ডেস্ক নিয়মিত পাওয়ার অব অ্যাটর্নির মাধ্যমে রেজিস্ট্রেশন সামলায় এবং শুরুতেই জানিয়ে দেয় আপনার পরিকল্পনার কোন অংশটি কাজ করবে না।",
  },
};

/** Category packs, per locale. `All` is a filter value and never a post's category. */
const PACKS: Record<Locale, Record<CategoryKey, Pack>> = { en: EN, bn: BN };

function packFor(category: BlogCategory, locale: Locale): Pack {
  const packs = PACKS[locale] ?? EN;
  // "All" only ever appears in the filter UI, but the type allows it.
  return packs[(category === "All" ? "Real Estate" : category) as CategoryKey];
}

/**
 * The body of one article, as blocks. The lead is the post's own excerpt, so
 * the detail page opens with the same sentence the card promised.
 */
export function articleBlocks(insight: Insight, locale: Locale): ArticleBlock[] {
  const isBn = locale === "bn";
  const pack = packFor(insight.category, locale);
  const lead = isBn && insight.excerptBn ? insight.excerptBn : insight.excerpt;

  const blocks: ArticleBlock[] = [
    { type: "lead", text: lead },
    { type: "list", title: pack.takeawaysTitle, items: pack.takeaways },
  ];

  pack.sections.forEach((section, index) => {
    blocks.push({ type: "heading", text: section.heading });
    section.paragraphs.forEach((text) => blocks.push({ type: "paragraph", text }));

    // The quote lands after the first section, where a reader's attention dips.
    if (index === 0) {
      blocks.push({ type: "quote", text: pack.quote, attribution: pack.quoteBy });
    }
  });

  blocks.push({ type: "paragraph", text: pack.closing });

  return blocks;
}
