"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { useProduct } from "@/contexts/product-context";

interface ProductPageClientProps {
    product: Product;
    suggestedProducts: Product[];
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({ 
    product, 
    suggestedProducts 
}) => {
    const { setCurrentProduct } = useProduct();
    const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);

    useEffect(() => {
        setCurrentProduct(product);
        setSelectedColorId(product.colors?.[0]?.id ?? null);
        setSelectedSizeId(product.sizes?.[0]?.id ?? null);

        // Clean up when component unmounts
        return () => {
            setCurrentProduct(null);
        };
    }, [product, setCurrentProduct]);

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {product.images?.length > 0 ? (
                            <Gallery
                              images={product.images}
                              selectedColorId={selectedColorId}
                              onColorChange={setSelectedColorId}
                            />
                        ) : (
                            <p>No images available</p>
                        )}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info
                              data={product}
                              selectedColorId={selectedColorId}
                              selectedSizeId={selectedSizeId}
                              onColorSelect={setSelectedColorId}
                              onSizeSelect={setSelectedSizeId}
                            />
                        </div>
                    </div>
                    <hr className="my-10" />
                    {suggestedProducts.length > 0 ? (
                        <ProductList title="Related Items" items={suggestedProducts} />
                    ) : (
                        <p className="text-center text-gray-500">No related items found.</p>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ProductPageClient;
