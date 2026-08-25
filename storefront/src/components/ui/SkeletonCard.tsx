import Image from "next/image";

export function SkeletonCard() {
  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between animate-pulse">
      {/* Image Skeleton with Centered Pulsing Logo */}
      <div className="relative aspect-[3/4] w-full skeleton-shimmer flex items-center justify-center overflow-hidden">
        {/* Subtle Brand Logo Watermark */}
        <div className="relative w-20 h-20 opacity-35 animate-logo-pulse flex items-center justify-center">
          <Image
            src="/logo.jpg"
            alt="IFPTIE-AC Loading..."
            width={72}
            height={72}
            className="object-contain grayscale contrast-125"
          />
        </div>

        {/* Shimmer Badge */}
        <div className="absolute top-3 left-3 w-14 h-5 rounded-full bg-slate-200" />
      </div>

      {/* Details Skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-10 h-3 bg-slate-200 rounded" />
        </div>

        <div className="space-y-1.5">
          <div className="w-full h-4 bg-slate-200 rounded" />
          <div className="w-3/4 h-4 bg-slate-200 rounded" />
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="w-24 h-6 bg-slate-200 rounded" />
          <div className="w-20 h-8 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
