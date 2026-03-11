from sqlalchemy import Column, Integer, String
from database import Base


class Plan(Base):

    __tablename__ = "plans"

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String)
    description = Column(String)
    price = Column(Integer)
    duration_days = Column(Integer)


