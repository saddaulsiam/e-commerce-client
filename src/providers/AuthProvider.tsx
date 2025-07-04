// "use client";

// import { authKey } from "@/constants/common";
// import { useGetAdminByEmailMutation } from "@/redux/features/admin/adminApi";
// import { useGetMeMutation } from "@/redux/features/auth/authApi";
// import { addUser } from "@/redux/features/auth/authSlice";
// import { deleteCookies } from "@/services/deleteCookies";
// import { removeFromLocalStorage } from "@/utils/localStorage";
// import {
//   createUserWithEmailAndPassword,
//   FacebookAuthProvider,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendEmailVerification,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
//   User,
// } from "firebase/auth";
// import { createContext, ReactNode, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { app } from "../firebase/firebase.config";

// export interface AuthContextType {
//   loadUser: boolean;
//   setLoadUser: (value: boolean) => void;
//   loading: boolean;
//   setLoading: (value: boolean) => void;
//   createUser: (email: string, password: string) => Promise<any>;
//   forgotPassword: (email: string) => Promise<void>;
//   signIn: (email: string, password: string) => Promise<any>;
//   googleLogIn: () => Promise<any>;
//   facebookLogIn: () => Promise<any>;
//   logOut: () => Promise<void>;
//   updateUserProfile: (name: string) => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   loadUser: false,
//   setLoadUser: () => {},
//   loading: false,
//   setLoading: () => {},
//   createUser: async () => Promise.resolve(),
//   forgotPassword: async () => Promise.resolve(),
//   signIn: async () => Promise.resolve(),
//   googleLogIn: async () => Promise.resolve(),
//   facebookLogIn: async () => Promise.resolve(),
//   logOut: async () => Promise.resolve(),
//   updateUserProfile: async () => Promise.resolve(),
// });

// export const auth = getAuth(app);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const dispatch = useDispatch();

//   const [myData] = useGetMeMutation();
//   const [getAdmin] = useGetAdminByEmailMutation();

//   const [loading, setLoading] = useState<boolean>(false);
//   const [loadUser, setLoadUser] = useState<boolean>(false);

//   const googleProvider = new GoogleAuthProvider();
//   const facebookProvider = new FacebookAuthProvider();

//   const createUser = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       await sendEmailVerification(userCredential.user);
//       toast.info(
//         "A verification email has been sent. Please check your inbox.",
//       );
//       return userCredential;
//     } catch (error: any) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const forgotPassword = (email: string) => sendPasswordResetEmail(auth, email);

//   const signIn = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       if (!userCredential.user.emailVerified) {
//         toast.error("Please verify your email before logging in.");
//         await sendEmailVerification(userCredential.user);
//         await signOut(auth);
//         return;
//       }
//       return userCredential;
//     } catch (error: any) {
//       toast.error(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const googleLogIn = async () => {
//     setLoading(true);
//     try {
//       return await signInWithPopup(auth, googleProvider);
//     } catch (error: any) {
//       toast.error(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const facebookLogIn = async () => {
//     setLoading(true);
//     try {
//       return await signInWithPopup(auth, facebookProvider);
//     } catch (error: any) {
//       toast.error(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logOut = async () => {
//     setLoading(true);
//     try {
//       await signOut(auth);
//       removeFromLocalStorage(authKey.ACCESS_TOKEN);
//       await deleteCookies(authKey.REFRESH_TOKEN);
//     } catch (error) {
//       console.log("Error logging out:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserProfile = async (name: string) => {
//     if (auth.currentUser) {
//       setLoading(true);
//       try {
//         await updateProfile(auth.currentUser, { displayName: name });
//       } catch (error: any) {
//         toast.error("Error updating profile: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       async (currentUser: User | null) => {
//         if (currentUser) {
//           if (!currentUser.emailVerified) {
//             await signOut(auth);
//             return;
//           }
//           try {
//             const res = await myData(undefined).unwrap();
//             if (res.data) {
//               dispatch(addUser(res.data));
//             } else {
//               const admin = await getAdmin(currentUser.email!);
//               if (admin.data?.user) {
//                 dispatch(addUser(admin.data.user));
//               }
//             }
//           } catch (error) {
//             console.log("Error fetching user data:", error);
//           } finally {
//             setLoading(false);
//             setLoadUser(false);
//           }
//         } else {
//           await deleteCookies(authKey.REFRESH_TOKEN);
//         }
//       },
//     );

//     return () => unsubscribe();
//   }, [myData, getAdmin, loadUser]);

//   const authInfo: AuthContextType = {
//     loadUser,
//     setLoadUser,
//     loading,
//     setLoading,
//     createUser,
//     forgotPassword,
//     signIn,
//     googleLogIn,
//     facebookLogIn,
//     logOut,
//     updateUserProfile,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

"use client";

import { authKey } from "@/constants/common";
import { useGetAdminByEmailMutation } from "@/redux/features/admin/adminApi";
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
import { createContext, ReactNode, useEffect, useState } from "react";
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
  createUser: async () => {},
  forgotPassword: async () => {},
  signIn: async () => {},
  googleLogIn: async () => {},
  facebookLogIn: async () => {},
  logOut: async () => {},
  updateUserProfile: async () => {},
});

export const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const [myData] = useGetMeMutation();
  const [getAdmin] = useGetAdminByEmailMutation();

  const [loading, setLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

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

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase signOut failed:", error);
      toast.warn(
        "Sign-out from server failed, but local logout was completed.",
      );
    } finally {
      removeFromLocalStorage(authKey.ACCESS_TOKEN);
      await deleteCookies(authKey.REFRESH_TOKEN);
      dispatch(logOutUser());
      dispatch(removeOrderDetails());
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string) => {
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
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        setLoadUser(true);
        setLoading(true);
        try {
          if (currentUser) {
            if (!currentUser.emailVerified) {
              await logOut();
              return;
            }
            // Try normal user first
            const res = await myData(undefined).unwrap();
            if (res?.data) {
              dispatch(addUser(res.data));
            } else if (currentUser.email) {
              // Fallback to admin
              const adminRes = await getAdmin(currentUser.email).unwrap();
              if (adminRes?.data?.user) {
                dispatch(addUser(adminRes.data.user));
              }
            }
          } else {
            dispatch(logOutUser());
            dispatch(removeOrderDetails());
            await deleteCookies(authKey.REFRESH_TOKEN);
            removeFromLocalStorage(authKey.ACCESS_TOKEN);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
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
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
