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
} from "firebase/auth";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { app } from "../firebase/firebase.config";
import { addUser } from "../redux/features/auth/customer/authSlice";
import { useGetMeMutation } from "../redux/features/auth/customer/customerAuthApi";
import { useGetMyVendorMutation } from "../redux/features/auth/vendor/venAuthApi";
import { useGetJWTTokenMutation } from "../redux/features/jwt/jwtApi";

export const AuthContext = createContext(null);

export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [getMe, { error }] = useGetMeMutation();
  const [getVendor] = useGetMyVendorMutation();
  const [getJWTToken] = useGetJWTTokenMutation();

  const [loading, setLoading] = useState(true);
  const [loadUser, setLoadUser] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signIn = (email, password) => {
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

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getMe(currentUser.email).then((res) => {
          if (res.data?.user) {
            setLoading(false);
            setLoadUser(false);
            dispatch(addUser(res.data?.user));
            getJWTToken(res.data?.user).then((res) => {
              Cookies.set("access-token", res.data.token);
            });
          } else {
            getVendor(currentUser.email).then((res) => {
              if (res.data?.user) {
                setLoading(false);
                setLoadUser(false);
                dispatch(addUser(res.data.user));
                getJWTToken(res.data?.user).then((res) => {
                  Cookies.set("access-token", res.data.token);
                });
              }
            });
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [dispatch, getMe, getVendor, getJWTToken, loadUser]);

  const authInfo = {
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
