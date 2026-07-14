import type { Metadata } from "next";
import { Archivo_Black, Gruppo } from "next/font/google";
import "./globals.css";

/**
 * Display face — brand primary is the licensed "Druk Wide Bold".
 * Archivo Black is the brand-sanctioned free fallback (see brand guidelines).
 * Drop DrukWide-Bold.woff2 into app/fonts and swap to next/font/local to go 1:1.
 */
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Body face — Gruppo Regular (brand secondary, Google Fonts). */
const body = Gruppo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://careers.silbloxx.asia"),
  title: {
    default: "Silbloxx Asia — Careers",
    template: "%s — Silbloxx Asia",
  },
  description:
    "Silbloxx Asia is the Vietnamese arm of Silbloxx, part of the BRIAM Group. Join us building the new Ho Chi Minh City manufacturing facility.",
  openGraph: {
    title: "Silbloxx Asia — Careers",
    description:
      "Your reliable supplier of innovative silos. Build the new Silbloxx Asia facility in Ho Chi Minh City.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="grain relative min-h-full bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
