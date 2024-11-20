import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api/Index";

const EditArtikel = () => {
  const { id } = useParams(); // Mengambil artikel ID dari URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data artikel berdasarkan ID
    const fetchArticle = async () => {
      try {
        const response = await Api.get(`api/articles/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);

    try {
      const response = await Api.put(`api/articles/${id}`, formData);
      console.log("Article updated:", response.data);
      navigate(`/articles/${id}`); // Arahkan ke halaman artikel setelah berhasil update
    } catch (error) {
      console.error("Error updating article:", error);
      alert("There was an error updating your article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Edit Article
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="6"
            required
          ></textarea>
        </div>

        {/* Image (optional) */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image (optional)
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 bg-blue-500 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default EditArtikel;
