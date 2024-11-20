import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../api/Index";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Ambil data artikel dan user dari localStorage
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await Api.get("api/articles");
        setArticles(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
        setLoading(false);
      }
    };

    const fetchUser = () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
    };

    fetchArticles();
    fetchUser();
  }, []);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Filter artikel untuk writer
  const filteredArticles =
    user?.role === "writer"
      ? articles.filter((article) => article.user.id === user.id)
      : articles;

  return (
    <div>
      {/* Navbar */}
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-8">
            Artikel Terbaru
          </h1>

          {/* Tombol New Artikel */}
          {user?.role === "writer" && (
            <Link
              to="/writer/newarticle"
              className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-8"
            >
              New Artikel
            </Link>
          )}

          <div className="space-y-8">
            {filteredArticles.length === 0 ? (
              <p className="text-center text-gray-500">
                No articles found or you haven&apos;t written any articles yet
              </p>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white p-6 rounded-md transition duration-300 hover:bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Konten Artikel */}
                  <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                      {article.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {article.content.slice(0, 160)}...
                    </p>

                    {/* Author & Tanggal */}
                    <div className="text-sm text-gray-500 mb-6">
                      <span>Author: </span>
                      <span className="font-medium">{article.user.name}</span>
                    </div>

                    <div className="text-sm text-gray-500 mb-6">
                      <span>Published on: </span>
                      <span className="font-medium">
                        {new Date(article.created_at).toLocaleDateString()}
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

                    {/* Tombol Read More dan Edit Artikel */}
                    <div className="flex mt-4">
                      <Link
                        to={`/writer/articledetail/${article.id}`}
                        className="text-blue-500 hover:text-blue-700 text-lg font-medium"
                      >
                        Read More
                      </Link>

                      {/* Tombol Edit Artikel (hanya untuk penulis artikel ini) */}
                      {user?.role === "writer" &&
                        article.user.id === user.id && (
                          <button
                            onClick={() =>
                              navigate(`/writer/editarticle/${article.id}`)
                            }
                            className="ml-4 text-blue-500 hover:text-blue-700 text-lg font-medium border-2 border-blue-500 rounded-md py-2 px-4 transition duration-300"
                          >
                            Edit Artikel
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Gambar Artikel */}
                  <div className="relative">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-sm"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
