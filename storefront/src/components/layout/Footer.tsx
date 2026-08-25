import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Col */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white border border-slate-200 p-0.5 shrink-0">
              <Image
                src="/logo.jpg"
                alt="IFPTIE-AC Market"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-heading font-extrabold text-lg text-slate-900">
              <span className="text-[#0D9488]">IFPTIE-AC</span> <span className="text-[#D97706]">MARKET</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed">
            La destination e-Commerce de référence pour des équipements de climatisation Inverter, de la mode tendance et des produits high-tech certifiés.
          </p>
        </div>

        {/* Categories Col */}
        <div>
          <h4 className="font-heading font-bold text-slate-900 text-sm mb-3">Rayons</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><Link href="/catalog?category=climatisation-ac" className="hover:text-[#0D9488]">Climatiseurs & Confort Inverter</Link></li>
            <li><Link href="/catalog?category=mode-luxe" className="hover:text-[#0D9488]">Mode & Streetwear</Link></li>
            <li><Link href="/catalog?category=high-tech" className="hover:text-[#0D9488]">High-Tech & Gadgets Connectés</Link></li>
            <li><Link href="/catalog?category=accessoires-chaussures" className="hover:text-[#0D9488]">Chaussures & Maroquinerie</Link></li>
          </ul>
        </div>

        {/* Info Col */}
        <div>
          <h4 className="font-heading font-bold text-slate-900 text-sm mb-3">Informations & Aide</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><span className="hover:text-[#0D9488] cursor-pointer">Paiement à la livraison (COD)</span></li>
            <li><span className="hover:text-[#0D9488] cursor-pointer">Zones et délais de livraison</span></li>
            <li><span className="hover:text-[#0D9488] cursor-pointer">Garantie & retours</span></li>
            <li><span className="hover:text-[#0D9488] cursor-pointer">Foire aux questions (FAQ)</span></li>
          </ul>
        </div>

        {/* Contact Col */}
        <div>
          <h4 className="font-heading font-bold text-slate-900 text-sm mb-3">Service Client</h4>
          <p className="text-xs text-slate-500 mb-3">
            Assistance directe pour vos commandes et conseils techniques.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
            <div className="text-slate-500">Téléphone / WhatsApp :</div>
            <a href="tel:+221770000000" className="font-bold text-slate-900 text-sm flex items-center gap-2 hover:text-[#0D9488]">
              <PhoneCall className="w-4 h-4 text-[#0D9488]" />
              <span>+221 77 000 00 00</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        © 2026 IFPTIE-AC MARKET — Propulsé par Next.js 15 & Bagisto Commerce Engine.
      </div>
    </footer>
  );
}
