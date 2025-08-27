import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{
      product: Product;
      quantity: number;
      selectedSize: string;
      selectedColor: string;
    }>) => {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingItem = state.items.find(
        item => 
          item.product.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${selectedSize}-${selectedColor}`,
          product,
          quantity,
          selectedSize,
          selectedColor,
        };
        state.items.push(newItem);
      }

      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  setCartOpen 
} = cartSlice.actions;
export default cartSlice.reducer;
