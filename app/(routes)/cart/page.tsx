"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const cart = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Prevent rendering on server / before hydration completes
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">
            Cart ({cart.getTotalQuantity()})
          </h1>

          <div className="mt-15 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <div className="relative ml-8 mb-4 h-60 w-60 text-muted-foreground">
                  <Image
                    src="/hippo-empty-cart.png"
                    alt="Empty Cart"
                    fill
                    className="mb-4"
                  />
                </div>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.itemKey ?? `${item.id}-${item.selectedColorId ?? "none"}-${item.selectedSizeId ?? "none"}`}
                    data={item}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
