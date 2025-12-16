"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PackageCheck, ShoppingCart, User, Home, ShoppingBag, Truck } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { UserButton, useUser } from "@clerk/nextjs";
import { Category } from "@/types";
import { useProduct } from "@/contexts/product-context";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ImageIcon } from "@/components/ui/image-icon";

const BottomNav = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const cart = useCart();
  const { currentProduct } = useProduct();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Load categories for the Shop drawer
    (async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) {
          setCategories([]);
          return;
        }
        const data = await res.json();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  if (!isMounted) {
    return null;
  }

  const onAddToCart = () => {
    if (currentProduct) {
      cart.addItem(currentProduct);
    }
  };

  const isProductPage = pathname.startsWith('/products/');

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
      onClick: () => router.push("/"),
    },
    {
      id: "shop",
      label: "Shop",
      icon: ShoppingBag,
      path: "#shop",
      onClick: () => setIsDrawerOpen(true),
    },
    {
      id: "orders",
      label: "Orders",
      icon: PackageCheck,
      path: "/orders",
      onClick: () => router.push("/orders"),
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      path: "/cart",
      onClick: () => router.push("/cart"),
      badge: cart.getTotalQuantity() > 0 ? cart.getTotalQuantity() : undefined,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
      onClick: () => {}, // UserButton will handle this
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Shop Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-2/3 w-full fixed bottom-0 left-0 rounded-t-2xl bg-white shadow-lg">
          <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <DrawerTitle>Explore Categories</DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">✖</button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto max-h-[80%]">
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-100 text-gray-900 transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                    <ImageIcon imageUrl={category.icon?.imageUrl || ""} className="h-10 w-10" alt={category.name} />
                  </div>
                  <span className="text-xs font-medium text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Add to Cart Button - Only on product pages */}
      {isProductPage && currentProduct && (
        <div className="bg-white shadow-lg">
          <div className="flex items-center justify-end px-4 py-2">
            <button 
              onClick={onAddToCart} 
              className="flex items-center gap-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium text-sm"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Regular Navigation Bar */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            if (item.id === "profile") {
              return (
                <div key={item.id} className="flex flex-col items-center">
                  {isSignedIn ? (
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-5 h-5"
                        }
                      }}
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="text-xs text-gray-600 mt-0.5 font-bold">Profile</span>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                  isActive 
                    ? "text-black" 
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <div className="relative">
                  {item.id === "cart" && isActive ? (
                    <Truck size={20} fill="currentColor" />
                  ) : (
                    <Icon size={20} />
                  )}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center z-10 text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-0.5 font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
