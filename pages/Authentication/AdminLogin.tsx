// pages/login.tsx
import { useAuth } from "@/utils/authProvider";
import { useRouter } from "next/router";

import React, { useState } from "react";

const AdminLoginPage: React.FC = () => {
  const { Adminlogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Adminlogin(email, password);
      // Redirect or perform other actions after successful login
   router.replace("/");
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className="login_form">
      <h3 className="main_form_h3">Login</h3>
      <div className="main_form_content">
        <form onSubmit={handleLogin}>
          <div className="row">
            {" "}
            <h5>Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <h5>Password :</h5>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button_content" >
            <button type="submit" className="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
