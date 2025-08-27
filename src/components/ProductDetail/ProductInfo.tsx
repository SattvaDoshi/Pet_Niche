import { useState } from "react";
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, Award, Star, PawPrint, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/RatingStars";
import { Product } from "@/store/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast({
        title: "Please select a size 🐾",
        description: "Choose the perfect size for your pet!",
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({
      product,
      quantity,
      selectedSize: selectedSize || "One Size",
      selectedColor: selectedColor || "Default",
    }));
    
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
    
    toast({
      title: "Added to cart! 🛍️",
      description: `${product.name} is ready for your furry friend!`,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: "Removed from wishlist 💔",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      dispatch(addToWishlist(product));
      toast({
        title: "Added to wishlist! 💕",
        description: `${product.name} is saved for your pet!`,
      });
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Brand and Name */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
            {product.brand}
          </span>
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Award className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
        <p className="text-amber-600 font-medium">{product.category}</p>
      </div>

      {/* Rating with enhanced display */}
      <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
        <RatingStars rating={product.rating} showRating size="lg" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            ({product.reviewCount} happy pet parents)
          </span>
          {product.rating >= 4.5 && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
              <CheckCircle className="w-3 h-3" />
              Pet Approved
            </div>
          )}
        </div>
      </div>

      {/* Price with enhanced styling */}
      <div className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-soft">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                Save {discountPercentage}%
              </span>
            </>
          )}
        </div>
        {product.originalPrice && (
          <p className="text-green-600 font-medium text-sm">
            You save ${(product.originalPrice - product.price).toFixed(2)}!
          </p>
        )}
      </div>

      <Separator className="bg-amber-100" />

      {/* Description */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
          <PawPrint className="w-5 h-5 text-amber-500" />
          About This Product
        </h3>
        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
          {product.description}
        </p>
      </div>

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Size</h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-6 py-3 border-2 rounded-xl transition-all duration-200 font-medium",
                  selectedSize === size
                    ? "border-amber-500 bg-amber-500 text-white shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "px-6 py-3 border-2 rounded-xl transition-all duration-200 font-medium",
                  selectedColor === color
                    ? "border-amber-500 bg-amber-500 text-white shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity with enhanced controls */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-900">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 hover:bg-gray-100 transition-colors rounded-l-xl font-bold text-lg"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="w-16 text-center font-bold text-lg bg-gray-50 h-12 flex items-center justify-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 hover:bg-gray-100 transition-colors rounded-r-xl font-bold text-lg"
            >
              +
            </button>
          </div>
          <span className="text-gray-600">
            Total: <span className="font-bold text-amber-600">${(product.price * quantity).toFixed(2)}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleAddToCart}
          className={cn(
            "flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden",
            justAdded && "bg-gradient-to-r from-green-500 to-emerald-500"
          )}
          size="lg"
        >
          <div className="flex items-center gap-3">
            {justAdded ? (
              <>
                <CheckCircle className="w-6 h-6" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-6 h-6" />
                Add to Cart
              </>
            )}
          </div>
        </Button>
        
        <Button
          onClick={handleWishlistToggle}
          variant="outline"
          size="lg"
          className={cn(
            "p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105",
            isInWishlist 
              ? "border-red-300 bg-red-50 text-red-500 hover:border-red-400" 
              : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
          )}
        >
          <Heart className={cn(
            "w-6 h-6 transition-all duration-200",
            isInWishlist ? "fill-current animate-heart-beat" : ""
          )} />
        </Button>
      </div>

      <Separator className="bg-amber-100" />

      </div>
  );
};
