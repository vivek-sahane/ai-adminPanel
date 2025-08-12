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

    const formData = new FormData();
    for( let key in item) {
        if(key == "images") {
            // images is an array of files
            item.images.forEach(file => formData.append("images", file));
        }
        else if(Array.isArray(item[key])) {
            // tags/ reviews arrays
            item[key].forEach(val => formData.append(key, val));
        }
        else{
            formData.append(key, item[key]);
        }
    }


    const res = await fetch(`${API_BASE_URL}/`,{
        method: "POST",
        body: formData
    });


    if(!res.ok) {
        throw new Error("Failed to create item");
    }
    return await res.json();
}

export async function updateItem(id, updatedData) {
    const formData = new FormData();

    for (let key in updatedData) {
        if (key === "images" &&  updatedData.images?.length > 0) {
            Array.from(updatedData.images).forEach(file => formData.append("images", file));
        }
        else if (key === "existing_images" && updatedData.existing_images?.length > 0) {
            updatedData.existing_images.forEach(url => formData.append("existing_images", url));
        }
        else if (Array.isArray(updatedData[key])) {
            updatedData[key].forEach(val => formData.append(key, val));
        }
        else if (updatedData[key] !== undefined && updatedData[key] !== null) {
            formData.append(key, updatedData[key]);
        }
    }

    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        body: formData
    });

    if (!res.ok) throw new Error("Failed to update item");
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

