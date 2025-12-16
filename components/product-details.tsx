"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const cart = useCart();

  const isValidColor = (color: string | null | undefined) => {
    if (!color) return false;
    if (typeof window === "undefined") return true;
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] ?? null
  );

  const primaryImage = useMemo(() => {
    if (selectedColor && product.colorImages?.[selectedColor]) {
      return product.colorImages[selectedColor];
    }
    // Fallback to first color image
    const firstColor = product.colors?.[0];
    if (firstColor && product.colorImages?.[firstColor]) {
      return product.colorImages[firstColor];
    }
    // Fallback to legacy images
    if (product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    return "";
  }, [product, selectedColor]);

  const canAddToCart = Boolean(selectedSize && selectedColor);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      selectedSize: selectedSize as string,
      selectedColor: selectedColor as string,
      image:
        (selectedColor && product.colorImages?.[selectedColor]) ||
        product.colorImages?.[product.colors?.[0] ?? ""] ||
        product.images?.[0]?.url ||
        "",
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="w-full">
        {primaryImage ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="aspect-square w-full rounded-xl bg-gray-100" />
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-xl text-gray-900">
            <Currency value={product.price} />
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-black">Colors</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors?.map((color) => {
              const isSelected = color === selectedColor;
              const valid = isValidColor(color);
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full w-8 h-8 border transition ring-2 ${
                    isSelected ? "ring-black" : "ring-transparent"
                  }`}
                  style={{ backgroundColor: valid ? color : "#e5e7eb" }}
                  aria-label={color}
                  title={color}
                />
              );
            })}
            {(!product.colors || product.colors.length === 0) && (
              <span className="text-sm text-gray-500">No colors available</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-black">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((size) => {
              const isSelected = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md border transition ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              );
            })}
            {(!product.sizes || product.sizes.length === 0) && (
              <span className="text-sm text-gray-500">No sizes available</span>
            )}
          </div>
        </div>

        <Button
          disabled={!canAddToCart}
          onClick={handleAddToCart}
          className="flex items-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;

