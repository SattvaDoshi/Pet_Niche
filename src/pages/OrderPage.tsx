import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { OrderCard } from "@/components/Orders/OrderCard";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, PawPrint, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OrderPage = () => {
  const { orders } = useAppSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/profile" 
              className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">
                {orders.length === 0 
                  ? "No orders yet" 
                  : `${orders.length} order${orders.length > 1 ? 's' : ''} for your pets`
                }
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start shopping for your furry friends! Browse our collection of premium pet products.
              </p>
              <Link to="/products">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  <PawPrint className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Orders Summary */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {orders.filter(o => o.status === 'delivered').length}
                    </div>
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {orders.filter(o => o.status === 'shipped').length}
                    </div>
                    <div className="text-sm text-gray-600">In Transit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 mb-1">
                      {orders.filter(o => o.status === 'processing').length}
                    </div>
                    <div className="text-sm text-gray-600">Processing</div>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-12 text-center">
                <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
                  <PawPrint className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Want to spoil your pets more?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover more amazing products your furry friends will love!
                  </p>
                  <Link to="/products">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
