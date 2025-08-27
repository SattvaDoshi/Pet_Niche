import { Order } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, XCircle, MapPin, Download, Eye, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Order Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Order #{order.id}
            </h3>
            <p className="text-gray-600">
              Placed on {formatDate(order.date)}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className={cn(
                "px-3 py-1 text-sm font-medium rounded-full border",
                getStatusColor(order.status)
              )}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${order.total.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Items Ordered</h4>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded-lg bg-white border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-gray-900 truncate">
                  {item.productName}
                </h5>
                <p className="text-sm text-gray-600 mt-1">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="px-6 pb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <h4 className="font-medium text-gray-900">Delivery Address</h4>
          </div>
          <div className="text-sm text-gray-700 ml-6">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 hover:border-amber-300 hover:bg-amber-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          
          {order.status === 'delivered' && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Return Item
            </Button>
          )}
          
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300 hover:border-green-300 hover:bg-green-50"
            >
              <Truck className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 hover:border-gray-400"
          >
            <Download className="w-4 h-4 mr-2" />
            Invoice
          </Button>

          {order.status === 'delivered' && (
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white ml-auto"
              size="sm"
            >
              Buy Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
