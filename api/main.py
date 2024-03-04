from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db import session
from models import Url , Base

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


@app.post("/create/url")
def post_url( title: str, original_url: str, short_url: str ):
    new_url = Url( title=title, original_url=original_url, short_url=short_url)
    session.add(new_url)
    session.commit()
    return {"new url": new_url}

def create_tables():
    Base.metadata.create_all(session)
