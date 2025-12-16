import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import BillboardSwiper from "@/components/billboard-swiper";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Billboard } from "@/types";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  
  // Fetch two billboards
  const billboard1 = await getBillboard("1cfd4dea-7377-4c4e-bbc3-b00463488ef6");
  const billboard2 = await getBillboard("4edd3259-7f9d-495f-b9c9-4bfbdad57345"); // Replace with your second billboard ID
  
  // Filter out any null billboards
  const billboards: Billboard[] = [billboard1, billboard2].filter((billboard): billboard is Billboard => billboard !== null);

  // Handle the case where no billboards are found
  if (billboards.length === 0) {
    return (
      <Container>
        <div className="space-y-10 pb-10">
          <div>No billboards found</div>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 -mt-0.5">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6 sm:space-y-10 pb-10">
        <BillboardSwiper billboards={billboards} />
        <div className="flex flex-col gap-y-6 sm:gap-y-8 px-4 sm:px-6 lg:px-8 -mt-0.5">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;