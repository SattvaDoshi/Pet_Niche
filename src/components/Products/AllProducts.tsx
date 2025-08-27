import { useAppSelector } from "@/hooks/redux";
import { ProductGrid } from "./ProductGrid";

export const AllProducts = () => {
  const { filteredProducts } = useAppSelector((state) => state.products);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
};