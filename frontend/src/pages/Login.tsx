import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email: email,
        password: password,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;
