import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  // Define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Define state validation
  const [validation, setValidation] = useState([]);

  // Define navigate using useNavigate()
  const navigate = useNavigate();

  // Function "registerHandler"
  const registerHandler = async (e) => {
    e.preventDefault();

    // Initialize formData
    const formData = new FormData();

    // Append data to formData
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    try {
      // Send data to server
      await axios.post("http://localhost:8000/api/register", formData);

      // Redirect to login page after successful registration
      navigate("/");
    } catch (error) {
      // Assign error to state "validation"
      setValidation(
        error.response
          ? error.response.data
          : { message: "Registration failed" }
      );
    }
  };

  return (
    <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h4 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Halaman Register
        </h4>

        {validation.message && (
          <div className="alert alert-danger bg-red-100 text-red-600 p-4 rounded mb-4">
            {validation.message}
          </div>
        )}

        <form onSubmit={registerHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan Nama Lengkap"
              />
              {validation.name && (
                <div className="text-red-600 text-sm mt-1">
                  {validation.name[0]}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Alamat Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Alamat Email"
              />
              {validation.email && (
                <div className="text-red-600 text-sm mt-1">
                  {validation.email[0]}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
              />
              {validation.password && (
                <div className="text-red-600 text-sm mt-1">
                  {validation.password[0]}
                </div>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Masukkan Konfirmasi Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
