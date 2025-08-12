def individual_data(ai):
    return {
        "_id": str(ai.get("_id", "")),
        "title": ai.get("title", ""),
        "category": ai.get("category", ""),
        "description": ai.get("description", ""),
        "price": ai.get("price", 0),
        "rating": ai.get("rating", 0),
        "tags": ai.get("tags", []),
        "reviews": ai.get("reviews", []),
        "images": ai.get("images", []),
        "sold": ai.get("sold", 0)
    }

def all_tasks(ais):
    return [individual_data(ai) for ai in ais]
