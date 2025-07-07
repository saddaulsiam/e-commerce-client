"use client";

import { authKey } from "@/constants/common";
import { useGetMeMutation } from "@/redux/features/auth/authApi";
import { addUser, logOutUser } from "@/redux/features/auth/authSlice";
import { removeOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { deleteCookies } from "@/services/deleteCookies";
import { removeFromLocalStorage } from "@/utils/localStorage";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { app } from "../firebase/firebase.config";

export interface AuthContextType {
  createUser: (
    email: string,
    password: string,
  ) => Promise<UserCredential | void>;
  forgotPassword: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential | void>;
  googleLogIn: () => Promise<UserCredential | void>;
  facebookLogIn: () => Promise<UserCredential | void>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  createUser: async () => undefined,
  forgotPassword: async () => undefined,
  signIn: async () => undefined,
  googleLogIn: async () => undefined,
  facebookLogIn: async () => undefined,
  logOut: async () => undefined,
  updateUserProfile: async () => undefined,
  refreshUser: async () => undefined,
});

export const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [myData] = useGetMeMutation();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred.";
  };

  const clearLocalAuth = useCallback(async () => {
    removeFromLocalStorage(authKey.ACCESS_TOKEN);
    await deleteCookies(authKey.REFRESH_TOKEN);
    dispatch(logOutUser());
    dispatch(removeOrderDetails());
  }, [dispatch]);

  const createUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      toast.info(
        "A verification email has been sent. Please check your inbox.",
      );
      return userCredential;
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (!userCredential.user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        return;
      }
      return userCredential;
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const googleLogIn = async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const facebookLogIn = async () => {
    try {
      return await signInWithPopup(auth, facebookProvider);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const updateUserProfile = async (name: string) => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      toast.success("Profile updated successfully.");
    } catch (error: unknown) {
      toast.error(`Error updating profile: ${getErrorMessage(error)}`);
    }
  };

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      toast.warn(`Sign-out from server failed: ${getErrorMessage(error)}`);
    } finally {
      await clearLocalAuth();
    }
  }, [clearLocalAuth]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await myData(undefined).unwrap();
      if (res?.data) {
        dispatch(addUser(res.data));
      }
    } catch (error: unknown) {
      console.error("Error refreshing user:", getErrorMessage(error));
    }
  }, [myData, dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!currentUser || !currentUser.emailVerified) {
          await logOut();
          await clearLocalAuth();
          return;
        }
        await refreshUser();
      } catch (error: unknown) {
        console.error(getErrorMessage(error));
      }
    });

    return () => unsubscribe();
  }, [clearLocalAuth, logOut, refreshUser]);

  const authInfo: AuthContextType = {
    createUser,
    forgotPassword,
    signIn,
    googleLogIn,
    facebookLogIn,
    logOut,
    updateUserProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
