import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Truck } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=2000&auto=format&fit=crop&q=80" 
          alt="Happy pets in a beautiful home setting" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-orange-900/5" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
            Premium Pet Care Essentials
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-light mb-8 text-gray-800 leading-tight">
            Everything Your
            <span className="block font-medium text-amber-600">
              Pet Needs
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl mb-10 text-gray-600 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
            Thoughtfully designed products for the modern pet parent. 
            Quality meets comfort in every piece.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Link to="/products">
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Button>
            </Link>
            <Link to="/new">
              <Button 
                variant="outline" 
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-medium px-8 py-6 text-lg rounded-full transition-all duration-300"
              >
                New Arrivals
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-500" />
              <span>Pet-Parent Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>Safety Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" />
              <span>Fast & Free Shipping</span>
            </div>
          </div>
        </div>

        {/* Right Content - Product Showcase */}
        <div className="relative lg:block hidden">
          <div className="relative">
            {/* Main Product Image */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://media.istockphoto.com/id/1209343968/photo/dog-sleeping-in-his-bad.jpg?s=612x612&w=0&k=20&c=t1JYmmCWWDzfiFzE7m-OqzvCcMpVUc5uhKboF88bF2w="
                alt="Premium pet bed"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-800">Minimalist Pet Bed</h3>
                <p className="text-amber-600 font-semibold">$89</p>
              </div>
            </div>

            {/* Floating Product Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&auto=format&fit=crop&q=80"
                alt="Ceramic food bowl"
                className="w-20 h-20 object-cover rounded-xl"
              />
              <p className="text-xs font-medium mt-2 text-gray-700">Ceramic Bowls</p>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://media.istockphoto.com/id/1518353585/photo/pet-cat-is-using-pet-water-dispenser-image-of-drinking-water-closeup-indoor-shot-sofa-and.jpg?s=612x612&w=0&k=20&c=wmKByrNAg43rjmOdBj-z3AIMzd-POl2ygNpxZ1MqLw8="
                alt="Water fountain"
                className="w-20 h-20 object-cover rounded-xl"
              />
              <p className="text-xs font-medium mt-2 text-gray-700">Water Fountain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Discover More</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-400 to-transparent">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce -ml-0.5" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-amber-200/20 rounded-full blur-xl" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-200/20 rounded-full blur-lg" />
    </section>
  );
};
