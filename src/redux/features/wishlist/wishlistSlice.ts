import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types/common";

interface WishlistState {
  items: TProduct[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<TProduct>) => {
      // Add product if not already in wishlist
      const productExists = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (!productExists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      // Remove product by its ID
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearWishlist: (state) => {
      // Clear all wishlist items
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
