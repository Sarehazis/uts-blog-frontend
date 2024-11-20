import { Route, Routes } from "react-router-dom";
import WriterLayout from "../components/Layouts/WriterLayout";
import Dashboard from "../pages/Writer/Dashboard";

const WriterRoutes = () => {
  return (
    <Routes>
      <Route element={<WriterLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Other writer routes */}
      </Route>
    </Routes>
  );
};

export default WriterRoutes;
