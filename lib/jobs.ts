export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  posted: string; // display date
  summary: string; // listing card blurb
  intro: string; // job detail lead line
  roleLead: string;
  role: string[];
  who: string[];
  offer: string[];
};

/**
 * Source of truth for open roles: Drive › Docs from SD › 01-project-overview.md.
 * "Production Supervisor" copy matches the designed Figma job-detail page 1:1;
 * the other five roles follow the same structure and brand voice.
 */
export const JOBS: Job[] = [
  {
    slug: "production-supervisor",
    title: "Production Supervisor",
    team: "Manufacturing",
    location: "An Khánh Ward, HCMC",
    type: "Full-time",
    posted: "5 May 2026",
    summary: "Run the line. Build the silos that ship around the world.",
    intro:
      "Lead a shift on the new Silbloxx Asia production line. You keep output, quality, and safety on track every day.",
    roleLead:
      "You take ownership of daily production on the shop floor — people, throughput, and quality.",
    role: [
      "Plan and supervise 15–25 operators across welding, assembly, and finishing",
      "Translate production plans into daily targets, follow up on output and quality",
      "Enforce safety procedures and keep the work environment orderly",
      "Report progress, blockers, and improvement ideas to the Plant Manager",
    ],
    who: [
      "3+ years supervising production in steel fabrication, heavy equipment, or similar",
      "Comfortable reading technical drawings and bills of materials",
      "Practical English; Vietnamese native",
      "Calm under pressure, decisive, fair with your team",
    ],
    offer: [
      "Leadership role in a brand-new facility, from day one",
      "Direct line to the Plant Manager and group operations leadership",
      "Training in Belgium or Germany during your first year",
      "Competitive salary with shift and performance allowances",
    ],
  },
  {
    slug: "purchase-manager",
    title: "Purchase Manager",
    team: "Operations",
    location: "Ho Chi Minh City",
    type: "Full-time",
    posted: "5 May 2026",
    summary: "Build the local supply base that keeps the line moving.",
    intro:
      "Own procurement for the new Silbloxx Asia facility — from raw steel to consumables. You build a reliable, cost-smart local supply base.",
    roleLead:
      "You set up and run purchasing for a facility that is scaling from zero.",
    role: [
      "Source and qualify local suppliers for steel, coatings, and components",
      "Negotiate pricing, lead times, and terms against production plans",
      "Manage purchase orders, stock levels, and supplier performance",
      "Work closely with production and group procurement in Belgium",
    ],
    who: [
      "5+ years in procurement, ideally in manufacturing or construction supply",
      "Strong negotiator with a feel for total cost, not just unit price",
      "Fluent Vietnamese; working English",
      "Organised, hands-on, and comfortable building processes from scratch",
    ],
    offer: [
      "Shape the supply chain of a new plant from the ground up",
      "Exposure to an international industrial group",
      "Training and knowledge transfer from group procurement",
      "Competitive salary with performance component",
    ],
  },
  {
    slug: "qa-qc-engineer",
    title: "QA / QC Engineer",
    team: "Quality",
    location: "An Khánh Ward, HCMC",
    type: "Full-time",
    posted: "5 May 2026",
    summary: "Hold the line on quality — to group and ISO 9001 standards.",
    intro:
      "Own quality on the shop floor as Silbloxx Asia builds toward ISO 9001 in year one. You make sure every silo leaves the plant right.",
    roleLead:
      "You define and enforce the quality standards for a facility being built from scratch.",
    role: [
      "Set up inspection points across welding, coating, and assembly",
      "Run incoming, in-process, and final quality checks against drawings",
      "Build the documentation base toward ISO 9001 certification",
      "Drive corrective actions with production when issues appear",
    ],
    who: [
      "3+ years in QA/QC within steel fabrication or heavy manufacturing",
      "Confident reading technical drawings, weld symbols, and specs",
      "Familiar with ISO 9001 — bonus if you've helped certify a site",
      "Practical English; Vietnamese native",
    ],
    offer: [
      "Own the quality function of a brand-new facility",
      "Direct involvement in the ISO 9001 certification journey",
      "Training in Belgium or Germany during your first year",
      "Competitive salary with performance allowances",
    ],
  },
  {
    slug: "maintenance-technician",
    title: "Maintenance Technician",
    team: "Manufacturing",
    location: "An Khánh Ward, HCMC",
    type: "Full-time",
    posted: "5 May 2026",
    summary: "Keep welding robots and coating lines running at full tilt.",
    intro:
      "Keep the machines that build the silos running. You handle preventive and reactive maintenance across the new production line.",
    roleLead:
      "You keep welding, coating, and handling equipment available and safe.",
    role: [
      "Carry out preventive maintenance on production and utility equipment",
      "Diagnose and fix mechanical, electrical, and pneumatic faults",
      "Keep spare parts and maintenance records in order",
      "Support installation and commissioning of new machines",
    ],
    who: [
      "3+ years in industrial maintenance, ideally in manufacturing",
      "Solid mechanical and electrical troubleshooting skills",
      "Able to read machine manuals and electrical diagrams",
      "Reliable, safety-minded, and willing to learn new equipment",
    ],
    offer: [
      "Work on modern, largely automated production equipment",
      "Training from group engineering and equipment suppliers",
      "Clear path to senior and lead maintenance roles",
      "Competitive salary with shift allowances",
    ],
  },
  {
    slug: "hr-admin-officer",
    title: "HR & Admin Officer",
    team: "People & Admin",
    location: "An Khánh Ward, HCMC",
    type: "Full-time",
    posted: "5 May 2026",
    summary: "Help build the team behind a facility scaling to 120+.",
    intro:
      "Support the people side of a facility growing from zero to 120+. You keep HR and admin running smoothly as the team scales.",
    roleLead:
      "You handle day-to-day HR and office administration for the new plant.",
    role: [
      "Coordinate recruitment, onboarding, and employee records",
      "Manage contracts, payroll inputs, and local compliance",
      "Keep the office and site admin running day to day",
      "Be the first point of contact for the local team's HR questions",
    ],
    who: [
      "3+ years in HR and/or office administration",
      "Familiar with Vietnamese labour law and payroll basics",
      "Fluent Vietnamese; working English",
      "Organised, discreet, and people-first",
    ],
    offer: [
      "Grow with the team you help build",
      "Broad HR and admin scope in a lean, scaling organisation",
      "Support from group HR and operations leadership",
      "Competitive salary and benefits",
    ],
  },
  {
    slug: "site-safety-officer",
    title: "Site Safety Officer",
    team: "HSE",
    location: "An Khánh Ward, HCMC",
    type: "Full-time",
    posted: "5 May 2026",
    summary: "Make safety the default on a brand-new industrial site.",
    intro:
      "Own health and safety as Silbloxx Asia builds and commissions its new facility. You make safe work the default, not the exception.",
    roleLead:
      "You set up and run the HSE programme for a facility being built from scratch.",
    role: [
      "Build site HSE procedures, risk assessments, and toolbox routines",
      "Run inductions, drills, and regular safety walks",
      "Investigate incidents and drive corrective actions",
      "Keep the site compliant with local and group HSE standards",
    ],
    who: [
      "3+ years in HSE on an industrial or construction site",
      "Recognised safety qualification (or equivalent experience)",
      "Practical English; Vietnamese native",
      "Firm, fair, and visible on the floor",
    ],
    offer: [
      "Set the HSE culture of a new facility from day one",
      "Direct line to plant and group leadership",
      "Training and certification support",
      "Competitive salary with allowances",
    ],
  },
];

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug);
