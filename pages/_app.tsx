import React from "react";
import { AppProps } from "next/app";
import DefaultLayout from "@/components/default";
import "@/styles/global.css";
import { AuthProvider } from "@/utils/authProvider";
import firebase from "@/firebase/firebaseConfig";
import { error } from "console";
if (typeof window === "undefined") {
  try {
    firebase;
  } catch (error: any) {
    console.error("Firebase initialization error:", error.stack);
  }
}
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Wrap the Component with your default layout
  const Layout = (Component as any).layout || DefaultLayout;

  return (
    <AuthProvider>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout>{" "} */}
    </AuthProvider>
  );
};

export default MyApp;
