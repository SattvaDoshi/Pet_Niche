import { useState } from "react";
import { Product } from "@/store/slices/productsSlice";

interface ProductImagesProps {
  product: Product;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-warm-gray">
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-smooth ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground"
              }`}
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Badges */}
      <div className="flex gap-2">
        {product.isNew && (
          <span className="bg-luxury-black text-white px-3 py-1 text-sm font-medium rounded">
            New Arrival
          </span>
        )}
        {product.isOnSale && (
          <span className="bg-destructive text-destructive-foreground px-3 py-1 text-sm font-medium rounded">
            On Sale
          </span>
        )}
        {product.isTrending && (
          <span className="bg-gradient-rose text-luxury-black px-3 py-1 text-sm font-medium rounded">
            Trending
          </span>
        )}
      </div>
    </div>
  );
};