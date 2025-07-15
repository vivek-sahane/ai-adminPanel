const API_BASE_URL = "http://127.0.0.1:8000";

export async function fetchAllItems() {
    const res = await fetch(`${API_BASE_URL}`)
    if(!res.ok) {
        throw new Error("Failed to fetch items");
    }
    return await res.json();
}


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

