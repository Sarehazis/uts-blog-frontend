import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link for navigation
import Api from "../api/Index";
import { FaThumbsUp, FaComment } from "react-icons/fa"; // Import ikon like dan comment
import Navbar from "../components/Navbar"; // Import Navbar di sini

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Menambahkan state untuk user

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Menggunakan format lokal
  };

  // Ambil data artikel dan penulis dari API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await Api.get("api/articles");
        console.log("Fetched Articles: ", response.data);
        setArticles(response.data || []);

        // Menyaring penulis yang unik berdasarkan ID
        const authors = response.data.map((article) => article.user);
        const uniqueWriters = Array.from(
          new Set(authors.map((a) => a.id)) // Menggunakan ID untuk penyaringan unik
        ).map((id) => authors.find((a) => a.id === id)); // Mengambil objek penulis yang sesuai dengan ID

        setWriters(uniqueWriters); // Mengupdate writers dengan penulis yang unik
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
        setArticles([]); // Mengatur articles menjadi array kosong jika ada error
      }
    };

    // Mengecek apakah pengguna sudah login
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Menyimpan data pengguna yang login
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>; // Menampilkan loading saat data sedang diambil
  }

  return (
    <div>
      {/* Navbar berada di atas halaman */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-8">
            Artikel Terbaru
          </h1>

          <div className="space-y-8">
            {articles.length === 0 ? (
              <p className="text-center text-gray-500">No articles found</p>
            ) : (
              articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white p-6 rounded-md transition duration-300 hover:bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Konten Artikel di Kiri */}
                  <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                      {article.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {article.content.slice(0, 160)}...
                    </p>

                    <div className="text-sm text-gray-500 mb-6">
                      <span>Author: </span>
                      <span className="font-medium">{article.user.name}</span>
                    </div>

                    {/* Menampilkan tanggal pembuatan */}
                    <div className="text-sm text-gray-500 mb-6">
                      <span>Published on: </span>
                      <span className="font-medium">
                        {formatDate(article.created_at)}{" "}
                      </span>
                    </div>

                    {/* Ikon Like dan Comment */}
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center text-gray-500">
                        <FaThumbsUp className="mr-2" />
                        <span>{article.likes || 0} Likes</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaComment className="mr-2" />
                        <span>{article.comments || 0} Comments</span>
                      </div>
                    </div>

                    <Link
                      to={user ? `/articles/${article.id}` : "/login"} // Jika belum login, arahkan ke /login
                      className="text-blue-500 hover:text-blue-700 text-lg font-medium"
                    >
                      Read More
                    </Link>
                  </div>

                  {/* Gambar Artikel di Kanan */}
                  <div className="relative">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-sm" // Ukuran gambar sedang
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Writers */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Writers
            </h2>
            <ul className="space-y-4">
              {writers.length === 0 ? (
                <p className="text-center text-gray-500">No writers found</p>
              ) : (
                writers.map((writer, index) => (
                  <li key={index} className="text-lg text-gray-700">
                    {writer.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
