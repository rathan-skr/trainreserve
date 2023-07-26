// utils/auth.ts

import firebase from "@/firebase/firebaseConfig";
import 'firebase/compat/auth';
import { createContext, useState } from "react";


export const useAuth = () => {
  const [user, setUser] = useState(null);

  const signup = async (email:any, password:any) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email:any, password:any) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      throw error;
    }
  };
   const checkAuth = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  };
  firebase.auth().onAuthStateChanged((authUser:any) => {
    if (authUser) {
      setUser(authUser);
    } else {
      setUser(null);
    }
  });

  return {
    user,
    signup,
    login,
    logout,
    checkAuth
  };
};

