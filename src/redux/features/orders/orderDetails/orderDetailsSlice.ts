import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
};

export const cartSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addOrderDetails: (state, { payload }) => {
      state.details = payload;
    },
    removeOrderDetails: (state) => {
      state.details = {};
    },
  },
});

export const { addOrderDetails, removeOrderDetails } = cartSlice.actions;

export default cartSlice.reducer;
