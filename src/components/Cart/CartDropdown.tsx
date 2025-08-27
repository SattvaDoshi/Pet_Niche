import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { removeFromCart, updateQuantity, setCartOpen } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, PawPrint } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const CartDropdown = () => {
  const { items, total, isOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
      toast({
        title: "Item removed 🗑️",
        description: "Product has been removed from your cart.",
      });
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string, productName: string) => {
    dispatch(removeFromCart(id));
    toast({
      title: "Item removed 🗑️", 
      description: `${productName} has been removed from your cart.`,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => dispatch(setCartOpen(false))}
      />
      
      {/* Cart Dropdown */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Cart ({items.length})
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(setCartOpen(false))}
            className="p-2 border-gray-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-6">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-8">
                Add some goodies for your pets!
              </p>
              <Link to="/products">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  <PawPrint className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-white border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate text-sm">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-amber-600 font-medium">
                      {item.product.brand}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.selectedSize} • {item.selectedColor}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-gray-300"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-gray-300"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleRemoveItem(item.id, item.product.name)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <Link to="/cart" className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 hover:border-amber-300 hover:bg-amber-50"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  View Cart
                </Button>
              </Link>
              <Link to="/checkout" className="flex-1">
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  Checkout
                </Button>
              </Link>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Free shipping on orders over $50
            </p>
          </div>
        )}
      </div>
    </>
  );
};
