/*
  ============================================================
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
  ============================================================
  You never need to touch index.html, styles.css or main.js.

  Adding a clip:
    Find the category below and add an entry to its `clips` list:

      {
        title: "Customer AI ordering system",
        description: "NPCs path to the counter, order, wait and leave. Server-side queue.",
        url: "https://youtu.be/XXXXXXXXXXX",
        tags: ["Pathfinding", "OOP"]
      },

    `url` can be:
      - a YouTube link (youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/...)
      - a Streamable link (streamable.com/xxxxx)
      - a video file in this repo, e.g. "media/combat-demo.mp4" (keep it small)
      - an image or GIF in this repo, e.g. "media/shop-ui.png"

  A category with no clips is hidden automatically, so empty sections
  never show up on the live site.
*/

window.PORTFOLIO = {
  handle: "Jovaire",
  name: "Reece Harper",
  role: "Full-time Roblox Scripter",
  tagline:
    "Secure, optimised Luau systems for Roblox games — from NPC pathfinding and economies to anti-cheat and full gameplay loops.",
  startedYear: 2020,
  age: 22,
  languages: ["English", "Español"],

  discord: "rh01o",

  about: [
    "I've been scripting on Roblox since 2020 and work on it full-time. I build the systems that make a game actually run: gameplay loops, NPC behaviour, economies, data saving and the security that keeps exploiters out.",
    "Everything I write is server-authoritative and built to scale, so it stays fast with a full server and doesn't fall apart when someone tries to exploit it. I work in clean, modular OOP that other developers can pick up and extend.",
    "I fit into your setup: plain Studio, or Knit and Rojo if that's what your project uses."
  ],

  specialities: [
    {
      title: "Pathfinding & NPC AI",
      text: "Customers, enemies and workers that navigate reliably, handle blocked paths and stay cheap on the server."
    },
    {
      title: "Economies",
      text: "Currencies, shops, upgrades, rebirths and progression, balanced and validated on the server."
    },
    {
      title: "Anti-Cheat & Security",
      text: "Remote validation, rate limiting and server-side checks that stop exploits instead of just logging them."
    },
    {
      title: "Full Game Systems",
      text: "Front-end and back-end: round systems, inventories, data saving and the client/server glue between them."
    }
  ],

  skills: {
    "Core": ["Luau", "OOP / Modules", "Client–Server Networking", "DataStores", "Optimisation"],
    "Systems": ["Pathfinding", "Economies", "Anti-Cheat", "Combat", "Simulators", "UI Scripting"],
    "Tools": ["Roblox Studio", "Knit", "Rojo"]
  },

  // The kinds of games you build for. Shown as chips in the hero.
  genres: ["Restaurants", "Simulators", "Combat"],

  // Clip sections. Add clips to whichever fit. Empty sections stay hidden.
  categories: [
    {
      id: "restaurant",
      title: "Restaurants & Cafés",
      blurb: "Cooking, ordering, customer AI and staff systems.",
      clips: []
    },
    {
      id: "simulator",
      title: "Simulators",
      blurb: "Progression loops, pets, rebirths and upgrades.",
      clips: []
    },
    {
      id: "combat",
      title: "Combat",
      blurb: "Hit detection, abilities, cooldowns and damage, all server-validated.",
      clips: []
    },
    {
      id: "pathfinding",
      title: "Pathfinding & NPC AI",
      blurb: "NPCs that find their way and react to the world.",
      clips: []
    },
    {
      id: "economy",
      title: "Economy & Shops",
      blurb: "Currencies, shops, trading and data saving.",
      clips: []
    },
    {
      id: "anticheat",
      title: "Anti-Cheat & Security",
      blurb: "Exploit protection and server-side validation.",
      clips: []
    },
    {
      id: "ui",
      title: "UI & Other Systems",
      blurb: "Scripted interfaces and everything else.",
      clips: []
    }
  ],

  /*
    Games / studios you've worked for. Leave empty to hide the section.
    Example:
      {
        game: "Burger Rush",
        link: "https://www.roblox.com/games/123456789",
        role: "Lead Scripter",
        period: "2024",
        summary: "Built the ordering, cooking and customer AI systems.",
        stats: "2M+ visits"
      },
  */
  experience: [],

  commissions: {
    summary: "Every project is different, so I quote per job. Message me on Discord with what you need and I'll get back to you with a price and timeline.",
    terms: [
      { title: "Quote-based pricing", text: "You get a fixed quote before any work starts." },
      { title: "50% upfront", text: "Half up front to start, the rest when the work is delivered." },
      { title: "Bank transfer or Robux", text: "These are the only payment methods I accept." },
      { title: "Assets provided by you", text: "Models, UI designs and animations come from you. I script everything around them." }
    ]
  }
};
