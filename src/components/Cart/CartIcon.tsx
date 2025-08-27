import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { toggleCart } from "@/store/slices/cartSlice";

export const CartIcon = () => {
  const { itemCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => dispatch(toggleCart())}
    >
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute bg-amber-500 -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
};