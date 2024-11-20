import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../api/Index";
import Sidebar from "../../components/Sidebar";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await Api.delete(`api/articles/${articleId}`);
      setArticles(articles.filter((article) => article.id !== articleId));
      alert("Article deleted successfully!");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-8">
          Welcome, {user?.role === "admin" ? "Admin" : "User"}
        </h1>

        <div className="space-y-8">
          {articles.length === 0 ? (
            <p className="text-center text-gray-500">No articles found</p>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {article.content.slice(0, 250)}...
                </p>
                <p className="text-gray-500 mb-2">
                  Author:{" "}
                  <span className="font-medium">{article.user.name}</span>
                </p>
                <p className="text-gray-500 mb-4">
                  Published on:{" "}
                  <span className="font-medium">
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/admin/articledetail/${article.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Read More
                  </Link>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete Article
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
