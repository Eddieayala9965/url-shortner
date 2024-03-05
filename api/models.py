from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel
from db import engine

Base = declarative_base()

class Url(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    original_url = Column(String)
    short_url = Column(String)
    user_id = Column(Integer)
    
class LinksSchema(BaseModel):
    title: str
    original_url: str
    short_url: str
    user_id: int

class Config:
    populate_by_name = True

Base.metadata.create_all(engine)
