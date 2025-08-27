import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { AddressModal } from "@/components/Profile/AddressModal";
import { EditAddressModal } from "@/components/Profile/EditAddressModal";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard, Banknote, MapPin, Pencil, Plus, PawPrint, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { addOrder } from "@/store/slices/userSlice";

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const { addresses, user } = useAppSelector(state => state.user);
  const { items: cartItems, total: cartTotal, itemCount } = useAppSelector(state => state.cart);
  
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.length > 0 ? addresses.find(a => a.isDefault)?.id || addresses[0].id : ""
  );
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [placingOrder, setPlacingOrder] = useState(false);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  const subtotal = cartTotal;
  const shippingFee = cartTotal > 50 ? 0 : 8.99; // Free shipping over $50
  const tax = cartTotal * 0.08;
  const finalTotal = subtotal + shippingFee + tax;

  const handlePlaceOrder = () => {
    if (!selectedAddress || cartItems.length === 0) {
      toast({
        title: "Checkout Error",
        description: "Please select an address and add items to cart.",
        variant: "destructive",
      });
      return;
    }

    setPlacingOrder(true);

    setTimeout(() => {
      dispatch(
        addOrder({
          id: `PET-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          status: "processing",
          items: cartItems.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.images[0],
          })),
          total: finalTotal,
          shippingAddress: selectedAddress,
        })
      );

      toast({
        title: "Order placed successfully! 🎉",
        description: "Thank you! Your pet supplies are on their way.",
      });
      
      setPlacingOrder(false);
      // Redirect to success page or orders
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order for your furry friends</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT: SHIPPING ADDRESS & PAYMENT */}
            <section className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Delivery Address
                </h2>
                
                {addresses.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No delivery address found</p>
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={() => setShowAddAddress(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4">
                      {addresses.map(address => (
                        <label
                          key={address.id}
                          className={`flex items-start gap-4 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedAddressId === address.id
                              ? "border-amber-300 bg-amber-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1 text-amber-600 focus:ring-amber-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">{address.name}</span>
                              {address.isDefault && (
                                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-gray-600 text-sm space-y-1">
                              <p>{address.street}</p>
                              <p>{address.city}, {address.state} {address.zipCode}</p>
                              <p>{address.country}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditingAddress(address);
                            }}
                            className="p-2 border-gray-300 hover:border-amber-300"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </label>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline"
                        className="border-gray-300 hover:border-amber-300 hover:bg-amber-50"
                        onClick={() => setShowAddAddress(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Address
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "card" ? "border-amber-300 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod('card')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Credit / Debit Card</span>
                  </label>
                  
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "cod" ? "border-amber-300 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <Banknote className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Cash On Delivery</span>
                  </label>
                </div>
              </div>
            </section>

            {/* RIGHT: ORDER SUMMARY */}
            <section className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-amber-600" />
                  Order Summary ({itemCount} items)
                </h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No items in your cart</p>
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={() => window.location.href = '/products'}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.product.name}</h4>
                            <p className="text-sm text-amber-600 font-medium">{item.product.brand}</p>
                            <p className="text-sm text-gray-500">{item.selectedSize} • {item.selectedColor}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${item.product.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className={`font-medium ${shippingFee === 0 ? 'text-green-600' : ''}`}>
                          {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                          <span>Total</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Place Order */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 text-lg disabled:opacity-50"
                  disabled={placingOrder || cartItems.length === 0 || !selectedAddress}
                  onClick={handlePlaceOrder}
                >
                  {placingOrder ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Placing Order...
                    </span>
                  ) : (
                    `Place Order • $${finalTotal.toFixed(2)}`
                  )}
                </Button>
                
                {/* Trust Indicators */}
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure SSL checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PawPrint className="w-4 h-4 text-amber-500" />
                    <span>100% pet satisfaction guarantee</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing an order, you agree to our{" "}
                  <a href="#" className="underline hover:text-amber-600">Terms & Conditions</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {showAddAddress && (
        <AddressModal isOpen={showAddAddress} onClose={() => setShowAddAddress(false)} />
      )}
      {editingAddress && (
        <EditAddressModal
          address={editingAddress}
          isOpen={!!editingAddress}
          onClose={() => setEditingAddress(null)}
        />
      )}
    </div>
  );
};
