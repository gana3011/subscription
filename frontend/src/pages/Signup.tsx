import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
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
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to get started</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
