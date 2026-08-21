import type { Metadata } from "next";
import { Archivo_Black, Gruppo } from "next/font/google";
import "./globals.css";

/**
 * Fallback display face. The real face is Druk Text Medium, loaded via
 * @font-face in globals.css from /public/fonts. This must NOT claim the
 * `--font-display` variable: next/font sets its variable on <html>, which
 * would override the @theme stack and drop "Druk Text" from the front of it.
 */
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
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
      {/* No `bg-paper`/`text-ink` here: white fought the #F9F9F9 ground the
          grain layer paints, and `text-ink` forced pure black onto everything
          inheriting from body, overriding the ink hierarchy set in globals. */}
      <body className="grain relative min-h-full">{children}</body>
    </html>
  );
}
