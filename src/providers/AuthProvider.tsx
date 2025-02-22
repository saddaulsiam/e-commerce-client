"use client";

import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import Cookies from "js-cookie";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { app } from "../firebase/firebase.config";
import { addUser } from "../redux/features/auth/customer/authSlice";
import { useGetMeMutation } from "../redux/features/auth/customer/customerAuthApi";
import { useGetMyVendorMutation } from "../redux/features/auth/vendor/venAuthApi";
import { useGetJWTTokenMutation } from "../redux/features/jwt/jwtApi";

export interface AuthContextType {
  loadUser: boolean;
  setLoadUser: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  createUser: (email: string, password: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  googleLogIn: () => Promise<any>;
  facebookLogIn: () => Promise<any>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  loadUser: false,
  setLoadUser: () => {},
  loading: false,
  setLoading: () => {},
  createUser: async () => Promise.resolve(),
  forgotPassword: async () => Promise.resolve(),
  signIn: async () => Promise.resolve(),
  googleLogIn: async () => Promise.resolve(),
  facebookLogIn: async () => Promise.resolve(),
  logOut: async () => Promise.resolve(),
  updateUserProfile: async () => Promise.resolve(),
});

export const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [getMe] = useGetMeMutation();
  const [getVendor] = useGetMyVendorMutation();
  const [getJWTToken] = useGetJWTTokenMutation();

  const [loading, setLoading] = useState<boolean>(true);
  const [loadUser, setLoadUser] = useState<boolean>(false);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const forgotPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const facebookLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    Cookies.remove("access-token");
  };

  const updateUserProfile = async (name: string, photo: string) => {
    if (auth.currentUser) {
      setLoading(true);
      await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      if (currentUser) {
        try {
          const res = await getMe(currentUser.email!);
          if (res.data?.user) {
            dispatch(addUser(res.data.user));
            const jwtRes = await getJWTToken(res.data.user);
            Cookies.set("access-token", jwtRes.data.token);
          } else {
            const vendorRes = await getVendor(currentUser.email!);
            if (vendorRes.data?.user) {
              dispatch(addUser(vendorRes.data.user));
              const jwtRes = await getJWTToken(vendorRes.data.user);
              Cookies.set("access-token", jwtRes.data.token);
            }
          }
        } catch (error) {
          console.error("Authentication Error:", error);
        } finally {
          setLoading(false);
          setLoadUser(false);
        }
      } else {
        Cookies.remove("access-token");
      }
    });
    return () => unsubscribe();
  }, [dispatch, getMe, getVendor, getJWTToken]);

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
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
