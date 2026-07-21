// data/newsData.js
//
// Plain JS module — no fetch, no JSON.parse at request time.
// Import this ONLY inside Server Components / lib/news.js (build time),
// never inside a client component.

const newsData = [
{
    id: 6,
    slug: "affordable-secure-storage-no-hidden-fees",
    title: "Stop Dragging Luggage AND Overpaying for Storage — HostelHubb Has a Cheaper Way",
    excerpt:
      "Don't drag your things home by bus, and don't overpay to store them either. HostelHubb gives you a simple, cheap, secure alternative — with free pickup and delivery to your next accommodation.",
    category: "Storage & Moving Tips",
    author: "HostelHubb Team",
    date: "2026-07-21",
    coverImage: "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2017/05/shop-2148839_1920.jpg",
    imageAlt: "Student storage boxes ready for pickup",
    content: [
      "Every semester break, students face two problems, not just one. The first is obvious: dragging mattresses, mini-fridges, and boxes of clothes home by bus or trotro, then dragging it all back a few weeks later. The second is one people don't talk about enough: what it actually costs to store those things somewhere else in the meantime.",
      "A lot of storage options out there charge extravagant fees for something that should be simple — you're just asking someone to hold your items safely for a few weeks. There's no reason that should come with a steep price tag on top of the stress of moving everything in the first place.",
      "HostelHubb offers a simpler, cheaper way to handle both problems at once. Our storage is secure and budget-friendly, without the excessive charges some services tack on. You're not paying for extravagance — just honest, affordable safekeeping.",
      "And you don't have to lift a finger to get your things there or back. Pickup is free, and so is delivery straight to your next accommodation when the new academic year starts. We collect your items before you travel, store them securely, and bring them right to your new hostel or room when school resumes — no bus fare, no negotiating with a driver, no carrying a mattress through a station.",
      "Stop struggling with luggage, and stop overpaying to store it. Reserve your HostelHubb Storage spot and let us handle the rest — simply, securely, and affordably.",
    ],
  },
];

export default newsData;