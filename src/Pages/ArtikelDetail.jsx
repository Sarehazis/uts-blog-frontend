import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../api/Index"; // API untuk mengambil data
import Navbar from "../components/Navbar"; // Navbar

const ArtikelDetail = () => {
  const { id } = useParams(); // Mengambil ID artikel dari URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Untuk menangani error
  const [user, setUser] = useState(null); // Menyimpan data user yang login
  const navigate = useNavigate(); // Untuk navigasi kembali ke halaman sebelumnya

  // Ambil data artikel berdasarkan ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await Api.get(`api/articles/${id}`); // Mengambil artikel berdasarkan ID
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Article not found or failed to load.");
        setLoading(false);
      }
    };

    const fetchUser = () => {
      // Ambil user dari localStorage atau cookie (asumsi user login disimpan di localStorage)
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser)); // Menyimpan data user jika sudah login
      }
    };

    fetchArticle();
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center py-10">{error}</div>;
  }

  if (!article) {
    return <div className="text-center py-10">Article not found.</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar user={user} /> {/* Menyediakan data user untuk Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-md shadow-md">
          {/* Tombol Kembali di dalam konten */}
          <button
            onClick={() => navigate(-1)} // Navigasi kembali ke halaman sebelumnya
            className="text-blue-500 hover:text-blue-700 mb-4"
          >
            &larr; Back to Articles
          </button>

          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            {article.title}
          </h1>
          <div className="text-sm text-gray-500 mb-6">
            <span>Published on: </span>
            <span className="font-medium">
              {new Date(article.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Gambar Artikel */}
          <div className="mb-8">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>

          {/* Konten Artikel */}
          <p className="text-lg text-gray-700">{article.content}</p>

          {/* Tombol Edit Artikel hanya untuk penulis artikel ini */}
          {user?.role === "writer" && article.user.id === user.id && (
            <div className="mt-6">
              <button
                onClick={() => navigate(`/writer/editarticle/${article.id}`)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit Artikel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtikelDetail;
