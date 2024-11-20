import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Cek apakah user sudah login (dari localStorage)
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

  // Fungsi untuk logout user
  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data user dari localStorage
    navigate("/login"); // Navigasi ke halaman login setelah logout
  };

  return (
    <nav className="bg-transparent shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-2xl font-semibold">
          <Link to="/">Articless</Link>
        </div>

        {/* Menu Items */}
        <ul className="flex space-x-6 text-black font-medium">
          {!user ? (
            // Jika belum login, tampilkan tombol login
            <li>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
              >
                Login
              </Link>
            </li>
          ) : (
            // Jika sudah login, tampilkan nama user dan tombol logout
            <>
              <li className="text-black text-center">Hello, {user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
