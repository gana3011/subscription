from sqlalchemy import Column, ForeignKey, Integer, String, column, true

from database import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    director = Column(String)
    cast = Column(String)
    genre = Column(String)
    image = Column(String)
    plan_id = Column(Integer, ForeignKey("plans.id"))
