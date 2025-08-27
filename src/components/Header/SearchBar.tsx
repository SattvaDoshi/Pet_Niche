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
    }, 300); // 300ms debounce delay
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
    // Prevent form submission as we're handling live search
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300 group-focus-within:text-black pointer-events-none" />

        <input
          type="text"
          placeholder="Search plants, décor, furniture..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-none bg-white text-sm font-light tracking-wide placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:border-black focus:ring-0 transition-all duration-300 hover:border-gray-300"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-all duration-300 p-1 hover:bg-gray-50 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};
