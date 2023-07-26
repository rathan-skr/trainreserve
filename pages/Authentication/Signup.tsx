// pages/signup.tsx
import { useAuth } from '@/utils/authProvider';
import React, { useState } from 'react';


const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      // Redirect or perform other actions after successful signup
    } catch (error) {
      // Handle signup error
    }
  };

  return (
   <div className="login_form">
      <h3 className="main_form_h3">Signup</h3>
      <div className="main_form_content">
        <form onSubmit={handleSignup}>
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
