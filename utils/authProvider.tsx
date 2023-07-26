import firebase from "@/firebase/firebaseConfig";
import React, { Component, createContext, useContext, useEffect, useState } from 'react';


type User = firebase.User | null;

interface AuthContextValue {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};

export const AuthProvider: React.FC = ({ children }:any) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signup = async (email: string, password: string) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
