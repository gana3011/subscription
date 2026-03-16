import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-neutral-950 text-neutral-100 px-3 py-3 border-b border-neutral-800">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-white"
        >
          Streamify
        </Link>
        <div className="flex items-center gap-6 text-white text-base">
          {isAuthenticated && (
            <>
              {isAdmin ? (
                <>
                  <Link
                    to="/admin/plans"
                    className="hover:text-white transition-colors"
                  >
                    Plans
                  </Link>
                  <Link
                    to="/admin/revenue"
                    className="hover:text-white transition-colors"
                  >
                    Report
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/plans"
                    className="hover:text-white transition-colors"
                  >
                    Plans
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-white text-base cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-white text-base cursor-pointer">
              Login
            </Link>
            <Link to="/signup" className=" text-white text-base cursor-pointer">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
