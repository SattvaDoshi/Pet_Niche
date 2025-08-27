import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Shield, RotateCcw, Headphones, PawPrint } from "lucide-react";

export const CartSummary = () => {
  const { total, itemCount } = useAppSelector((state) => state.cart);
  
  const subtotal = total;
  const shipping = total > 50 ? 0 : 8.99; // Free shipping over $50 for pet products
  const tax = total * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
      </div>
      
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      {/* Free Shipping Incentive */}
      {shipping > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 text-amber-700">
            <PawPrint className="w-4 h-4" />
            <p className="text-sm font-medium">
              Add ${(50 - total).toFixed(2)} more for free shipping!
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Link to="/checkout" className="w-full block">
          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold">
            Proceed to Checkout
          </Button>
        </Link>
        <Link to="/products" className="w-full block">
          <Button 
            variant="outline" 
            className="w-full border-gray-300 hover:border-amber-300 hover:bg-amber-50 py-3"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-4 h-4 text-blue-500" />
          <span>Free returns within 30 days</span>
        </div>
        <div className="flex items-center gap-3">
          <Headphones className="w-4 h-4 text-purple-500" />
          <span>Customer support available 24/7</span>
        </div>
      </div>

      {/* Special Offer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <PawPrint className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 mb-1">
            Pet Parent Promise
          </p>
          <p className="text-xs text-gray-600">
            100% satisfaction guarantee for your furry friends
          </p>
        </div>
      </div>
    </div>
  );
};
