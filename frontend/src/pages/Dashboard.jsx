import { useState, useEffect } from "react";
import { fetchAllItems, deleteItem } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

  const loadItems = () => {
    setLoading(true);
    fetchAllItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteItem(id);
      console.log("Delete response:", response);
      loadItems(); // refresh
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting item.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition"
            >
              {item.images?.[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-800 font-bold">${item.price}</p>
                <p className="text-yellow-500">⭐ {item.rating}</p>
              </div>
              <div className="flex flex-col p-4 border-t border-gray-200 space-y-2">
                {confirmingId === item._id ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-red-600">Confirm delete?</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setConfirmingId(null)}
                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <Link
                      to={`/edit/${item._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setConfirmingId(item._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
