from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base
from db import engine

Base = declarative_base()

class Url(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    original_url = Column(String)
    short_url = Column(String)

Base.metadata.create_all(engine)
