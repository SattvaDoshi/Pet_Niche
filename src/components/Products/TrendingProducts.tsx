import { useAppSelector } from "@/hooks/redux";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Star, ArrowRight, Zap, Flame } from "lucide-react";

export const TrendingProducts = () => {
  const { trendingProducts } = useAppSelector((state) => state.products);

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-red-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-yellow-200/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-red-200/30 to-pink-200/20 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '3s' }} />

      {/* Floating trend icons */}
      <div className="absolute top-1/4 left-1/5 opacity-10">
        <TrendingUp className="w-16 h-16 text-orange-400 animate-pulse" />
      </div>
      <div className="absolute bottom-1/3 right-1/6 opacity-10">
        <Flame className="w-12 h-12 text-red-400 animate-bounce" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg border border-orange-200">
            <Flame className="w-4 h-4 animate-bounce" />
            Hot Right Now
            <TrendingUp className="w-4 h-4" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Trending
            </span>
            <br />
            <span className="text-gray-800">Pet Favorites</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The <span className="font-bold text-orange-600">most popular picks</span> that pet parents are loving this season.
            Don't miss out on what's making tails wag everywhere!
          </p>
        </div>

        {/* Trending stats bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-lg border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-2xl mb-2">
                <Star className="w-6 h-6 fill-current" />
                4.9/5
              </div>
              <p className="text-gray-600 text-sm">Average Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-red-500 font-bold text-2xl mb-2">
                <Flame className="w-6 h-6" />
                2.5K+
              </div>
              <p className="text-gray-600 text-sm">Happy Pet Parents</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-2xl mb-2">
                <TrendingUp className="w-6 h-6" />
                95%
              </div>
              <p className="text-gray-600 text-sm">Would Recommend</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative transform hover:scale-105 transition-all duration-300"
            >
              {/* Trending indicator */}
              <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Zap className="w-3 h-3" />
                #{index + 1}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Link to="/products" className="flex justify-center">
          <Button className="group bg-gradient-to-r items-center from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:via-orange-600 hover:to-amber-600 text-white font-bold px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

            <span className="relative flex items-center gap-3">
              <Flame className="w-5 h-5" />
              Shop Trending Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};
