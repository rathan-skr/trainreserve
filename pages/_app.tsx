import React from "react";
import { AppProps } from "next/app";
import DefaultLayout from "@/components/default";
import '@/styles/global.css';
const MyApp: React.FC<AppProps> = ({ Component, pageProps }:any) => {
  // Wrap the Component with your default layout
  const Layout = Component.layout || DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
