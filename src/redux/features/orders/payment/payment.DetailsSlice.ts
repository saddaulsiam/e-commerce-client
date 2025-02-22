import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
};

export const paymentDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
});

export const {} = paymentDetails.actions;

export default paymentDetails.reducer;
