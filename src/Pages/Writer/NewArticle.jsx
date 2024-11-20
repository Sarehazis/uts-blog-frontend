import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Index";

const NewArtikel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!title || !content || !image) {
      alert("Title, content, and image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await Api.post("api/articles", formData);
      console.log("Article created:", response.data);
      navigate("/"); // Arahkan ke homepage setelah artikel berhasil dibuat
    } catch (error) {
      console.error("Error creating article:", error);
      alert("There was an error creating your article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Create New Article
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

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
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
          {loading ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
};

export default NewArtikel;
