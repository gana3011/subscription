import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  // temporary user data (later this will come from backend API)
  const user = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Premium",
    status: "Active",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-item">
          <span>Name</span>
          <p>{user.name}</p>
        </div>

        <div className="profile-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="profile-item">
          <span>Subscription Plan</span>
          <p>{user.plan}</p>
        </div>

        <div className="profile-item">
          <span>Status</span>
          <p>{user.status}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
