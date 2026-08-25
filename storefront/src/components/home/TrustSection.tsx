import { ShieldCheck, Truck, Clock, RefreshCw, Award, Headphones } from "lucide-react";

export function TrustSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Paiement à la Livraison (COD)",
      description: "Payez en espèces en main propre après avoir vérifié votre colis.",
      color: "text-[#1A9B8C]",
      bg: "bg-[#1A9B8C]/10",
      border: "border-[#1A9B8C]/20",
    },
    {
      icon: Truck,
      title: "Livraison Express 24-48h",
      description: "Expédition sécurisée partout à Dakar, Thiès et régions.",
      color: "text-[#F5A623]",
      bg: "bg-[#F5A623]/10",
      border: "border-[#F5A623]/20",
    },
    {
      icon: Award,
      title: "Garantie & Authenticité",
      description: "Produits 100% originaux avec garantie fabricant certifiée.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      icon: Headphones,
      title: "Service Client Dédié 7j/7",
      description: "Conseillers disponibles par téléphone et WhatsApp pour vous guider.",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  ];

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
