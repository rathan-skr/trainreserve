// pages/index.tsx
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Link href="/Authentication/Login">Login</Link>
      <Link href="/Authentication/Signup">Signup</Link>
    </div>
  );
};

export default Home;
