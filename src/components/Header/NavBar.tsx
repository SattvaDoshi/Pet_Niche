import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setSelectedCategory } from "@/store/slices/productsSlice";

export const NavBar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector((state) => state.products);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
    { name: "New Arrivals", path: "/new" },
    { name: "Sale", path: "/sale" },
  ];

  const handleCategoryClick = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <nav className="border-t border-border">
      <div className="flex items-center space-x-8 py-4 overflow-x-auto">
        {/* Main Navigation */}
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "text-sm font-medium transition-smooth whitespace-nowrap hover:text-accent",
              location.pathname === item.path
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};