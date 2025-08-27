import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSearchQuery } from "@/store/slices/productsSlice";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery } = useAppSelector((state) => state.products);

  // Sync local state with global search query
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // Debounce helper
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounceSearch = (value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(setSearchQuery(value));
      if (location.pathname !== "/products") {
        navigate("/products");
      }
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debounceSearch(value.trim());
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(setSearchQuery(""));
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder="Search pet food, toys, accessories..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};
