import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="py-4">
      {(title || subtitle) && (
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            {title && (
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-xs font-mono font-bold text-[#1A9B8C] bg-[#1A9B8C]/10 px-3 py-1 rounded-full border border-[#1A9B8C]/20 self-start md:self-auto">
            {products.length} Articles Disponibles
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
