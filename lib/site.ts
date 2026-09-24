/**
 * Site-wide settings: domain, contact details and outbound links.
 * Update values here rather than in individual components.
 */

/**
 * Public URL of the deployed site, used for canonical and Open Graph URLs.
 * Set `NEXT_PUBLIC_SITE_URL` in the hosting environment before launch.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Silbloxx Asia";

export const SITE_DESCRIPTION =
  "Silbloxx Asia is the Vietnamese arm of Silbloxx, part of the BRIAM Group. Join the team building our new manufacturing facility in Ho Chi Minh City.";

export const CAREERS_EMAIL = "careers.asia@silbloxx.com";

export const CAREERS_PHONE = "+84 769 08 61 14";

export const EXTERNAL_LINKS = {
  aboutSilbloxx: "https://www.silbloxx.com/en/about-us",
  aboutBriam: "https://www.briamgroup.com/company",
  terms: "https://www.silbloxx.com/en/terms-and-conditions-0",
  cookies: "https://www.silbloxx.com/en/cookie-policy",
} as const;

export const SOCIAL_LINKS = [
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/silbloxx" },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/silbloxx",
  },
  { platform: "youtube", label: "Youtube", href: "https://www.youtube.com/@silbloxx" },
] as const;

export type Office = {
  name: string;
  address: readonly string[];
  email: string;
  phone: string;
};

export const OFFICES: readonly Office[] = [
  {
    name: "Head Office",
    address: ["Silbloxx HQ — Belgium", "BRIAM Group"],
    email: "hq@silbloxx.com",
    phone: "+32 11 00 00 00",
  },
  {
    name: "Asia Sales Office",
    address: ["75 High Street", "Singapore 179435", "Singapore"],
    email: "sales.asia@silbloxx.com",
    phone: "+65 0000 0000",
  },
  {
    name: "Manufacturing",
    address: ["An Khánh Ward", "Ho Chi Minh City, Vietnam"],
    email: CAREERS_EMAIL,
    phone: "+84 28 0000 0000",
  },
];
