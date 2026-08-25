import Image from "next/image";

export function SkeletonPDP() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 animate-pulse">
      <div className="w-36 h-4 bg-slate-200 rounded" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Gallery Skeleton */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl skeleton-shimmer border border-slate-200 flex items-center justify-center overflow-hidden">
            <div className="relative w-28 h-28 opacity-40 animate-logo-pulse">
              <Image
                src="/logo.jpg"
                alt="IFPTIE-AC"
                fill
                className="object-contain grayscale contrast-125"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 rounded-2xl skeleton-shimmer border border-slate-200 shrink-0" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="w-24 h-5 bg-slate-200 rounded-full" />
            <div className="w-full h-8 bg-slate-200 rounded" />
            <div className="w-3/4 h-8 bg-slate-200 rounded" />
            <div className="w-32 h-4 bg-slate-200 rounded" />
          </div>

          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
            <div className="w-40 h-8 bg-slate-200 rounded" />
            <div className="w-28 h-4 bg-slate-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="w-full h-4 bg-slate-200 rounded" />
            <div className="w-full h-4 bg-slate-200 rounded" />
            <div className="w-2/3 h-4 bg-slate-200 rounded" />
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200">
            <div className="w-full h-14 bg-slate-200 rounded-2xl" />
            <div className="w-full h-12 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
