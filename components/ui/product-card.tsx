"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useMemo, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    data 
    }) => {
        const cart = useCart();
        const previewModal = usePreviewModal();
        const router = useRouter();

        const handleClick = () => {
            router.push(`/products/${data?.id}`);
        }

        const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
            event.stopPropagation();

            previewModal.onOpen(data);
        }

        const primaryImage = useMemo(() => {
          if (data.colorImages && data.colors?.length) {
            const first = data.colors[0];
            if (first && data.colorImages[first]) return data.colorImages[first];
          }
          if (data.images && data.images.length > 0) return data.images[0].url;
          return "";
        }, [data]);

        const isValidColor = (color: string | null | undefined) => {
          if (!color) return false;
          if (typeof window === "undefined") return true;
          const s = new Option().style;
          s.color = color;
          return s.color !== "";
        };

        const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
            event.stopPropagation();
            // Default to first size/color if available
            const defaultColor = data.colors?.[0];
            const defaultSize = data.sizes?.[0];
            if (!defaultColor || !defaultSize) return;

            cart.addItem({
              id: data.id,
              name: data.name,
              price: data.price,
              quantity: 1,
              selectedColor: defaultColor,
              selectedSize: defaultSize,
              image:
                (defaultColor && data.colorImages?.[defaultColor]) ||
                primaryImage,
            });
        }

    const [imageLoaded, setImageLoaded] = useState(false);

    return ( 
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 sm:p-4 space-y-3 sm:space-y-4">
           <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden">
             {!imageLoaded && (
               <Skeleton className="absolute inset-0 h-full w-full" />
             )}
             {primaryImage && (
              <Image
                src={primaryImage}
                fill
                alt={data.name}
                className="aspect-square object-cover rounded-md"
                onLoadingComplete={() => setImageLoaded(true)}
              />
             )}
              <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                    <IconButton
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600" />}
                    />
                    <IconButton
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={20} className="text-gray-600" />}
                    />
                    </div>
              </div>
           </div>
           <div>
            {imageLoaded ? (
              <>
                <p className="font-semibold text-sm sm:text-lg">{data.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{data.category?.name}</p>
              </>
            ) : (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            )}
           </div>
           <div className="flex items-center justify-between">
            {imageLoaded ? <Currency value={data?.price} /> : <Skeleton className="h-4 w-16" />}
            <div className="flex items-center gap-1">
              {data.colors?.slice(0,4).map((color) => (
                <span
                  key={color}
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: isValidColor(color) ? color : "#e5e7eb" }}
                  aria-label={color}
                />
              ))}
            </div>
           </div>
        </div>
     );
}
 
export default ProductCard;
