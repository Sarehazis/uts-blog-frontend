import { Route, Routes } from "react-router-dom";
// import AdminRoutes from "./AdminRoutes";
// import WriterRoutes from "./WriterRoutes";
// import ReaderRoutes from "./ReaderRoutes";
// import NotFound from "../pages/NotFound";
import Login from "../Pages/Auth/Login";
import Homepage from "../Pages/Homepage";
import Index from "../Pages/Writer/Index";
import HomepageReader from "../Pages/Reader/HomepageReader";
import Dashboard from "../Pages/Admin/Dashboard";
import Register from "../Pages/Auth/Register";
import Settings from "../Pages/Admin/Settings";
import NewArticle from "../Pages/Writer/NewArticle";
import EditArtikel from "../Pages/Writer/EditArticle";
import ArtikelDetail from "../Pages/ArtikelDetail";
const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route Admin */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/articledetail/:id" element={<ArtikelDetail />} />
      {/* Route Writer */}
      <Route path="/writer/dashboard" element={<Index />} />
      <Route path="/writer/newarticle" element={<NewArticle />} />
      <Route path="/writer/editarticle/:id" element={<EditArtikel />} />
      <Route path="/writer/articledetail/:id" element={<ArtikelDetail />} />
      {/* Route Reader */}
      <Route path="/reader/homepage" element={<HomepageReader />} />
      <Route path="/reader/articledetail/:id" element={<ArtikelDetail />} />
    </Routes>
  );
};

export default RoutesIndex;
