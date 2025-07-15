import { useState } from "react";
import { createItem } from "../api";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: 0,
    rating: 0,
    tags: [],
    reviews: [],
    images: [],
    sold: 0,
  });

  const [newTag, setNewTag] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newReview, setNewReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem(form);
      alert("Item created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating item.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Create New Item</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-purple-700 font-semibold">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-purple-700 font-semibold">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div>
          <label className="block text-purple-700 font-semibold">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-700 font-semibold">Price ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-purple-700 font-semibold">Rating ⭐</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-purple-700 font-semibold">Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      tags: form.tags.filter((_, i) => i !== idx),
                    })
                  }
                  className="ml-1 text-purple-600 hover:text-purple-900"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Add new tag"
            />
            <button
              type="button"
              onClick={() => {
                if (newTag.trim()) {
                  setForm({ ...form, tags: [...form.tags, newTag.trim()] });
                  setNewTag("");
                }
              }}
              className="bg-purple-500 text-white px-4 rounded-r hover:bg-purple-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-purple-700 font-semibold">Images URLs</label>
          <div className="space-y-2 mt-2">
            {form.images.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      images: form.images.map((u, i) =>
                        i === idx ? e.target.value : u
                      ),
                    })
                  }
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      images: form.images.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Add image URL"
            />
            <button
              type="button"
              onClick={() => {
                if (newImage.trim()) {
                  setForm({ ...form, images: [...form.images, newImage.trim()] });
                  setNewImage("");
                }
              }}
              className="bg-purple-500 text-white px-4 rounded-r hover:bg-purple-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <label className="block text-purple-700 font-semibold">Reviews</label>
          <div className="space-y-2 mt-2">
            {form.reviews.map((review, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={review}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      reviews: form.reviews.map((r, i) =>
                        i === idx ? e.target.value : r
                      ),
                    })
                  }
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      reviews: form.reviews.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Add review"
            />
            <button
              type="button"
              onClick={() => {
                if (newReview.trim()) {
                  setForm({ ...form, reviews: [...form.reviews, newReview.trim()] });
                  setNewReview("");
                }
              }}
              className="bg-purple-500 text-white px-4 rounded-r hover:bg-purple-600"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-purple-700 font-semibold">Sold</label>
          <input
            type="number"
            value={form.sold}
            onChange={(e) => setForm({ ...form, sold: parseInt(e.target.value) })}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded hover:from-purple-600 hover:to-pink-600 transition"
        >
          Create Item
        </button>
      </form>
    </div>
  );
}
