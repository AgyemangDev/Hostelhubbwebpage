// data/newsData.js
//
// Plain JS module — no fetch, no JSON.parse at request time.
// Import this ONLY inside Server Components / lib/news.js (build time),
// never inside a client component.

const newsData = [
 {
    id: 5,
    slug: "student-storage-tips-semester-break",
    title: "Don't Drag Your Whole Room Home This Break — Let HostelHubb Store It",
    excerpt:
      "Luggages, mini-fridges, electrical appliances, boxes of clothes — none of it needs to survive a trotro/bus ride home and back. Reserve HostelHubb Storage and we'll pick up your items and deliver them right back when school resumes.",
    category: "Storage & Moving Tips",
    author: "HostelHubb Team",
    date: "2026-06-20",
    coverImage: "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2017/05/shop-2148839_1920.jpg",
    imageAlt: "Storage boxes and a suitcase packed in a student room",
    content: [
      "Semester breaks bring a question a lot of students put off until the last minute: what actually happens to everything in your room while you're gone? Mattresses, mini-fridges, cooking equipment, boxes of clothes — none of it fits neatly into a single trotro ride home, and paying to move it all twice a year adds up fast.",
      "The default option, hauling everything back and forth yourself, is expensive and exhausting. It usually means arriving home with more bags than you left with, only to repeat the whole process in reverse a few weeks later — and anything that gets damaged or lost along the way is on you.",
      "You don't have to be the one carrying it. HostelHubb Storage picks your items up directly from your room before you travel, holds them securely for the break, and delivers everything back the moment school resumes — no trotro negotiations, no borrowed car boot, no lugging a mattress through a bus station.",
      "It's built to be the cheapest way to skip the back-and-forth entirely, so break planning is one less thing on your list. Reserve your HostelHubb Storage spot before you travel, and let us handle the pickup, safekeeping, and delivery.",
    ],
  },
];

export default newsData;