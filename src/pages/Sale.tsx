// pages/Sale.tsx
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ProductGrid } from "@/components/Products/ProductGrid";
import { ProductList } from "@/components/Products/ProductList";
import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Grid, List, Tag, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const SalePage = () => {
  const { products } = useAppSelector((state) => state.products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products for sale items
  const saleProducts = products.filter(product => product.isOnSale);

  // Calculate max discount
  const maxDiscount = saleProducts.length > 0 
    ? Math.max(...saleProducts
        .filter(p => p.originalPrice)
        .map(p => Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)))
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Tag className="w-4 h-4" />
            Limited Time Offers
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent leading-tight mb-6">
            Pet Sale
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium pet products at incredible prices. Treat your furry friends for less!
          </p>
          
          {maxDiscount > 0 && (
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold mt-6">
              Save up to {maxDiscount}% off
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              {saleProducts.length} items on sale
            </span>
            {saleProducts.length > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
                Sale
              </span>
            )}
          </div>

          {/* View Toggle */}
          {saleProducts.length > 0 && (
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none",
                  viewMode === 'grid' && "bg-gray-100"
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none border-l border-gray-200",
                  viewMode === 'list' && "bg-gray-100"
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Products Display */}
        <div className="min-h-[50vh]">
          {saleProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <ProductGrid products={saleProducts} />
            ) : (
              <ProductList products={saleProducts} />
            )
          ) : (
            <div className="text-center py-20">
              <Tag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Sale Items Available
              </h3>
              <p className="text-gray-600 mb-8">
                Check back soon for amazing deals on premium pet products.
              </p>
              <Button 
                onClick={() => window.location.href = '/products'}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
              >
                Browse All Products
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
