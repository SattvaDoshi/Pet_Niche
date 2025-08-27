import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { AddressList } from "@/components/Profile/AddressList";
import { AddressModal } from "@/components/Profile/AddressModal";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AddressPage = () => {
  const { addresses } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/profile" 
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors duration-200 font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-12">
          <h1 className="text-4xl font-light tracking-tight text-black">
            My Addresses 
            <span className="text-2xl text-gray-400 ml-2">({addresses.length})</span>
          </h1>
          <Button 
            onClick={handleAddAddress}
            className="bg-black text-white hover:bg-gray-900 font-medium px-6 py-3 transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Address
          </Button>
        </div>

        <AddressList />
      </main>

      <Footer />

      {/* Address Modal */}
      <AddressModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};
