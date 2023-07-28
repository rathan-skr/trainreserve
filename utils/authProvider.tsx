import firebase from "@/firebase/firebaseConfig";
import router from "next/router";
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
  adminSignup: (email: string, password: string, role: string) => Promise<void>;
  Adminlogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addTrainScheduleToFirestore: (
    trainID: string,
    trainName: string,
    stoppingLocations: string[],
    date: string,
    departureTime: string,
    arrivalTime: string,
    delay: string,
    currentLocation: string
  ) => Promise<void>;
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
  console.log("user", user?.email);

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
  const adminSignup = async (email: string, password: string, role: string) => {
    console.log(role);

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // Get the user ID from the result
      const userId = userCredential.user?.uid;

      // Save the user role in the database (assuming you have a 'roles' collection)
      await firebase.firestore().collection("roles").doc(userId).set({ role });
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };
  const Adminlogin2 = async (email: string, password: string) => {
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
        // Get the user ID from the result
        const userId = userCredential.user?.uid;
        // Retrieve the user's role from Firestore
        const userRoleSnapshot = await firebase
          .firestore()
          .collection("roles")
          .doc(userId)
          .get();
        if (userRoleSnapshot.exists) {
          const userRole = userRoleSnapshot.data()?.role;
          if (userRole === "admin") {
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  const Adminlogin = async (email: string, password: string) => {
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

        // Get the user ID from the result
        const userId = userCredential.user?.uid;
        console.log("tokensString1", userId);
        // Retrieve the user's role from Firestore
        firebase
          .firestore()
          .collection("roles")
          .doc(userId)
          .get()
          .then((userRoleSnapshot) => {
            console.log("tokensString2", userId);
            if (userRoleSnapshot.exists) {
              const userRole = userRoleSnapshot.data()?.role;
              if (userRole === "admin") {
                console.log("tokensString3", userId);
              }
            }
          })
          .catch((error) => {
            console.error("Error getting user role:", error);
          });
      }
    } catch (error) {
      console.error("Login error:", error);
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

  const addTrainScheduleToFirestore = async (
    trainID: string,
    trainName: string,
    stoppingLocations: string[],
    date: string,
    departureTime: string,
    arrivalTime: string,
    delay: string,
    currentLocation: string
  ) => {
    console.log(
      trainID,
      trainName,
      stoppingLocations,
      departureTime,
      date,
      arrivalTime,
      delay,
      currentLocation
    );

    try {
      console.log("Train schedule added successfully.",trainID);
      // Assuming you have a Firestore collection called "trainSchedules"
      const trainSchedulesRef = firebase
        .firestore()
        .collection("trainSchedules");

      // Add the train schedule document
      const newTrainScheduleRef = await trainSchedulesRef.add({
        trainID,
        trainName,
        stoppingLocations,
        date,
        departureTime,
        arrivalTime,
        delay,
        currentLocation,
      });
      const newTrainScheduleID = newTrainScheduleRef.id;

      // Do something with the newTrainScheduleID if needed
      console.log("New train schedule ID:", newTrainScheduleID);
    } catch (error) {
      console.error("Error adding train schedule:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        adminSignup,
        Adminlogin,
        addTrainScheduleToFirestore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
