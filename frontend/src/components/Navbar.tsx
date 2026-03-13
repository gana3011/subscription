import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link>

      {isAuthenticated ? (
        <>
          {isAdmin ? (
            <>
              <Link to="/admin/plans" style={{ marginLeft: "10px" }}>
                Plans
              </Link>

              <Link to="/admin/revenue" style={{ marginLeft: "10px" }}>
                Report
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{ marginLeft: "10px" }}>
                Dashboard
              </Link>

              <Link to="/plans" style={{ marginLeft: "10px" }}>
                Plans
              </Link>
            </>
          )}

          <button
            onClick={logout}
            style={{ marginLeft: "10px", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "10px" }}>
            Login
          </Link>

          <Link to="/signup" style={{ marginLeft: "10px" }}>
            Signup
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
