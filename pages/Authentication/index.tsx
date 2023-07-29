// pages/index.tsx
import { useAuth } from "@/utils/authProvider";
import Link from "next/link";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

   const handleLogout = async () => {logout()};
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Link href="/Authentication/Login">Login</Link><br/>
      <Link href="/Authentication/Signup">Signup</Link><br/>
      <Link href="/Authentication/AdminLogin">AdminLogin</Link><br/>
      <Link href="/Authentication/AdminSignup">ASignup</Link><br/>
      <Link href=" /Admin/AdminHome">Train schedule</Link><br/>
      <Link href=" /Admin/TrainDetails">Train Details</Link><br/>
     
              <button className="user_option_item" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
