import { Route, Routes } from "react-router-dom";
import ReaderLayout from "../components/Layouts/ReaderLayout";
import Dashboard from "../pages/Reader/Dashboard";

const ReaderRoutes = () => {
  return (
    <Routes>
      <Route element={<ReaderLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Other reader routes */}
      </Route>
    </Routes>
  );
};

export default ReaderRoutes;
