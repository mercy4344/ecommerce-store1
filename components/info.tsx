"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
  selectedColorId?: string | null;
  selectedSizeId?: string | null;
  onColorSelect?: (colorId: string | null) => void;
  onSizeSelect?: (sizeId: string | null) => void;
}

const Info: React.FC<InfoProps> = ({
  data,
  selectedColorId,
  selectedSizeId,
  onColorSelect,
  onSizeSelect,
}) => {

  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    const resolvedColorId = selectedColorId ?? data.colors?.[0]?.id ?? null;
    const resolvedSizeId = selectedSizeId ?? data.sizes?.[0]?.id ?? null;
    const selectedColor =
      data.colors?.find((color) => color.id === resolvedColorId) || null;
    const selectedSize =
      data.sizes?.find((size) => size.id === resolvedSizeId) || null;

    cart.addItem({
      ...data,
      selectedColorId: selectedColor?.id ?? null,
      selectedSizeId: selectedSize?.id ?? null,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {data.sizes?.length ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-black">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {data.sizes.map((size) => {
                const isActive = size.id === selectedSizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => onSizeSelect?.(size.id)}
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                      isActive
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        {data.colors?.length ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-black">Colors</h3>
            <div className="flex flex-wrap items-center gap-3">
              {data.colors.map((color) => {
                const isActive = color.id === selectedColorId;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => onColorSelect?.(color.id)}
                    className={`relative h-10 w-10 rounded-full border transition ${
                      isActive ? "border-black ring-2 ring-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                    title={color.name}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-2 rounded-full"
          disabled={false}
        >
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;