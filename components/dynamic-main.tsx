"use client";

import { usePathname } from "next/navigation";
import { useProduct } from "@/contexts/product-context";

interface DynamicMainProps {
  children: React.ReactNode;
}

const DynamicMain: React.FC<DynamicMainProps> = ({ children }) => {
  const pathname = usePathname();
  const { currentProduct } = useProduct();
  
  const isProductPage = pathname.startsWith('/products/');
  const hasAddToCart = isProductPage && currentProduct;
  
  // Adjust bottom padding based on whether Add to Cart button is present
  const bottomPadding = hasAddToCart ? 'pb-24' : 'pb-20'; // 24 for Add to Cart + nav, 20 for just nav

  return (
    <main className={`flex-1 pt-16 ${bottomPadding} lg:pb-0`}>
      {children}
    </main>
  );
};

export default DynamicMain;
