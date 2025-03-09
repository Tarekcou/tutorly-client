import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [imageKey, setimageKey] = useState(1);
  const provider = new GoogleAuthProvider();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // (cart);
  }, [cart]);

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };
  const emptyCart = () => {
    setCart([]);
    toast.success("cart is empty");
  };

  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signedIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    // toast.loading("Sign out Processing..");

    setLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setLoading(false);
        // navigate("/");
        toast.error("Signed out!");

        // ("sign Out", auth);
      })
      .catch((error) => {
        // An error happened.
        toast.error("Something went wrong" + error);
        // (error);

        setLoading(false);
      });
  };
  const updateUserProfile = (
    name = "James",
    Url = "https://cdn-icons-png.flaticon.com/512/7084/7084424.png"
  ) => {
    setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: Url,
    });
  };
  const passwordReset = (resetEmail) => {
    return sendPasswordResetEmail(auth, resetEmail);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);

        setLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe(); // Unsubscribe on unmount to avoid memory
  }, []);
  const authData = {
    registerWithEmail,
    isLoading,
    setLoading,
    user,
    setUser,
    logOut,
    signedIn,
    googleLogin,
    updateUserProfile,
    passwordReset,
    imageKey,
    setimageKey,
    addItemToCart,
    cart,
    setCart,
    emptyCart,
    theme,
    setTheme,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
