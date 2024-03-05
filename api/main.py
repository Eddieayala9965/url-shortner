from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db import session
from models.links import Url, LinksSchema
from models.base import Base
from models.users import User 

app = FastAPI()


origins = [
    "http://localhost", 
    "http://localhost:5173", 

]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.get('/')
def home():
    return {"message": "Root Route"}

@app.get('/url')
def get_url():
    get_url = session.query(Url)
    return get_url.all()


@app.post('/links/add')
async def add_link(link_data: LinksSchema):
    link = Url(**link_data.dict())
    session.add(link)
    session.commit()
    return {"Link Added": link.title}


def create_tables():
    Base.metadata.create_all(session)
