import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import type { User } from "../types/User";
import type { AuthContextType } from "../types/Context";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/me");

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    const res = await API.post("/auth/signup", { name, email, password });

    return res.data;
  };

  const login = async (email: string, password: string) => {
    await API.post("/auth/login", { email, password });

    const res = await API.get("/auth/me");
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
