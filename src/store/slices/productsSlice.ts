import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
}

interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  trendingProducts: Product[];
  categories: string[];
  selectedCategory: string | null;
  loading: boolean;
  searchQuery: string;
  filteredProducts: Product[];
}

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Pet Bed',
    price: 89,
    originalPrice: 129,
    images: [
      'data:image/jpeg;base64,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',
'https://media.istockphoto.com/id/488640434/photo/pet-bed.jpg?s=612x612&w=0&k=20&c=uNd3EBKVNMdzt_OMGQ6VjaAV0YfCiC0PJ2s6ml-DW4k='
    ],
    category: 'Pet Beds',
    brand: 'COZY',
    description: 'Clean-lined pet bed crafted from sustainable materials',
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['White', 'Black', 'Natural'],
    rating: 4.8,
    reviewCount: 124,
    isOnSale: true,
  },
  {
    id: '2',
    name: 'Ceramic Food Bowl Set',
    price: 145,
    images: [
'https://media.istockphoto.com/id/518211348/photo/dog-and-cat-eating-natural-food-from-a-bowl.jpg?s=612x612&w=0&k=20&c=G3PxiUxuZKsRdgJey-bIetiaNaJVDDlHwVznSYVVu54=',
'https://media.istockphoto.com/id/518211348/photo/dog-and-cat-eating-natural-food-from-a-bowl.jpg?s=612x612&w=0&k=20&c=G3PxiUxuZKsRdgJey-bIetiaNaJVDDlHwVznSYVVu54=',
  ],
    category: 'Feeding',
    brand: 'PURE',
    description: 'Handcrafted ceramic bowls with anti-slip base',
    sizes: ['Small', 'Medium', 'Large', 'XL'],
    colors: ['White', 'Charcoal', 'Stone'],
    rating: 4.9,
    reviewCount: 89,
    isTrending: true,
        isFeatured: true,

  },
  {
    id: '3',
    name: 'Modern Cat Tree',
    price: 320,
    images: [
'https://media.istockphoto.com/id/1125395131/photo/two-cats-on-scratching-post.jpg?s=612x612&w=0&k=20&c=d3ot9czRTdlMc7X_NIMHIZPgOVwG9TZuHh3-cDwO05g=',      
'https://www.istockphoto.com/photo/scratching-post-gm1210185135-350487146?searchscope=image%2Cfilm'    ],
    category: 'Cat Furniture',
    brand: 'MINIMAL',
    description: 'Contemporary cat tower with multiple levels and scratching posts',
    sizes: ['120cm', '150cm', '180cm'],
    colors: ['Black', 'White', 'Gray'],
    rating: 4.6,
    reviewCount: 156,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Wall-Mounted Pet Feeder',
    price: 75,
    images: [
'https://media.istockphoto.com/id/539653304/photo/dog-bowls-in-the-kennel-closeup-3d-rendering.jpg?s=612x612&w=0&k=20&c=I065aRcojSwybu4guVpsxsAEuTacMHBXxRjttvkKDkI='
    ],
    category: 'Feeding',
    brand: 'FORM',
    description: 'Space-saving wall feeder for modern pet owners',
    sizes: ['Single Bowl', 'Double Bowl', 'Triple Bowl'],
    colors: ['White', 'Black'],
    rating: 4.7,
    reviewCount: 67,
    isTrending: true,
    isNew: true,
  },
  {
    id: '5',
    name: 'Bamboo Pet Toy Box',
    price: 45,
    originalPrice: 65,
    images: [
'https://media.istockphoto.com/id/2060178404/photo/wooden-box.jpg?s=612x612&w=0&k=20&c=u29i8jmFmNVK_8wo5t-w5W5NKddEkylyUJnXdfe5kJo=',
'https://media.istockphoto.com/id/2060178404/photo/wooden-box.jpg?s=612x612&w=0&k=20&c=u29i8jmFmNVK_8wo5t-w5W5NKddEkylyUJnXdfe5kJo=',
    ],
    category: 'Storage',
    brand: 'NATURAL',
    description: 'Sustainable bamboo storage for pet toys and accessories',
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Natural', 'Black', 'White'],
    rating: 4.5,
    reviewCount: 203,
    isOnSale: true,
  },
  {
    id: '6',
    name: 'Designer Water Fountain',
    price: 125,
    images: [
'https://media.istockphoto.com/id/1061642872/photo/thirsty-tabby-cat-drinking-water-from-a-pet-drinking-fountain-side-view-with-copy-space.jpg?s=612x612&w=0&k=20&c=SGxH_Q7U7LczFehCgLZ-4VeAQrrJsJH9etaImfmQL0k=',
'https://media.istockphoto.com/id/180835423/photo/dog-at-a-water-fountain.jpg?s=612x612&w=0&k=20&c=It_ShQ-16ax3oDqeuLNPNt4OFwNo5IhyGeA0BL_L63k='
    ],
    category: 'Water & Feeding',
    brand: 'FLOW',
    description: 'Sculptural pet water fountain with filtration system',
    sizes: ['1L', '2L', '3L'],
    colors: ['Matte Black', 'Pure White', 'Brushed Steel'],
    rating: 4.9,
    reviewCount: 45,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '7',
    name: 'Luxury Pet Carrier Set',
    price: 180,
    images: [
'https://media.istockphoto.com/id/1289121288/photo/set-of-pet-supplies-for-kitty-cat-isolated-on-white.jpg?s=612x612&w=0&k=20&c=I6mf27-pGtMZPmVOYtK0WvDY8NLyS14Oc8YuBxRgGug=',
'https://media.istockphoto.com/id/1434357899/photo/concept-travel-or-moving-with-animal-flight-safety-plastic-cage-pet-carrier-on-grey-background.jpg?s=612x612&w=0&k=20&c=XXLADWSZDgOCxZyVjj7Moe8W304ML4FAKBiQVBub_0g='    ],
    category: 'Travel',
    brand: 'VOYAGE',
    description: 'Premium travel carriers with comfort padding',
    sizes: ['Small Pets', 'Medium Pets', 'Large Pets'],
    colors: ['Gray', 'White', 'Charcoal'],
    rating: 4.8,
    reviewCount: 92,
    isTrending: true,
  },
  {
    id: '8',
    name: 'Smart Pet Activity Monitor',
    price: 220,
    originalPrice: 290,
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1000&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1000&auto=format&fit=crop&q=60'
    ],
    category: 'Tech & Wellness',
    brand: 'SMART',
    description: 'Advanced activity tracker with health monitoring features',
    sizes: ['Small Collar', 'Medium Collar', 'Large Collar'],
    colors: ['Matte Black', 'Pure White'],
    rating: 4.7,
    reviewCount: 134,
    isFeatured: false,
    isOnSale: true,
  },
];

