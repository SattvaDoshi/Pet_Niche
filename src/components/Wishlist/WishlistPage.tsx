import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { removeFromWishlist, clearWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X, ArrowLeft, PawPrint, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const WishlistPage = () => {
  const { items } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    dispatch(removeFromWishlist(productId));
    toast({
      title: "Removed from wishlist ❤️",
      description: `${productName} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes[0] || 'One Size',
      selectedColor: product.colors[0] || 'Default',
    }));
    
    toast({
      title: "Added to cart 🛍️",
      description: `${product.name} is ready for your pet!`,
    });
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/products" 
              className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600">
                  {items.length === 0 
                    ? "No saved items yet" 
                    : `${items.length} item${items.length > 1 ? 's' : ''} saved for your pets`
                  }
                </p>
              </div>
            </div>
            
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Content */}
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Save items you love for later! Heart the products you want to remember.
              </p>
              <Link to="/products">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  <PawPrint className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    
                    {/* Remove Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity border-gray-300 hover:border-red-300 hover:text-red-600"
                      onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-3">
                      <p className="text-sm text-amber-600 font-medium mb-1">{product.brand}</p>
                      <Link 
                        to={`/product/${product.id}`}
                        className="font-semibold text-gray-900 hover:text-amber-600 transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Continue Shopping CTA */}
          {items.length > 0 && (
            <div className="mt-12 text-center">
              <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
                <PawPrint className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Looking for more pet essentials?
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover more amazing products your furry friends will love!
                </p>
                <Link to="/products">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
