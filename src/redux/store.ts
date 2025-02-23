import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage for persistence
import baseApi from "./features/api/baseApi";
import authReducer from "./features/auth/customer/authSlice";
import cartReducer from "./features/cart/cartSlice";
import orderDetailsReducer from "./features/orders/orderDetails/orderDetailsSlice";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  orderDetails: orderDetailsReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Store Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
