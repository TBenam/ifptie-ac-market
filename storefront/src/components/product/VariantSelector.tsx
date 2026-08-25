"use client";

import { ProductAttribute, ProductVariant } from "@/types";

interface VariantSelectorProps {
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  selectedAttributes: Record<string, string>;
  onChangeAttribute: (attributeName: string, optionValue: string) => void;
}

export function VariantSelector({
  attributes,
  selectedAttributes,
  onChangeAttribute,
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      {attributes.map((attr) => (
        <div key={attr.id} className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">{attr.name} :</span>
            <span className="text-[#1A9B8C] font-bold">
              {selectedAttributes[attr.name] || "Veuillez choisir"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {attr.options.map((option) => {
              const isSelected = selectedAttributes[attr.name] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChangeAttribute(attr.name, option)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-[#1A9B8C] text-white border-[#1A9B8C] shadow-md shadow-[#1A9B8C]/20 scale-105"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#1A9B8C]/40 hover:bg-white"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
