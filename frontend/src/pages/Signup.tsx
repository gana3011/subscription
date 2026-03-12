import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      await signup(name, email, password);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-5">
      <div className="bg-white p-10 rounded-lg w-full max-w-[420px] border border-gray-200 shadow-md text-center">
        <h2 className="mb-2 text-xl font-semibold">Create Account</h2>

        <p className="text-gray-500 text-sm mb-6">Sign up to get started</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-500"
          />

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
            Create Account
          </button>
        </form>

        <p className="mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
