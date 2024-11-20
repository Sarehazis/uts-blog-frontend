import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/Layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Other admin routes */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
