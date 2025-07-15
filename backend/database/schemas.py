def individual_data(ai):
    return {
        "_id": str(ai["_id"]),
        "title": ai["title"],
        "category": ai["category"],
        "description":ai["description"],
        "price": ai["price"],
        "rating": ai["rating"],
        "tags": ai["tags"],
        "reviews":ai["reviews"],
        "images": ai["images"],
        "sold": ai["sold"]
    }

def all_tasks(ais):
    return [individual_data(ai) for ai in ais]