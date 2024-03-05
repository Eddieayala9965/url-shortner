from sqlalchemy import Column, Integer, String, Date, ForeignKey
from models.base import Base
from sqlalchemy.orm import mapped_column
from pydantic import BaseModel
from db import engine



class Url(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    original_url = Column(String)
    short_url = Column(String)
    user_id = mapped_column(ForeignKey("users.id"))
    
class LinksSchema(BaseModel):
    title: str
    original_url: str
    short_url: str
    user_id: int

class Config:
    populate_by_name = True

Base.metadata.create_all(engine)
