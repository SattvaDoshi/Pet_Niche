import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { CartSummary } from "@/components/Cart/CartSummary";

export const CartPage = () => {
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
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

        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({itemCount})</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some items to get started!</p>
            <Link to="/products">
              <Button variant="luxury" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Items in your cart</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(clearCart())}
                  className="text-destructive hover:text-destructive"
                >
                  Clear All
                </Button>
              </div>

              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-6 bg-card rounded-lg shadow-soft">
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-30 object-cover rounded"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="font-medium hover:text-accent transition-smooth"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground mb-4">
                      Size: {item.selectedSize} • Color: {item.selectedColor}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">${(item.product.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">${item.product.price} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};