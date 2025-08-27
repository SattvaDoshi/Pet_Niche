import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { removeFromWishlist, clearWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const WishlistPage = () => {
  const { items } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
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
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist ({items.length})</h1>
          {items.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => dispatch(clearWishlist())}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love for later!</p>
            <Link to="/products">
              <Button variant="luxury" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="bg-card rounded-lg shadow-soft overflow-hidden group">
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </Link>
                  
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-soft opacity-0 group-hover:opacity-100 transition-smooth"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                    <Link 
                      to={`/product/${product.id}`}
                      className="font-medium text-foreground hover:text-accent transition-smooth"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="luxury"
                    size="sm"
                    className="w-full"
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
      </main>

      <Footer />
    </div>
  );
};