import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
}

export const RatingStars = ({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showRating = false,
  className 
}: RatingStarsProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(rating);
          const halfFilled = index === Math.floor(rating) && rating % 1 !== 0;
          
          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                filled || halfFilled
                  ? "fill-rose-gold text-rose-gold"
                  : "text-muted-foreground"
              )}
            />
          );
        })}
      </div>
      {showRating && (
        <span className="text-sm text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};