import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ProductImages } from "@/components/ProductDetail/ProductImages";
import { ProductInfo } from "@/components/ProductDetail/ProductInfo";
import { ProductReviews } from "@/components/ProductDetail/ProductReviews";
import { RelatedProducts } from "@/components/Products/RelatedProducts";
import { useAppSelector } from "@/hooks/redux";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAppSelector((state) => state.products);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button variant="luxury">
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related products from same category
  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Product Reviews */}
        <div className="mb-16">
          <ProductReviews product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </main>

      <Footer />
    </div>
  );
};