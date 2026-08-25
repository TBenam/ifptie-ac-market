import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Star, TrendingUp, PhoneCall, Truck, Award, Headphones } from "lucide-react";
import { getProducts, getCategories } from "@/lib/bagisto/client";
import { ProductCard } from "@/components/product/ProductCard";

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();
  const flashProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* ─── Hero Section (Clean, Spacious Editorial Design) ─── */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-bold tracking-wide border border-teal-200/60">
              <Zap className="w-3.5 h-3.5" />
              <span>COLLECTION OFFICIELLE 2026</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              L'Excellence du Confort & du Style.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Découvrez nos climatiseurs Inverter éco-énergétiques, notre mode streetwear exclusive et nos équipements high-tech. Paiement en espèces à la livraison.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-[#0D9488] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Découvrir la Boutique</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalog?category=climatisation-ac"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>❄️ Climatiseurs Inverter</span>
              </Link>
            </div>

            {/* Value Points */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="font-heading text-xl sm:text-2xl font-black text-slate-900">100% COD</div>
                <div className="text-xs text-slate-500 mt-0.5">Paiement à la livraison</div>
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl font-black text-[#D97706] flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-4 h-4 fill-[#D97706]" />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Avis clients vérifiés</div>
              </div>
              <div>
                <div className="font-heading text-xl sm:text-2xl font-black text-slate-900">24-48h</div>
                <div className="text-xs text-slate-500 mt-0.5">Livraison Express</div>
              </div>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
                alt="IFPTIE-AC Climatiseur Premium Inverter"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* ─── Univers & Catégories ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">Rayons</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Explorez par Univers
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold text-[#0D9488] hover:text-[#0F766E] flex items-center gap-1"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  {cat.itemCount} Articles
                </span>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white mt-0.5">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Ventes Flash & Offres Limitées ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-[#D97706]" />
              <span>Offres Spéciales</span>
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Ventes Flash du Moment
            </h2>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
            ⏳ Offres valables dans la limite des stocks
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── Piliers de Confiance (Clean 4-Card Section) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center border border-teal-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-sm">Paiement à la Livraison</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Vérifiez votre colis et payez en espèces en toute sérénité à la réception.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center border border-amber-100">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-sm">Livraison Express 24-48h</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Expédition rapide et sécurisée à Dakar, Thiès et toutes les régions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-sm">Garantie Qualité 100%</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tous nos articles sont originaux, neufs et accompagnés d'une garantie fabricant.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-sm">Assistance 7j/7</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Une équipe dédiée disponible par téléphone et WhatsApp pour vous conseiller.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Bannière de Réassurance COD ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
              Engagement Client
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight">
              Commandez sans carte bancaire, payez chez vous en espèces.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Sélectionnez vos produits, renseignez votre numéro de téléphone et votre adresse. Nous vous livrons sous 24 à 48 heures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/catalog"
              className="px-6 py-3.5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold text-center transition-colors shadow-md"
            >
              Commander maintenant
            </Link>
            <a
              href="tel:+221770000000"
              className="px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D97706]" />
              <span>+221 77 000 00 00</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
