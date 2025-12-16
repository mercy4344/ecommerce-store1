import { Product } from "@/types";
import NoResults from "./ui/no-result";
import ProductCard from "./ui/product-card";

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return ( 
    <div className="space-y-3 sm:space-y-4">
      <h3 className="font-bold text-xl sm:text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}

      {/* Two-column grid on mobile, more columns on larger screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <ProductCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
