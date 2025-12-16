import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductPageClient from "./components/product-page-client";

interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    // Resolve the params promise
    const resolvedParams = await params;
    const { productId } = resolvedParams;

    if (!productId) return <div>Product not found</div>;

    const product = await getProduct(productId);
    if (!product) return <div>Product not found</div>;

    const suggestedProducts = product.category?.id
        ? await getProducts({ categoryId: product.category.id })
        : [];

    return (
        <ProductPageClient 
            product={product} 
            suggestedProducts={suggestedProducts}
        />
    );
};

export default ProductPage;

// import getProduct from "@/actions/get-product";
// import getProducts from "@/actions/get-products";
// import Gallery from "@/components/gallery";
// import Info from "@/components/info";
// import ProductList from "@/components/product-list";
// import Container from "@/components/ui/container";

// interface ProductPageProps {
//     params: {
//         productId: string;
//     };
// }

// const ProductPage = async ({ params }: ProductPageProps) => {
//     const { productId } = await params; // Await params before using it
//     if (!productId) return <div>Product not found</div>;

//     const product = await getProduct(productId);
//     if (!product) return <div>Product not found</div>;

//     const suggestedProducts = product.category?.id
//         ? await getProducts({ categoryId: product.category.id })
//         : [];

//     return (
//         <div className="bg-white">
//             <Container>
//                 <div className="px-4 py-10 sm:px-6 lg:px-8">
//                     <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
//                         {product.images?.length > 0 ? (
//                             <Gallery images={product.images} />
//                         ) : (
//                             <p>No images available</p>
//                         )}
//                         <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//                             <Info data={product} />
//                         </div>
//                     </div>
//                     <hr className="my-10" />
//                     {suggestedProducts.length > 0 ? (
//                         <ProductList title="Related Items" items={suggestedProducts} />
//                     ) : (
//                         <p className="text-center text-gray-500">No related items found.</p>
//                     )}
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default ProductPage;



// import getProduct from "@/actions/get-product";
// import getProducts from "@/actions/get-products";
// import Gallery from "@/components/gallery";
// import Info from "@/components/info";
// import ProductList from "@/components/product-list";
// import Container from "@/components/ui/container";

// interface ProductPageProps {
//     params: {
//         productId: string;
//     }
// }

// const ProductPage: React.FC<ProductPageProps> = async ({
//     params
// }) => {
//     const product = await getProduct(params.productId);
//     const suggestedProducts = await getProducts({
//         categoryId: product?.category?.id
//     })
//     return ( 
//         <div className="bg-white">
//            <Container>
//             <div className="px-4 py-10 sm:px-6 lg:px-8">
//                 <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
//                     <Gallery images={product.images} />
//                     <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//                         <Info data={product} />
//                     </div>
//                 </div>
//                 <hr className="my-10" />
//                 <ProductList title="Related Items" items={suggestedProducts} />
//             </div>
//             </Container> 
//         </div>
//      );
// }
 
// export default ProductPage;