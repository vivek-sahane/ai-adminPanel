import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Load environment variables from .env file
load_dotenv()

# Get the URI from the .env file
uri = os.getenv("MONGODB_URI")
database_name = os.getenv("DATABASE_NAME")
collection_name = os.getenv("COLLECTION_NAME")

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


# Select database and collection
db = client[database_name]
collection = db[collection_name]

print("✅ Connected to MongoDB Atlas!")
