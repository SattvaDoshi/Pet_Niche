import { FooterLinks } from "./FooterLinks";
import { NewsletterSignup } from "./NewsletterSignup";
import { Facebook, Instagram, Twitter, Youtube, Heart, PawPrint, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-300" },
    { icon: Youtube, href: "#", label: "Youtube", color: "hover:text-red-400" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-3xl font-bold mb-6 group">
              <Heart className="w-8 h-8 fill-current text-red-400 group-hover:animate-heart-beat" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                PawPal
              </span>
            </Link>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              Your trusted partner in pet care. We bring joy, comfort, and premium quality 
              to every furry family member with thoughtfully curated products that pets and 
              parents love.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>123 Pet Street, Animal City, AC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>1-800-PAWPAL (729-725)</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>hello@pawpal.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 ${color} hover:scale-110 hover:bg-white/20`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <FooterLinks />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white/80 text-sm font-medium">Pet Approved</span>
              <span className="text-white/60 text-xs">100% Safe Materials</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                <PawPrint className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-white/80 text-sm font-medium">15K+ Reviews</span>
              <span className="text-white/60 text-xs">4.9/5 Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">24</span>
                </div>
              </div>
              <span className="text-white/80 text-sm font-medium">24/7 Support</span>
              <span className="text-white/60 text-xs">Always Here to Help</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                <div className="w-6 h-6 border-2 border-orange-400 rounded-full" />
              </div>
              <span className="text-white/80 text-sm font-medium">Free Shipping</span>
              <span className="text-white/60 text-xs">Orders Over $50</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <PawPrint className="w-5 h-5 text-amber-400" />
              <p className="text-white/70 text-sm">
                © 2025 PawPal. All rights reserved. Made with{" "}
                <Heart className="w-4 h-4 inline fill-current text-red-400 animate-heart-beat" />{" "}
                for pets everywhere.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-white/60 hover:text-amber-400 transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-white/60 hover:text-amber-400 transition-colors duration-200 hover:underline"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-white/60 hover:text-amber-400 transition-colors duration-200 hover:underline"
              >
                Cookie Policy
              </Link>
              <Link 
                to="/accessibility" 
                className="text-white/60 hover:text-amber-400 transition-colors duration-200 hover:underline"
              >
                Accessibility
              </Link>
            </div>
          </div>

          {/* Pet love message */}
          <div className="text-center mt-6 pt-6 border-t border-white/5">
            <p className="text-white/50 text-xs flex items-center justify-center gap-2">
              <PawPrint className="w-3 h-3" />
              Every purchase helps support local animal shelters
              <Heart className="w-3 h-3 fill-current text-red-400" />
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 opacity-20"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
            className="text-amber-400"
          />
        </svg>
      </div>
    </footer>
  );
};
