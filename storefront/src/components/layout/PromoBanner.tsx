import { Zap, Truck, ShieldCheck, Tag, Sparkles } from "lucide-react";

export function PromoBanner() {
  const announcements = [
    { icon: Zap, text: "🔥 VENTES FLASH JUSQU'À -40% SUR LES CLIMATISEURS & HIGH-TECH" },
    { icon: Truck, text: "🚚 LIVRAISON EXPRESS OFFERTE DÈS 200 000 FCFA" },
    { icon: ShieldCheck, text: "💳 PAIEMENT 100% SÉCURISÉ EN ESPÈCES À LA LIVRAISON (COD)" },
    { icon: Tag, text: "✨ NOUVELLE COLLECTION IFPTIE-AC 2026 DISPONIBLE" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0D6E64] via-[#1A9B8C] to-[#0D6E64] text-white py-2 overflow-hidden border-b border-[#1A9B8C]/40 select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* First repetition */}
        <div className="flex items-center gap-12 shrink-0">
          {announcements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span key={`a-${idx}`} className="flex items-center gap-2 text-xs font-extrabold tracking-wide uppercase">
                <Icon className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                <span>{item.text}</span>
                <span className="text-white/40 ml-8">•</span>
              </span>
            );
          })}
        </div>

        {/* Second repetition for infinite seamless scroll */}
        <div className="flex items-center gap-12 shrink-0">
          {announcements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span key={`b-${idx}`} className="flex items-center gap-2 text-xs font-extrabold tracking-wide uppercase">
                <Icon className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                <span>{item.text}</span>
                <span className="text-white/40 ml-8">•</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
