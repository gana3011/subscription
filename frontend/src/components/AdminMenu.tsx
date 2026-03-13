import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Admin Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Admin
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-[180px] bg-white border rounded-md shadow-md">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => navigate("/admin/plans")}
          >
            Manage Plans
          </button>

          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => navigate("/admin/revenue")}
          >
            Revenue Report
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
