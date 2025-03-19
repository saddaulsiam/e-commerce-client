import { TUser } from "@/types/common";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: TUser | null;
};

const initialState: TAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      state.user = actions.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
    
  },
});

export const { addUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
