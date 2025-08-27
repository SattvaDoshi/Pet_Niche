import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, Settings, PawPrint, ArrowRight } from "lucide-react";

export const ProfileOverview = () => {
  const { user, orders } = useAppSelector((state) => state.user);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please sign in</h2>
            <p className="text-gray-600 mb-8">Access your profile, orders, and wishlist to manage your pet shopping experience.</p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = [
    {
      icon: Package,
      label: "Orders",
      value: orders.length,
      href: "/orders",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Heart,
      label: "Wishlist",
      value: wishlistItems.length,
      href: "/wishlist", 
      color: "bg-red-50 text-red-600",
    },
    {
      icon: MapPin,
      label: "Addresses",
      value: 2,
      href: "/addresses",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

          {/* User Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-amber-600 font-medium">Pet Parent since 2023</p>
              </div>
              <Button variant="outline" className="border-gray-300 hover:border-amber-300">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Link key={stat.label} to={stat.href}>
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/orders">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-300 hover:bg-blue-50">
                  <Package className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-red-300 hover:bg-red-50">
                  <Heart className="w-4 h-4 mr-2" />
                  My Wishlist
                </Button>
              </Link>
              <Link to="/addresses">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-green-300 hover:bg-green-50">
                  <MapPin className="w-4 h-4 mr-2" />
                  Manage Addresses
                </Button>
              </Link>
              <Link to="/products">
                <Button className="w-full justify-start bg-amber-600 hover:bg-amber-700 text-white">
                  <PawPrint className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          {orders.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link to="/orders">
                  <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {order.items.length} items for your pets
                      </p>
                      <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Orders State */}
          {orders.length === 0 && (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping for your furry friends!</p>
              <Link to="/products">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  <PawPrint className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
