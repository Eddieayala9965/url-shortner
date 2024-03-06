from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db import session, engine 
from models.links import Url, LinksSchema
from models.base import Base
from models.users import User , UserSchema, UserBaseSchema, UserAccountSchema
from config import settings
from services import create_user, get_user

def create_tables():
    Base.metadata.create_all(bind=engine)

def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, 
                  version=settings.PROJECT_VERSION)
    create_tables()
    return app

app = start_application()


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
    link = Url(**link_data.model_dump())
    session.add(link)
    session.commit()
    return {"Link Added": link.title}

@app.post("/register", response_model=UserSchema)
def register_user(payload: UserAccountSchema):
    payload.hashed_password = User.hash_password(payload.hashed_password)
    return create_user(user=payload)


@app.post("/login")
async def login(payload: UserAccountSchema):
    try:
        user: User = get_user(email=payload.email)
    except: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invlaid User Credentials"
        ) 
    is_validated: bool = user.validate_password(payload.hashed_password)

    if not is_validated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invlaid User Credentials"
        )
    return {"detail": "Successful Login"}



