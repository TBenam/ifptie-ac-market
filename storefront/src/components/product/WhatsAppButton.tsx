"use client";

import { MessageCircle } from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";

interface WhatsAppButtonProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
  phoneNumber?: string;
  className?: string;
}

export function WhatsAppButton({
  product,
  selectedVariant,
  phoneNumber = "237600000000", // Numéro WhatsApp support
  className = "",
}: WhatsAppButtonProps) {
  const price = selectedVariant?.price || product.price;
  const variantInfo = selectedVariant ? ` (Option: ${selectedVariant.name})` : "";

  const message = `Bonjour IFPTIE-AC Market ! 👋\n\nJe souhaite commander l'article suivant :\n🛍️ Produit : *${product.name}*${variantInfo}\n💰 Prix : *${formatPrice(price)}*\n\nPaiement en espèces à la livraison (COD).\nPouvez-vous m'enregistrer la commande s'il vous plaît ?`;

  const encodedUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={encodedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ${className}`}
      title="Commander sur WhatsApp"
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span>Commander via WhatsApp</span>
    </a>
  );
}
