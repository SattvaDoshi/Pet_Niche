import { Product } from "@/store/slices/productsSlice";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductListProps {
  products: Product[];
  className?: string;
}

export const ProductList = ({ products, className }: ProductListProps) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const isInWishlist = (productId: string) =>
    wishlistItems.some((item) => item.id === productId);

  const handleWishlistToggle = (
    e: React.MouseEvent,
    product: Product
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: "Removed from wishlist ❤️",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      dispatch(addToWishlist(product));
      toast({
        title: "Added to wishlist 💕",
        description: `${product.name} has been saved for your pet!`,
      });
    }
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    product: Product
  ) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes[0] || "One Size",
        selectedColor: product.colors[0] || "Default",
      })
    );

    toast({
      title: "Added to cart 🛍️",
      description: `${product.name} is ready for your pet!`,
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col lg:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
        >
          {/* Product Image */}
          <Link
            to={`/product/${product.id}`}
            className="w-full lg:w-64 h-64 lg:h-48 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-amber-600 font-medium mb-1">
                    {product.brand}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleWishlistToggle(e, product)}
                    className={cn(
                      "p-2 border-gray-200",
                      isInWishlist(product.id) && "border-red-300 bg-red-50"
                    )}
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4",
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      )}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="p-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  >
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 text-xs font-medium rounded-full">
                    Sale
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-amber-100 text-amber-700 px-2 py-1 text-xs font-medium rounded-full">
                    Trending
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Price and View Details */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-sm font-medium text-red-600">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              
              <Link to={`/product/${product.id}`}>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 font-medium">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
