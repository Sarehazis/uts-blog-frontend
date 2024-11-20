import axios from "axios";

// Buat instance Axios
const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// Tambahkan interceptor untuk header Authorization
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Tambahkan token ke header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
