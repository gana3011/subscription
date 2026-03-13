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
      const user = await login(email, password);
      if (user.role == "admin") navigate("/admin/plans");
      else navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-10 flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>

        <p className="text-gray-500 text-base">Login to your account</p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 w-full"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] py-4 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90%] py-4 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-[90%] py-4 bg-black text-white rounded-md text-base font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
