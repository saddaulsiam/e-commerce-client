import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TCartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  cartItems: TCartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
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
        state.cartItems.push(item);
      }

      state.totalAmount += item.price * item.quantity;
      state.totalQuantity += item.quantity;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      const item = state.cartItems.find((i) => i._id === _id);

      if (item && item.quantity > 1) {
        // Decrease quantity by 1
        state.totalAmount -= item.price;
        state.totalQuantity -= 1;

        item.quantity -= 1;

        state.totalAmount += item.price * item.quantity;
        state.totalQuantity += item.quantity;
      }
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
