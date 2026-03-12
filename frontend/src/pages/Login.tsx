import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-5">
      <div className="bg-white p-10 rounded-lg w-full max-w-[420px] border border-gray-200 shadow-md text-center">
        <h2 className="mb-2 text-xl font-semibold">Welcome Back</h2>

        <p className="text-gray-500 text-sm mb-6">Login to your account</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="p-3 bg-black text-white rounded-md hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
