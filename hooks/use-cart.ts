import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { Product } from "@/types";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string, selectedSize?: string, selectedColor?: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, selectedSize?: string, selectedColor?: string) => void;
  decreaseQuantity: (id: string, selectedSize?: string, selectedColor?: string) => void;
  getTotalQuantity: () => number; // ✅ Added
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id &&
            item.selectedColor === data.selectedColor &&
            item.selectedSize === data.selectedSize
        );

        if (existingItem) {
          return get().increaseQuantity(data.id, data.selectedSize, data.selectedColor);
        }

        set({ items: [...currentItems, { ...data, quantity: 1 }] });
        toast.success("Product added to cart");
      },
      removeItem: (id: string, selectedSize?: string, selectedColor?: string) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.id === id &&
                (selectedSize ? item.selectedSize === selectedSize : true) &&
                (selectedColor ? item.selectedColor === selectedColor : true)
              )
          ),
        });
        toast.success("Product removed from cart");
      },
      removeAll: () => set({ items: [] }),
      increaseQuantity: (id: string, selectedSize?: string, selectedColor?: string) => {
        const updated = get().items.map(item =>
          item.id === id &&
          (!selectedSize || item.selectedSize === selectedSize) &&
          (!selectedColor || item.selectedColor === selectedColor)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ items: updated });
      },
      decreaseQuantity: (id: string, selectedSize?: string, selectedColor?: string) => {
        const existingItem = get().items.find(
          (item) =>
            item.id === id &&
            (!selectedSize || item.selectedSize === selectedSize) &&
            (!selectedColor || item.selectedColor === selectedColor)
        );
        if (existingItem?.quantity === 1) {
          get().removeItem(id, selectedSize, selectedColor);
        } else {
          const updated = get().items.map(item =>
            item.id === id &&
            (!selectedSize || item.selectedSize === selectedSize) &&
            (!selectedColor || item.selectedColor === selectedColor)
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          set({ items: updated });
        }
      },
      getTotalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
