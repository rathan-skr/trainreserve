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
  useEffect(() => {
    const checkSimultaneousLogins = async () => {
      const tokensString = localStorage.getItem("authTokens");
      console.log("tokensString", tokensString);
      if (tokensString) {
        const tokens: string[] = JSON.parse(tokensString);
        try {
          // Try to authenticate with each token until one is valid
          for (const token of tokens) {
            await firebase.auth().signInWithCustomToken(token);
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
              setUser(currentUser);
              break; // If authenticated, break the loop
            }
          }
        } catch (error) {
          // If there's an error with all tokens, remove the tokens from local storage and log out the user
          localStorage.removeItem("authTokens");
          setUser(null);
        }
      } else {
        // No tokens in local storage, continue with normal auth flow
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
          setLoading(false);
        });

        return () => unsubscribe();
      }
    };

    checkSimultaneousLogins();
  }, []);
  const setUserTokensLocalStorage = (tokens: string[]) => {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  };
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const tokensString = localStorage.getItem("authTokens");
        const tokens: string[] = tokensString ? JSON.parse(tokensString) : [];
        const userToken = await currentUser.getIdToken();
        setUserTokensLocalStorage([...tokens, userToken]);
        setUser(currentUser);
        console.log("tokensString", tokensString, userToken);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const tokensString = localStorage.getItem("authTokens");
        const tokens: string[] = tokensString ? JSON.parse(tokensString) : [];
        const userToken = await currentUser.getIdToken();
        setUserTokensLocalStorage([...tokens, userToken]);
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem("authTokens");
    await firebase.auth().signOut();
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div id="loading-dot"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
