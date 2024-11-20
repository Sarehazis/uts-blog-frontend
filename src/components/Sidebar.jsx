/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ user, handleLogout }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="py-4 px-6">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4 px-6">
          <li>
            <Link
              to="/admin"
              className="block py-2 px-3 rounded-md hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/add-article"
              className="block py-2 px-3 rounded-md hover:bg-gray-700"
            >
              Add New Article
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="block py-2 px-3 rounded-md hover:bg-gray-700"
            >
              Manage Roles
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-6 py-4">
        {user && (
          <>
            <p className="text-sm mb-2">Logged in as: {user.name}</p>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
