import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const selectedProduct = state.products.find(
        (product) => product._id === payload._id
      );
      if (!selectedProduct) {
        const product = { ...payload, quantity: 1 };
        state.products.push(product);
      } else {
        selectedProduct.quantity += 1;

        state.products
          .filter((product) => product._id !== selectedProduct.id)
          .push(selectedProduct);
      }
    },

    decreaseQuantity: (state, { payload }) => {
      const existingItemIndex = state.products.findIndex(
        (item) => item._id === payload._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.products[existingItemIndex];

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.products.splice(existingItemIndex, 1);
        }
      }
    },

    removeFromCart: (state, { payload }) => {
      const products = state.products.filter(
        (cartItem) => cartItem._id !== payload
      );
      state.products = products;
    },

    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
