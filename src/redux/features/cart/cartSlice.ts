import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TCartItem {
  name: string;
  productId: string;
  vendorId: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface TCart {
  cartItems: TCartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: TCart = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.productId === item.productId,
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item });
      }

      // ✅ Ensure we only add the correct price and quantity once
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.cartItems.find((i) => i.productId === productId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      // ✅ Ensure totals are updated correctly
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.cartItems.find((i) => i.productId === productId);

      if (item) {
        state.totalAmount -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.cartItems = state.cartItems.filter(
          (i) => i.productId !== productId,
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
