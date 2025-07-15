const API_BASE_URL = "http://127.0.0.1:8000";


// GET: Fetch all items
export async function fetchAllItems() {
    const res = await fetch(`${API_BASE_URL}`)
    if(!res.ok) {
        throw new Error("Failed to fetch items");
    }
    return await res.json();
}

// POST: Create new item
export async function createItem(item) {
    const res = await fetch(`${API_BASE_URL}/`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(item),
    });
    if(!res.ok) {
        throw new Error("Failed to create item");
    }
    return await res.json();
}

// PUT: Update an item by ID
export async function updateItem(id,updatedData) {
    const res = await fetch(`${API_BASE_URL}/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedData),
    });
    if(!res.ok) throw new Error("Failed to update item");
    return await res.json();
}

// DELETE: Delete an item by ID
export async function deleteItem(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    // Parse any error response
    const error = await res.json();
    throw new Error(error.detail || "Failed to delete item.");
  }

  return await res.json();
}

