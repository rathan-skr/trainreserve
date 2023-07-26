// components/withAuth.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/auth";

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/Authentication/Login");
      }
    }, [user, router]);

    if (!user) {
      return null; // Show a loading indicator or return a login page template if you wish
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
