import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { removeAddress, setDefaultAddress } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import { MapPin, Edit, Trash2, Check, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { EditAddressModal } from "@/components/Profile/EditAddressModal";
import { Address } from "@/store/slices/userSlice";

interface AddressListProps {
  onAddAddress?: () => void;
}

export const AddressList = ({ onAddAddress }: AddressListProps) => {
  const { addresses } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleRemoveAddress = (addressId: string) => {
    dispatch(removeAddress(addressId));
    toast({
      title: "Address removed 🗑️",
      description: "The address has been removed from your account.",
    });
  };

  const handleSetDefault = (addressId: string) => {
    dispatch(setDefaultAddress(addressId));
    toast({
      title: "Default address updated 📍",
      description: "This is now your default delivery address for pet orders.",
    });
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
  };

  const handleCloseEdit = () => {
    setEditingAddress(null);
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">No addresses saved</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Add your first delivery address to make ordering pet supplies quick and easy!
        </p>
        <Button 
          onClick={onAddAddress}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-white rounded-xl border-2 p-6 transition-all duration-200 ${
              address.isDefault
                ? "border-amber-300 bg-amber-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Address Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  address.isDefault ? "bg-amber-200" : "bg-gray-200"
                }`}>
                  <MapPin className={`w-4 h-4 ${
                    address.isDefault ? "text-amber-600" : "text-gray-600"
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{address.name}</h3>
                {address.isDefault && (
                  <span className="bg-amber-600 text-white px-2 py-1 text-xs font-medium rounded-full">
                    DEFAULT
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditAddress(address)}
                  className="p-2 h-8 w-8 border-gray-300 hover:border-amber-300 hover:bg-amber-50"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveAddress(address.id)}
                  className="p-2 h-8 w-8 border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Address Details */}
            <div className="text-gray-600 space-y-1 mb-6">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              {!address.isDefault && (
                <Button
                  onClick={() => handleSetDefault(address.id)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Set as Default
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => handleEditAddress(address)}
                className="flex-1 border-gray-300 hover:border-amber-300 hover:bg-amber-50 text-sm"
              >
                Edit Address
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Address Modal */}
      {editingAddress && (
        <EditAddressModal
          address={editingAddress}
          isOpen={!!editingAddress}
          onClose={handleCloseEdit}
        />
      )}
    </>
  );
};
