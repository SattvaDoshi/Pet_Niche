import { Heart, ShoppingBag, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "../ui/RatingStars";
import { Product } from "@/store/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Use useCallback to ensure stable function references
  const handleWishlistToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: "Removed from wishlist ❤️",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      dispatch(addToWishlist(product));
      toast({
        title: "Added to wishlist 💕",
        description: `${product.name} has been saved for your furry friend!`,
      });
    }
  }, [dispatch, isInWishlist, product]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes[0] || 'One Size',
      selectedColor: product.colors[0] || 'Default',
    }));
    
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    
    toast({
      title: "Added to cart 🛍️",
      description: `${product.name} is ready for your pet!`,
    });
  }, [dispatch, product]);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={cn("group block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform group-hover:-translate-y-1 border border-orange-100">
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
            />
          </Link>
          
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                New
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
                -{discountPercentage}%
              </span>
            )}
            {product.isTrending && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                <Award className="w-3 h-3" />
                Popular
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            )}
          </div>

          {/* Action Buttons - Fixed with proper event handling */}
          <div className={cn(
            "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm transition-all duration-200",
                isInWishlist ? "text-red-500 hover:text-red-600" : "hover:text-amber-600"
              )}
              onClick={handleWishlistToggle}
            >
              <Heart className={cn(
                "w-4 h-4 transition-all duration-200",
                isInWishlist ? "fill-current scale-110" : ""
              )} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm hover:text-amber-600 transition-all duration-200",
                justAdded && "bg-green-500 text-white hover:bg-green-600"
              )}
              onClick={handleAddToCart}
            >
              <ShoppingBag className={cn(
                "w-4 h-4 transition-all duration-200",
                justAdded && "fill-current"
              )} />
            </Button>
          </div>

          {/* Hover overlay with floating elements */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/5 transition-all duration-300 pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-300" />
            </div>
          )}
        </div>

        {/* Product Info - Wrapped in Link for navigation */}
        <Link to={`/product/${product.id}`}>
          <div className="p-5">
            <div className="mb-3">
              <p className="text-sm font-medium text-amber-600 mb-1">{product.brand}</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <RatingStars rating={product.rating} size="sm" />
              <span className="text-xs text-gray-500 font-medium">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Quick add to cart hint */}
              <div className={cn(
                "text-xs text-amber-600 font-medium transition-all duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}>
                Quick Add →
              </div>
            </div>

            {/* Pet category indicator */}
            <div className="mt-3 flex items-center justify-between">
              <span className="inline-block bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">
                {product.category}
              </span>
              
              {/* Satisfaction indicator */}
              {product.rating >= 4.5 && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Award className="w-3 h-3" />
                  <span className="font-medium">Pet Approved</span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Bottom gradient accent */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />
      </div>
    </div>
  );
};
