import { notFound } from "next/navigation";

import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductDetails from "@/components/product-details";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <ProductDetails product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;

