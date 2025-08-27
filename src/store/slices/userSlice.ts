import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  shippingAddress: Address;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
}

interface UserState {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  isAuthenticated: boolean;
}

const dummyUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@email.com',
  phone: '+1 (555) 789-0123',
  dateOfBirth: '1988-03-22',
};

const dummyAddresses: Address[] = [
  {
    id: '1',
    name: 'Home',
    street: '247 Garden Terrace, Unit 12A',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Weekend House',
    street: '89 Countryside Lane',
    city: 'Bend',
    state: 'OR',
    zipCode: '97703',
    country: 'United States',
    isDefault: false,
  },
];

const dummyOrders: Order[] = [
  {
    id: 'EDN-001',
    date: '2025-01-15',
    status: 'delivered',
    items: [
      {
        productId: '1',
        productName: 'Minimalist Plant Stand',
        quantity: 2,
        price: 89,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      },
      {
        productId: '4',
        productName: 'Geometric Wall Shelf',
        quantity: 1,
        price: 75,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      },
    ],
    total: 253,
    shippingAddress: dummyAddresses[0],
  },
  {
    id: 'EDN-002',
    date: '2025-01-08',
    status: 'shipped',
    items: [
      {
        productId: '2',
        productName: 'Ceramic Planter Set',
        quantity: 1,
        price: 145,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      },
      {
        productId: '6',
        productName: 'Designer Watering Can',
        quantity: 1,
        price: 125,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      },
    ],
    total: 270,
    shippingAddress: dummyAddresses[0],
  },
  {
    id: 'EDN-003',
    date: '2024-12-20',
    status: 'delivered',
    items: [
      {
        productId: '8',
        productName: 'Modern Floor Lamp',
        quantity: 1,
        price: 220,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      },
    ],
    total: 220,
    shippingAddress: dummyAddresses[1],
  },
];

const initialState: UserState = {
  user: dummyUser,
  addresses: dummyAddresses,
  orders: dummyOrders,
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.addresses = [];
      state.orders = [];
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses.forEach(addr => {
        addr.isDefault = addr.id === action.payload;
      });
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const {
  setUser,
  logout,
  updateUser,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  addOrder,
} = userSlice.actions;
export default userSlice.reducer;
