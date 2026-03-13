import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import Plans from "./pages/Plans";
import AdminPlans from "./pages/admin/AdminPlans";
import RevenueReport from "./pages/admin/RevenueReport";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/plans" element={<Plans />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute role="admin">
              <AdminPlans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/revenue"
          element={
            <ProtectedRoute role="admin">
              <RevenueReport />
            </ProtectedRoute>
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
