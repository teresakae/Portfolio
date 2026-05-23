import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import SiteShell from "@/components/layout/SiteShell"; 

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teresa Kae",
  description: "Full-stack developer & product engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans" style={{ backgroundColor: '#050810' }}>
        <LenisProvider>
          <SiteShell>
            <Navbar />
            {children}
          </SiteShell>
        </LenisProvider>
      </body>
    </html>
  );
}
