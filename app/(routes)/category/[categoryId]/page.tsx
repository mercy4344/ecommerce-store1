import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

interface CategoryPageProps {
    params: Promise<{
        categoryId: string;
    }>;
    searchParams: Promise<{
        colorId?: string;
        sizeId?: string;
    }>;
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
    // Resolve the promises for params and searchParams
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const { categoryId } = resolvedParams;
    const { colorId, sizeId } = resolvedSearchParams;

    if (!categoryId) return <div>Category not found</div>;

    const products = await getProducts({
        categoryId,
        colorId: colorId ?? "",
        sizeId: sizeId ?? "",
    });

    const category = await getCategory(categoryId);

    return (
        <div className="bg-white">
            <Container>
                {category?.billboard ? (
                    <Billboard data={category.billboard} />
                ) : (
                    <p className="text-center text-gray-500">No billboard available</p>
                )}
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <div className="mt-6 lg:col-span-5 lg:mt-0">
                            {products.length === 0 ? <NoResults /> : (
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {products.map((item) => (
                                        <ProductCard key={item.id} data={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;


// import getCategory from "@/actions/get-category";
// import getColors from "@/actions/get-colors";
// import getProducts from "@/actions/get-products";
// import getSizes from "@/actions/get-sizes";
// import Billboard from "@/components/billboard";
// import Container from "@/components/ui/container";
// import Filter from "./components/filter";
// import NoResults from "@/components/ui/no-result";
// import ProductCard from "@/components/ui/product-card";
// import MobileFilters from "./components/mobile-filters";

// export const revalidate = 0;

// const CategoryPage = async ({
//     params,
//     searchParams,
// }: {
//     params: { categoryId: string };
//     searchParams: { colorId?: string; sizeId?: string };
// }) => {
//     const { categoryId } = params;
//     const { colorId, sizeId } = searchParams;

//     if (!categoryId) return <div>Category not found</div>;

//     const products = await getProducts({
//         categoryId,
//         colorId: colorId || "",
//         sizeId: sizeId || "",
//     });

//     const sizes = await getSizes();
//     const colors = await getColors();
//     const category = await getCategory(categoryId);

//     return (
//         <div className="bg-white">
//             <Container>
//                 {category?.billboard ? (
//                     <Billboard data={category.billboard} />
//                 ) : (
//                     <p className="text-center text-gray-500">No billboard available</p>
//                 )}
//                 <div className="px-4 sm:px-6 lg:px-8 pb-24">
//                     <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
//                         <MobileFilters sizes={sizes} colors={colors} />
//                         <div className="hidden lg:block">
//                             <Filter valueKey="sizeId" name="Sizes" data={sizes} />
//                             <Filter valueKey="colorId" name="Colors" data={colors} />
//                         </div>
//                         <div className="mt-6 lg:col-span-4 lg:mt-0">
//                             {products.length === 0 ? <NoResults /> : (
//                                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                                     {products.map((item) => (
//                                         <ProductCard key={item.id} data={item} />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default CategoryPage;



// import getCategory from "@/actions/get-category";
// import getColors from "@/actions/get-colors";
// import getProducts from "@/actions/get-products";
// import getSizes from "@/actions/get-sizes";
// import Billboard from "@/components/billboard";
// import Container from "@/components/ui/container";
// import Filter from "./components/filter";
// import NoResults from "@/components/ui/no-result";
// import ProductCard from "@/components/ui/product-card";
// import MobileFilters from "./components/mobile-filters";

// export const revalidate = 0;

// interface CategoryPageProps {
//     params: {
//         categoryId?: string;
//     };
//     searchParams: {
//         colorId?: string;
//         sizeId?: string;
//     };
// }

// const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
//     const { categoryId } = await params;
//     const { colorId, sizeId } = await searchParams;

//     if (!categoryId) return <div>Category not found</div>;

//     const products = await getProducts({
//         categoryId,
//         colorId: colorId || "",
//         sizeId: sizeId || "",
//     });

//     const sizes = await getSizes();
//     const colors = await getColors();
//     const category = await getCategory(categoryId);

//     return (
//         <div className="bg-white">
//             <Container>
//                 {category?.billboard ? (
//                     <Billboard data={category.billboard} />
//                 ) : (
//                     <p className="text-center text-gray-500">No billboard available</p>
//                 )}
//                 <div className="px-4 sm:px-6 lg:px-8 pb-24">
//                     <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
//                         <MobileFilters sizes={sizes} colors={colors} />
//                         <div className="hidden lg:block">
//                             <Filter valueKey="sizeId" name="Sizes" data={sizes} />
//                             <Filter valueKey="colorId" name="Colors" data={colors} />
//                         </div>
//                         <div className="mt-6 lg:col-span-4 lg:mt-0">
//                             {products.length === 0 ? <NoResults /> : (
//                                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                                     {products.map((item) => (
//                                         <ProductCard key={item.id} data={item} />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default CategoryPage;