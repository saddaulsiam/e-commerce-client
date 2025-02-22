import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import baseApi from "../features/api/baseApi";
import authReducer from "../features/auth/customer/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderDetailsReducer from "../features/orders/orderDetails/orderDetailsSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "orderDetails"],
};

// Root Reducer
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  orderDetails: orderDetailsReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }).concat(baseApi.middleware),
});

// Store Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
