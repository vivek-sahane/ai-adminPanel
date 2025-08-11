from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from configrations import collection
from database.schemas import all_tasks
from database.models import AI
from bson.objectid import ObjectId
from datetime import datetime
from fastapi.responses import JSONResponse

#cloudinary
import cloudinary.uploader
from cloudinary_config import cloudinary

from typing import List


app = FastAPI()


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], #React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

router = APIRouter()

@router.get("/")
async def get_all_ais():
    data = collection.find()
    return all_tasks(data)

@router.post("/")
async def create_task(
    title: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    price: int = Form(...),
    rating: float = Form(...),
    tags: List[str] = Form(...),
    reviews: List[str] = Form(...),
    sold: int = Form(...),
    images: List[UploadFile] = File(...) # multiple files
):
    try:

        #Upload all images to Cloudinary

        uploaded_urls = []
        for image in images:
            upload_result = cloudinary.uploader.upload(image.file, folder="ecommerce")
            uploaded_urls.append(upload_result.get("secure_url"))

        # Create MongoDB document
        new_task = {
            "title" : title,
            "category" : category,
            "description" : description,
            "price" : price,
            "rating" : rating,
            "tags" : tags,
            "reviews" : reviews,
            "images" : uploaded_urls,
            "sold" : sold
        }    

        resp = collection.insert_one(new_task)
        return {"status_code":200, "id":str(resp.inserted_id), "images": uploaded_urls}
    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occured {e}")
    






@router.put("/{task_id}")
async def updated_task(task_id: str, updated_task: AI):
    try:
        id = ObjectId(task_id)
        exesting_doc = collection.find_one({"_id": id})
        if not exesting_doc:
            return HTTPException(status_code=404, detail="Task does not exist")

        # updated_at line removed, since you mentioned you don't want to store it
        resp = collection.update_one({"_id": id}, {"$set": dict(updated_task)})
        return {"status_code": 200, "message": "Task Updated Successfully"}

    except Exception as e:
        return HTTPException(status_code=500, detail=f"Some error occurred: {e}")
       

from fastapi.responses import JSONResponse

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    try:
        id = ObjectId(task_id)
        existing_doc = collection.find_one({"_id": id})
        if not existing_doc:
            raise HTTPException(status_code=404, detail="Task does not exist")

        resp = collection.delete_one({"_id": id})
        if resp.deleted_count == 1:
            return JSONResponse(
                status_code=200,
                content={"status_code": 200, "message": "Task Deleted Successfully"}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to delete the task")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")


app.include_router(router)
