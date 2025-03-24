import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types/common";

interface CompareState {
  items: TProduct[];
}

const initialState: CompareState = {
  items: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<TProduct>) => {
      // Add product only if it doesn't already exist in the compare list
      const exists = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      // Remove product by its unique ID
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCompare: (state) => {
      // Clear the entire compare list
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
