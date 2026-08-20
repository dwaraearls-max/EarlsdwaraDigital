import { buildWhatsAppUrl } from "@/lib/share";
import { formatCurrency } from "@/lib/utils";

export const websitePromo = {
  name: "August Website Promo",
  price: 1500,
  timeZone: "Africa/Accra",
  teaserStart: "2026-08-18",
  start: "2026-08-21",
  end: "2026-08-31",
  headline: "All website types for GH₵1,500",
  shortRange: "21–31 August",
  longRange: "21 August – 31 August 2026",
  types: [
    "Landing pages",
    "Business websites",
    "E-commerce stores",
    "Custom development",
    "Website redesigns",
    "Portfolio sites",
  ],
  websiteSlugs: [
    "website-design",
    "web-development",
    "ecommerce",
    "landing-pages",
    "website-redesign",
  ],
  faq: {
    question: "What’s included in the August GH₵1,500 website promo?",
    answer:
      "From 21–31 August 2026, every website type — landing pages, business sites, e-commerce stores, custom builds, and redesigns — is GH₵1,500. Choose your website type, enter the details we need to build it, and send the brief on WhatsApp.",
  },
} as const;

export const promoFormPath = "/promo";

export const promoWebsiteTypes = [
  {
    id: "landing-page",
    label: "Landing Page",
    description: "One high-converting page for ads, events, or a single offer.",
  },
  {
    id: "business-website",
    label: "Business Website",
    description: "A full site for your company, church, school, restaurant, or brand.",
  },
  {
    id: "ecommerce-store",
    label: "E-Commerce Store",
    description: "Sell products online with cart, checkout, and product pages.",
  },
  {
    id: "portfolio-site",
    label: "Portfolio Site",
    description: "Showcase work, projects, or a personal brand.",
  },
  {
    id: "website-redesign",
    label: "Website Redesign",
    description: "Rebuild an existing site so it looks better and converts more.",
  },
  {
    id: "custom-website",
    label: "Custom Website",
    description: "A tailored build with special features or workflows.",
  },
] as const;

export const promoPageOptions = [
  "Home",
  "About",
  "Services",
  "Products",
  "Contact",
  "Gallery",
  "Blog",
  "Shop",
  "Menu",
  "Testimonials",
  "Booking",
  "FAQ",
];

export const promoFeatureOptions = [
  "Contact form",
  "WhatsApp button",
  "Photo gallery",
  "Online payments",
  "Appointment booking",
  "Google Map",
  "Blog",
  "Newsletter signup",
];

export const promoGoals = [
  "Get more customers and enquiries",
  "Sell products online",
  "Take bookings or reservations",
  "Share information about my brand",
  "Showcase my work or portfolio",
  "Promote an event or offer",
];

export const promoContentOptions = [
  "I have all text and photos",
  "I have some content",
  "I need help with content",
];

export const promoStyleOptions = [
  "Luxury / gold",
  "Clean and minimal",
  "Bold and modern",
  "Warm and friendly",
  "Corporate / professional",
  "I’ll describe my own style",
];

export type PromoWebsiteTypeId = (typeof promoWebsiteTypes)[number]["id"];

export type PromoOrder = {
  websiteType: string;
  name: string;
  phone: string;
  email: string;
  business: string;
  industry: string;
  goal: string;
  pages: string[];
  features: string[];
  existingUrl: string;
  style: string;
  content: string;
  notes: string;
};

export type PromoStatus = "hidden" | "upcoming" | "active" | "ended";

export type PromoCountdown = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
};

function formatYmdInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getPromoStatus(now = new Date()): PromoStatus {
  const today = formatYmdInZone(now, websitePromo.timeZone);
  if (today > websitePromo.end) return "ended";
  if (today >= websitePromo.start) return "active";
  if (today >= websitePromo.teaserStart) return "upcoming";
  return "hidden";
}

export function isPromoVisible(now = new Date()) {
  const status = getPromoStatus(now);
  return status === "upcoming" || status === "active";
}

export function isPromoActive(now = new Date()) {
  return getPromoStatus(now) === "active";
}

export function isPromoWebsiteService(slug: string) {
  return websitePromo.websiteSlugs.includes(
    slug as (typeof websitePromo.websiteSlugs)[number],
  );
}

export function getPromoCountdown(now = new Date()): PromoCountdown | null {
  const status = getPromoStatus(now);
  if (status !== "upcoming" && status !== "active") return null;

  const target =
    status === "upcoming"
      ? new Date(`${websitePromo.start}T00:00:00+00:00`)
      : new Date(`${websitePromo.end}T23:59:59.999+00:00`);

  const total = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(total / 1000);

  return {
    total,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    label: status === "upcoming" ? "Starts in" : "Ends in",
  };
}

export function getPromoPriceLabel() {
  return formatCurrency(websitePromo.price);
}

export function getPromoBudgetOption() {
  return `August promo — ${getPromoPriceLabel()}`;
}

export function getPromoWhatsAppMessage() {
  return `Hi Earlsdwara Digital — I want to claim the ${websitePromo.name}: any website type at ${getPromoPriceLabel()} (${websitePromo.longRange}). Please send next steps on WhatsApp.`;
}

export function getPromoWhatsAppUrl() {
  return buildWhatsAppUrl(getPromoWhatsAppMessage());
}

export function getPromoEntryHref(pathname?: string) {
  return pathname === "/" ? "#promo" : promoFormPath;
}

export function getPromoWebsiteType(id: string) {
  return promoWebsiteTypes.find((type) => type.id === id);
}

export function buildPromoOrderMessage(order: PromoOrder) {
  const lines = [
    `Hi Earlsdwara Digital — I want to claim the ${websitePromo.name} at ${getPromoPriceLabel()}.`,
    "",
    `Website type: ${order.websiteType}`,
    `Name: ${order.name}`,
    `WhatsApp / phone: ${order.phone}`,
    `Email: ${order.email}`,
    `Business / brand: ${order.business}`,
    `What I do: ${order.industry}`,
    `Website goal: ${order.goal}`,
    `Pages: ${order.pages.length ? order.pages.join(", ") : "Recommend for me"}`,
    `Features: ${order.features.length ? order.features.join(", ") : "Recommend for me"}`,
  ];

  if (order.existingUrl) lines.push(`Current website: ${order.existingUrl}`);
  if (order.style) lines.push(`Style: ${order.style}`);
  if (order.content) lines.push(`Content: ${order.content}`);
  if (order.notes) lines.push(`Details: ${order.notes}`);

  lines.push("", "Please start my website with these details.");
  return lines.join("\n");
}

export function getPromoOrderWhatsAppUrl(order: PromoOrder) {
  return buildWhatsAppUrl(buildPromoOrderMessage(order));
}
