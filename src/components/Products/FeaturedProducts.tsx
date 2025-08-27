import { useAppSelector } from "@/hooks/redux";
import { ProductCard } from "./ProductCard";
import { Heart, Sparkles, Award, ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  const { featuredProducts } = useAppSelector((state) => state.products);

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-orange-200/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Handpicked for Your Pet
            <Heart className="w-4 h-4 fill-current text-red-500" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
            Featured Collection
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our <span className="font-semibold text-amber-700">premium pet essentials</span> that bring comfort,
            joy, and style to your furry family members.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
