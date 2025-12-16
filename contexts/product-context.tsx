"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface ProductContextType {
  currentProduct: Product | null;
  setCurrentProduct: (product: Product | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
