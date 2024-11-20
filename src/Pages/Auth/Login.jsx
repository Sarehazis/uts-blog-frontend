import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../api/Index";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!email || !password) {
      setValidation({
        message: "Email dan password harus diisi.",
      });
      return;
    }

    try {
      // Kirim permintaan login ke API
      const response = await Api.post("api/login", {
        email,
        password,
      });

      // Simpan token dan data pengguna ke localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Cek role dan arahkan pengguna
      const userRole = response.data.user.role;

      if (userRole === "admin") {
        navigate("/admin/dashboard"); // Halaman untuk admin
      } else if (userRole === "writer") {
        navigate("/writer/dashboard"); // Halaman untuk writer
      } else {
        navigate("/reader/homepage"); // Halaman untuk reader
      }
    } catch (error) {
      // Tangani validasi atau error lainnya
      setValidation(
        error.response?.data || { message: "Login gagal, silakan coba lagi." }
      );
    }
  };

  // Fungsi untuk kembali ke halaman utama
  const goBackHandler = () => {
    navigate("/"); // Arahkan kembali ke halaman utama
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          HALAMAN LOGIN
        </h2>
        {validation.message && (
          <div className="alert alert-danger mb-4 text-red-500">
            {validation.message}
          </div>
        )}
        <form onSubmit={loginHandler}>
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              ALAMAT EMAIL
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Alamat Email"
            />
            {validation.email && (
              <div className="mt-2 text-red-500 text-sm">
                {validation.email[0]}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
            />
            {validation.password && (
              <div className="mt-2 text-red-500 text-sm">
                {validation.password[0]}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            LOGIN
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Daftar di sini
            </Link>
          </div>
        </form>

        {/* Tombol untuk kembali ke halaman utama */}
        <div className="mt-4 text-center">
          <button
            onClick={goBackHandler}
            className="w-full py-3 bg-gray-300 text-black font-medium rounded-md hover:bg-gray-400 transition duration-300"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
