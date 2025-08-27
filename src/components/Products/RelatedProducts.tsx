import { ProductCard } from "./ProductCard";
import { Product } from "@/store/slices/productsSlice";

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">You Might Also Like</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};