import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import { User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { CartIcon } from "../Cart/CartIcon";
import { WishlistIcon } from "../Wishlist/WishlistIcon";

export const Header = () => {
  const { itemCount } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      // Add background blur effect when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100" 
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors duration-200"
          >
            <Heart className="w-7 h-7 fill-current" />
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              PawPal
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* User Account */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-amber-50 hover:text-amber-600 font-medium transition-colors"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <WishlistIcon />

            {/* Shopping Cart */}
            <CartIcon />
          </div>
        </div>

        {/* Navigation */}
        <NavBar />

        {/* Mobile Search - Shown on mobile */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Decorative bottom border gradient */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
    </header>
  );
};
