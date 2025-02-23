"use client";

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
} from "firebase/auth";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { app } from "../firebase/firebase.config";
import { useGetMeMutation } from "../redux/features/auth/authApi";
import { addUser } from "../redux/features/auth/authSlice";
import { useGetMyVendorMutation } from "../redux/features/auth/vendorApi";
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

  const [loading, setLoading] = useState<boolean>(false);
  const [loadUser, setLoadUser] = useState<boolean>(false);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      toast.info("A verification email has been sent. Please check your inbox.");
      return userCredential;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      throw error;
    }
  };

  const forgotPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        toast.error("Please verify your email before logging in.");
        await signOut(auth);
        setLoading(false);
        return;
      }
      return userCredential;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      throw error;
    }
  };

  const googleLogIn = async () => {
    setLoading(true);
    return await signInWithPopup(auth, googleProvider);
  };

  const facebookLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    Cookies.remove("access-token");
    setLoading(false);
  };

  const updateUserProfile = async (name: string, photo: string) => {
    if (auth.currentUser) {
      setLoading(true);
      await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      console.log(currentUser);
      if (currentUser) {
        if (!currentUser.emailVerified) {
          await signOut(auth);
          return;
        }
        localStorage.setItem("accessToken", currentUser.accessToken);
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