const initialState: ProductsState = {
  products: dummyProducts,
  featuredProducts: dummyProducts.filter(p => p.isFeatured),
  trendingProducts: dummyProducts.filter(p => p.isTrending),
  categories: [
    'All', 
    'Pet Beds', 
    'Feeding', 
    'Cat Furniture', 
    'Storage', 
    'Water & Feeding', 
    'Travel', 
    'Tech & Wellness'
  ],
  selectedCategory: 'All',
  loading: false,
  searchQuery: '',
  filteredProducts: dummyProducts,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'All') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(product => 
          product.category === action.payload
        );
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      
      let filtered = state.products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );

      // Apply category filter if one is selected
      if (state.selectedCategory && state.selectedCategory !== 'All') {
        filtered = filtered.filter(product => 
          product.category === state.selectedCategory
        );
      }

      state.filteredProducts = filtered;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = 'All';
      state.searchQuery = '';
      state.filteredProducts = state.products;
    },
    // Additional pet-specific reducers
    filterByPetType: (state, action: PayloadAction<'dog' | 'cat' | 'all'>) => {
      const petType = action.payload;
      if (petType === 'all') {
        state.filteredProducts = state.products;
      } else if (petType === 'cat') {
        state.filteredProducts = state.products.filter(product =>
          product.category === 'Cat Furniture' ||
          product.name.toLowerCase().includes('cat')
        );
      } else if (petType === 'dog') {
        state.filteredProducts = state.products.filter(product =>
          !product.category.includes('Cat') &&
          !product.name.toLowerCase().includes('cat')
        );
      }
    },
    sortProducts: (state, action: PayloadAction<'price-asc' | 'price-desc' | 'rating' | 'newest'>) => {
      const sortBy = action.payload;
      
      state.filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          default:
            return 0;
        }
      });
    },
  },
});

export const { 
  setSelectedCategory, 
  setSearchQuery, 
  setLoading,
  clearFilters,
  filterByPetType,
  sortProducts
} = productsSlice.actions;

export default productsSlice.reducer;
