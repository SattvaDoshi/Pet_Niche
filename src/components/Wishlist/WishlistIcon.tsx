import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const WishlistIcon = () => {
  const { items } = useAppSelector((state) => state.wishlist);
  const hasItems = items.length > 0;

  return (
    <Link to="/wishlist">
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "relative hover:bg-amber-50 transition-all duration-200 group",
          hasItems && "text-red-500 hover:text-red-600"
        )}
      >
        <Heart 
          className={cn(
            "w-5 h-5 transition-all duration-200",
            hasItems && "fill-current scale-110"
          )} 
        />
        
        {/* Badge for item count */}
        {hasItems && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
            {items.length > 99 ? '99+' : items.length}
          </span>
        )}

        {/* Hover effect - small hearts */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-300 fill-current animate-bounce" style={{ animationDelay: '0s' }} />
          <Heart className="absolute -bottom-1 -left-1 w-2 h-2 text-red-200 fill-current animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </Button>
    </Link>
  );
};
