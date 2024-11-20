import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Link untuk navigasi
import Api from "../../api/Index";
import { FaThumbsUp, FaComment } from "react-icons/fa"; // Ikon like dan comment
import Navbar from "../../components/Navbar";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Menyimpan data user yang login
  const navigate = useNavigate(); // Untuk navigasi setelah logout

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await Api.get("api/articles");
        setArticles(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
        setArticles([]);
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

  // Fungsi untuk menambahkan like
  const handleLike = async (articleId) => {
    if (!user || user.role !== "reader") {
      alert("Only readers can like articles.");
      return;
    }

    try {
      await Api.post(
        `/api/articles/${articleId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update status like artikel
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === articleId
            ? {
                ...article,
                likes: (article.likes || 0) + 1,
                isLiked: true, // Tandai bahwa artikel ini disukai user
              }
            : article
        )
      );
    } catch (error) {
      console.error("Error liking the article:", error.response?.data || error);
    }
  };

  // Fungsi untuk menghapus like (unlike)
  const handleUnlike = async (articleId) => {
    if (!user || user.role !== "reader") {
      alert("Only readers can unlike articles.");
      return;
    }

    try {
      await Api.post(
        `/api/articles/${articleId}/unlike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update status unlike artikel
      setArticles((prevArticles) =>
        prevArticles.map((article) => {
          if (article.id === articleId) {
            const newLikes = Math.max((article.likes || 0) - 1, 0); // Pastikan tidak negatif
            console.log(`Updated likes for article ${articleId}:`, newLikes); // Debug nilai likes
            return {
              ...article,
              likes: newLikes,
              isLiked: false, // Tandai bahwa artikel ini tidak lagi disukai user
            };
          }
          return article;
        })
      );
    } catch (error) {
      console.error(
        "Error unliking the article:",
        error.response?.data || error
      );
    }
  };

  // Fungsi untuk menambahkan komentar
  const handleComment = async (articleId, commentContent) => {
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const response = await Api.post(
        `/api/articles/${articleId}/comment`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);
      // Update jumlah komentar (jika perlu)
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === articleId
            ? {
                ...article,
                comments: (article.comments || 0) + 1, // Tambahkan jumlah komentar
              }
            : article
        )
      );
    } catch (error) {
      console.error(
        "Error commenting on the article:",
        error.response?.data || error
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                  <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                      {article.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {article.content.slice(0, 160)}...
                    </p>

                    <div className="flex items-center space-x-6 mb-6">
                      {/* Tombol Like atau Unlike */}
                      {article.isLiked ? (
                        <button
                          onClick={() => handleUnlike(article.id)}
                          className="flex items-center text-blue-500 hover:text-red-500"
                        >
                          <FaThumbsUp className="mr-2" />
                          <span>{article.likes}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLike(article.id)}
                          className="flex items-center text-gray-500 hover:text-blue-500"
                        >
                          <FaThumbsUp className="mr-2" />
                          <span>{article.likes || 0}</span>
                        </button>
                      )}

                      {/* Tombol Comment */}
                      <button
                        onClick={() => {
                          const comment = prompt("Write your comment:");
                          if (comment) {
                            handleComment(article.id, comment);
                          }
                        }}
                        className="flex items-center text-gray-500 hover:text-blue-500"
                      >
                        <FaComment className="mr-2" />
                        <span>{article.comments || 0} Comments</span>
                      </button>
                    </div>

                    <Link
                      to={
                        user ? `/reader/articledetail/${article.id}` : "/login"
                      }
                      className="text-blue-500 hover:text-blue-700 text-lg font-medium"
                    >
                      Read More
                    </Link>
                  </div>

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
