import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllItems, updateItem } from "../api";

export default function Edit() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  // Load the item details
  useEffect(() => {
    fetchAllItems()
      .then((items) => {
        const found = items.find((item) => item._id === id);
        if (found) {
          setForm({
            ...found,
            tags: found.tags || [],
            reviews: found.reviews || [],
            images: found.images || [],
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListChange = (field, index, value) => {
    setForm((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleAddField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveField = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(id, {
        title: form.title,
        category: form.category,
        description: form.description,
        price: Number(form.price) || 0,
        rating: Number(form.rating) || 0,
        tags: form.tags.map((t) => t.trim()).filter(Boolean),
        reviews: form.reviews.map((r) => r.trim()).filter(Boolean),
        images: form.images.map((i) => i.trim()).filter(Boolean),
        sold: Number(form.sold) || 0,
      });
      alert("Item updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating item.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Edit Item
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags.join(", ")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                }))
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sold
            </label>
            <input
              type="number"
              name="sold"
              value={form.sold}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Images and Reviews */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            {form.images.map((url, i) => (
              <div key={i} className="flex items-center space-x-2 mt-1">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleListChange("images", i, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("images", i)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("images")}
              className="mt-2 inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
            >
              + Add Image
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reviews
            </label>
            {form.reviews.map((review, i) => (
              <div key={i} className="flex items-center space-x-2 mt-1">
                <input
                  type="text"
                  value={review}
                  onChange={(e) => handleListChange("reviews", i, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField("reviews", i)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("reviews")}
              className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
            >
              + Add Review
            </button>
          </div>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 inline-block w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
