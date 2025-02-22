"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store/store";
import AuthProvider from "./AuthProvider";

interface ProvidersProps {
  children: ReactNode;
}

const ReduxProviders = ({ children }: ProvidersProps) => (
  <Provider store={store}>
    <AuthProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </AuthProvider>
  </Provider>
);

export default ReduxProviders;
