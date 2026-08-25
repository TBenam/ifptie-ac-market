import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/product/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { LiveSocialProof } from "@/components/layout/LiveSocialProof";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "IFPTIE-AC MARKET — Mode, High-Tech & Tendances | Cameroun (Paiement COD)",
  description: "Plateforme e-Commerce officielle IFPTIE-AC Market. Mode streetwear, gadgets connectés et accessoires. Livraison express à Douala, Yaoundé et tout le Cameroun.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${inter.variable}`}>
      <body className="bg-[#FAFAFA] text-slate-900 min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <LiveSocialProof />
      </body>
    </html>
  );
}
