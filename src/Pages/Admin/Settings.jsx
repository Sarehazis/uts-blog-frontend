import { useEffect, useState } from "react";
import Api from "../../api/Index"; // Pastikan Api ini berfungsi dengan benar
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Menyimpan data pengguna
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Menangani error API
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get("api/users"); // Get users from API
        console.log(response.data); // Log the response to inspect the structure

        // Check if response.data.data is an array
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data); // Set users state
        } else {
          console.error("Data is not an array", response.data.data);
          setUsers([]); // Set an empty array if data is not in the expected format
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set an empty array in case of error
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    fetchUsers();
  }, []);

  // Fungsi untuk logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Menampilkan loading atau data pengguna
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-6">
        <ul className="flex justify-end space-x-6">
          <li>
            <span className="text-gray-700">Hello, Admin</span>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <h1 className="text-4xl font-semibold text-gray-800 mb-8">
        Manage Users
      </h1>

      {error && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white border-b border-gray-200 p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>

                <div>
                  <span className="text-gray-700">Role: </span>
                  <select
                    value={user.role}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                    // Anda dapat menambahkan fungsionalitas untuk mengubah role di sini
                  >
                    <option value="admin">Admin</option>
                    <option value="reader">Reader</option>
                    <option value="writer">Writer</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
