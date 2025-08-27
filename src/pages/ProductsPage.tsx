import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ProductGrid } from "@/components/Products/ProductGrid";
import { ProductList } from "@/components/Products/ProductList";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setSelectedCategory, clearFilters, sortProducts } from "@/store/slices/productsSlice";
import { Button } from "@/components/ui/button";
import { Grid, List, Filter, Heart, PawPrint, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ProductsPage = () => {
  const { filteredProducts, categories, selectedCategory } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSortChange = (sort: typeof sortBy) => {
    setSortBy(sort);
    dispatch(sortProducts(sort));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-red-50/10">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-16 h-16 bg-amber-200/30 rounded-full blur-xl animate-float" />
          <div className="absolute -top-4 right-1/3 w-12 h-12 bg-orange-200/40 rounded-full blur-lg animate-bounce-gentle" style={{ animationDelay: '2s' }} />
          
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <PawPrint className="w-4 h-4" />
            Premium Pet Essentials
            <Heart className="w-4 h-4 fill-current text-red-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent leading-tight">
            Everything Your Pet Needs
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of <span className="font-semibold text-amber-600">premium pet products</span> designed 
            to bring joy, comfort, and style to your furry family members.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-10 shadow-lg border border-amber-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-600">{filteredProducts.length}</div>
              <div className="text-sm text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">4.8★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">15K+</div>
              <div className="text-sm text-gray-600">Happy Pets</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">Free</div>
              <div className="text-sm text-gray-600">Shipping $50+</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="space-y-6 mb-12">
          {/* Category Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Shop by Category</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  className={cn(
                    "px-6 py-3 rounded-full border-2 text-sm font-medium transition-all duration-300 transform hover:scale-105",
                    selectedCategory === category 
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  )}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
              
              {selectedCategory !== 'All' && (
                <Button
                  className="px-4 py-2 text-amber-600 hover:text-amber-700 bg-transparent border-none underline text-sm font-medium transition-colors"
                  onClick={() => dispatch(clearFilters())}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Results Info */}
            <div className="flex items-center gap-4">
              <div className="text-gray-600">
                Showing <span className="font-semibold text-amber-600">{filteredProducts.length}</span> products
                {selectedCategory !== 'All' && (
                  <span> in <span className="font-semibold text-amber-600">{selectedCategory}</span></span>
                )}
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <select 
                  value={sortBy} 
                  onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white shadow-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <Button
                  className={cn(
                    "w-12 h-12 rounded-none border-none transition-all duration-200",
                    viewMode === 'grid'
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "bg-white text-gray-500 hover:text-amber-600 hover:bg-amber-50"
                  )}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  className={cn(
                    "w-12 h-12 rounded-none border-none border-l-2 border-gray-200 transition-all duration-200",
                    viewMode === 'list'
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "bg-white text-gray-500 hover:text-amber-600 hover:bg-amber-50"
                  )}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="min-h-[60vh] relative">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">
                We couldn't find any products matching your criteria. 
                <br />
                Try adjusting your filters or browse all categories.
              </p>
              <Button 
                onClick={() => dispatch(clearFilters())}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PawPrint className="w-5 h-5 mr-2" />
                Browse All Products
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </>
          )}
        </div>

        {/* Bottom CTA */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-400 fill-current animate-heart-beat" />
              <span className="text-lg font-semibold text-gray-800">Can't find what you're looking for?</span>
              <PawPrint className="w-6 h-6 text-amber-500 animate-bounce" />
            </div>
            <p className="text-gray-600 mb-6">
              Contact our pet care experts for personalized recommendations for your furry friend!
            </p>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Get Expert Help
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
