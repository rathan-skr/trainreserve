import firebase from "@/firebase/firebaseConfig";
import React, {
  Component,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Account {
  id: string;
  email: string;

}
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

interface props {
  children: ReactNode;
}
export const AuthProvider: React.FC<props> = ({ children }: props) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
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
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator until the initial auth state is loaded
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
