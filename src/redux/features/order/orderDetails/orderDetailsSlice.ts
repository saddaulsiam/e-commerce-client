import { TAddress } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TDetails {
  shippingAddress: TAddress | null;
}

const initialState: TDetails = {
  shippingAddress: null,
};

// Create Slice
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addOrderDetails: (state, action: PayloadAction<TAddress>) => {
      state.shippingAddress = action.payload;
    },
    removeOrderDetails: (state) => {
      state.shippingAddress = null;
    },
  },
});

export const { addOrderDetails, removeOrderDetails } =
  orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
