"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const isValidColor = (color: string | null | undefined) => {
    if (!color) return false;
    if (typeof window === "undefined") return true;
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">{data.name}</h2>
      <div className="text-lg text-gray-900">
        <Currency value={data.price} />
      </div>
      <div className="flex flex-wrap gap-2 text-sm text-gray-700">
        <span className="font-semibold">Sizes:</span>
        {data.sizes?.length ? (
          data.sizes.map((size) => (
            <span key={size} className="px-2 py-0.5 rounded border">
              {size}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No sizes</span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
        <span className="font-semibold">Colors:</span>
        {data.colors?.length ? (
          data.colors.map((color) => (
            <span
              key={color}
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: isValidColor(color) ? color : "#e5e7eb" }}
              title={color}
            />
          ))
        ) : (
          <span className="text-gray-500">No colors</span>
        )}
      </div>
    </div>
  );
};

export default Info;