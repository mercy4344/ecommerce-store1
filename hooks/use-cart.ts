import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { Product } from "@/types";

interface CartItem extends Product {
  quantity: number;
  itemKey: string;
}

const buildKey = (id: string, colorId?: string | null, sizeId?: string | null) =>
  `${id}__${colorId ?? "none"}__${sizeId ?? "none"}`;

const normalizeItems = (items: Partial<CartItem>[]): CartItem[] =>
  items.map((item) => {
    const key = item.itemKey ?? buildKey(item.id as string, item.selectedColorId, item.selectedSizeId);
    const quantity = typeof item.quantity === "number" ? item.quantity : 1;
    return { ...(item as Product), itemKey: key, quantity };
  });

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string, colorId?: string | null, sizeId?: string | null) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, colorId?: string | null, sizeId?: string | null) => void;
  decreaseQuantity: (id: string, colorId?: string | null, sizeId?: string | null) => void;
  getTotalQuantity: () => number; // ✅ Added
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = normalizeItems(get().items);
        const key = buildKey(data.id, data.selectedColorId, data.selectedSizeId);
        const existingItem = currentItems.find(
          (item) =>
            item.itemKey === key
        );

        if (existingItem) {
          return get().increaseQuantity(data.id, data.selectedColorId, data.selectedSizeId);
        }

        set({ items: [...currentItems, { ...data, quantity: 1, itemKey: key }] });
        toast.success("Product added to cart");
      },
      removeItem: (id: string, colorId?: string | null, sizeId?: string | null) => {
        const currentItems = normalizeItems(get().items);
        const key = buildKey(id, colorId, sizeId);
        set({ items: currentItems.filter(item => item.itemKey !== key) });
        toast.success("Product removed from cart");
      },
      removeAll: () => set({ items: [] }),
      increaseQuantity: (id: string, colorId?: string | null, sizeId?: string | null) => {
        const key = buildKey(id, colorId, sizeId);
        const currentItems = normalizeItems(get().items);
        const updated = currentItems.map(item =>
          item.itemKey === key ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({ items: updated });
      },
      decreaseQuantity: (id: string, colorId?: string | null, sizeId?: string | null) => {
        const key = buildKey(id, colorId, sizeId);
        const currentItems = normalizeItems(get().items);
        const existingItem = currentItems.find(item => item.itemKey === key);
        if (existingItem?.quantity === 1) {
          get().removeItem(id, colorId, sizeId);
        } else {
          const updated = currentItems.map(item =>
            item.itemKey === key ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({ items: updated });
        }
      },
      getTotalQuantity: () => {
        const currentItems = normalizeItems(get().items);
        return currentItems.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
