"use client";

import Image from "next/image";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  data: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id, data.selectedColorId, data.selectedSizeId);
  };

  const previewImage =
    data.images.find((img) => img.colorId === data.selectedColorId) ||
    data.images[0];

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32">
        <Image
          fill
          src={previewImage?.url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-lg font-semibold text-black">{data.name}</p>
            <div className="mt-1 flex text-sm text-gray-500 gap-4">
              {data.selectedColor ? (
                <div className="flex items-center gap-2">
                  <span>{data.selectedColor.name}</span>
                  <span
                    className="h-4 w-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: data.selectedColor.value }}
                  />
                </div>
              ) : null}
              {data.selectedSize ? (
                <span className="border-l border-gray-200 pl-4">
                  {data.selectedSize.name}
                </span>
              ) : null}
            </div>
            <Currency value={data.price} />
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <Button
              onClick={() => cart.decreaseQuantity(data.id, data.selectedColorId, data.selectedSizeId)}
              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-lg hover:bg-gray-10"
            >
              -
            </Button>
            <span className="text-md font-medium w-6 text-center">
  {data.quantity}
</span>

            <Button
              onClick={() => cart.increaseQuantity(data.id, data.selectedColorId, data.selectedSizeId)}
              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-lg hover:bg-gray-10"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;