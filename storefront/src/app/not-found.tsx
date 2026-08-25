import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center space-y-6 max-w-lg">
      <div className="relative w-20 h-20 mx-auto opacity-70">
        <Image
          src="/logo.jpg"
          alt="IFPTIE-AC Market"
          fill
          className="object-contain"
        />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#1A9B8C] bg-[#1A9B8C]/10 px-3 py-1 rounded-full">
          ERREUR 404
        </span>
        <h1 className="font-heading text-3xl font-black text-slate-900 mt-2">
          Page Introuvable
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          La page que vous recherchez n'existe pas ou a été déplacée. Explorez nos collections de produits disponibles.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A9B8C] text-white font-bold text-xs hover:bg-[#0D6E64] transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'Accueil</span>
        </Link>
        <Link
          href="/catalog"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 border border-slate-200"
        >
          <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
          <span>Voir le Catalogue</span>
        </Link>
      </div>
    </div>
  );
}
