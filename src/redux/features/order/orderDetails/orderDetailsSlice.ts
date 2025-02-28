import { TAddress } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TDetails {
  shippingAddress: TAddress;
}

const initialState: TDetails = {
  shippingAddress: {
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    area: "",
    address: "",
  },
};

// Create Slice
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addOrderDetails: (state, action: PayloadAction<TAddress>) => {
      state.shippingAddress = action.payload;
    },
    removeOrderDetails: () => initialState,
  },
});

export const { addOrderDetails, removeOrderDetails } =
  orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
