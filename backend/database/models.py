from pydantic import BaseModel
from typing import List

class AI(BaseModel):
    title: str
    category: str
    description: str
    price: int
    rating: float
    tags: List[str]
    reviews: List[str]
    images: List[str]
    sold: int
