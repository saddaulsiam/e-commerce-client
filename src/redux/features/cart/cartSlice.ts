import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TCartItem {
  _id: string;
  name: string;
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
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
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
      const _id = action.payload;
      const item = state.cartItems.find((i) => i._id === _id);

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
      const _id = action.payload;
      const item = state.cartItems.find((i) => i._id === _id);

      if (item) {
        state.totalAmount -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.cartItems = state.cartItems.filter((i) => i._id !== _id);
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
