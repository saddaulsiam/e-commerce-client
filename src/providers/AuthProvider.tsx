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
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { app } from "../firebase/firebase.config";

export interface AuthContextType {
  loadUser: boolean;
  setLoadUser: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
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
}

export const AuthContext = createContext<AuthContextType>({
  loadUser: false,
  setLoadUser: () => {},
  loading: false,
  setLoading: () => {},
  createUser: async () => undefined,
  forgotPassword: async () => undefined,
  signIn: async () => undefined,
  googleLogIn: async () => undefined,
  facebookLogIn: async () => undefined,
  logOut: async () => undefined,
  updateUserProfile: async () => undefined,
});

export const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const [myData] = useGetMeMutation();

  const [loading, setLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Utility: Clear all local auth state
  const clearLocalAuth = useCallback(async () => {
    removeFromLocalStorage(authKey.ACCESS_TOKEN);
    await deleteCookies(authKey.REFRESH_TOKEN);
    dispatch(logOutUser());
    dispatch(removeOrderDetails());
  }, [dispatch]);

  const createUser = async (email: string, password: string) => {
    setLoading(true);
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
    } catch (error: any) {
      toast.error(error?.message || "Error creating user.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      toast.error(error?.message || "Error sending reset email.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
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
    } catch (error: any) {
      toast.error(error?.message || "Error signing in.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogIn = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      toast.error(error?.message || "Error with Google login.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const facebookLogIn = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, facebookProvider);
    } catch (error: any) {
      toast.error(error?.message || "Error with Facebook login.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = useCallback(async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch {
      toast.warn("Sign-out from server failed");
    } finally {
      await clearLocalAuth();
      setLoading(false);
    }
  }, [clearLocalAuth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        setLoadUser(true);
        setLoading(true);

        try {
          if (!currentUser) {
            await clearLocalAuth();
            return;
          }
          if (!currentUser.emailVerified) {
            await logOut();
            return;
          }
          const res = await myData(undefined).unwrap();
          if (res?.data) {
            dispatch(addUser(res.data));
          }
        } catch {
          // console.error("Error in onAuthStateChanged:", err);
        } finally {
          setLoadUser(false);
          setLoading(false);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    loadUser,
    setLoadUser,
    loading,
    setLoading,
    createUser,
    forgotPassword,
    signIn,
    googleLogIn,
    facebookLogIn,
    logOut,
    updateUserProfile: async (name: string) => {
      if (!auth.currentUser) return;
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, { displayName: name });
        toast.success("Profile updated successfully.");
      } catch (error: any) {
        toast.error("Error updating profile: " + (error?.message || ""));
      } finally {
        setLoading(false);
      }
    },
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
