from models.movie import Movie
from models.plan import Plan
from sqlalchemy.orm import Session

def get_plans(db: Session):
    return db.query(Plan).order_by(Plan.price).all()

def get_plan_by_id(db: Session, id: int):
    return db.query(Plan).filter(Plan.id == id).first()

def create_plan(db: Session, plan: Plan):
    db.add(plan)
    db.commit()
    db.refresh(plan)
    
    return plan

def save_plan(db: Session, plan: Plan):
    db.commit()
    db.refresh(plan)
    return plan
    
def delete_plan(db: Session, plan: Plan):
    db.delete(plan)
    db.commit()

def get_movies(db: Session):
    return db.query(Movie).all()

def get_movie_by_id(db: Session, movie_id: int):
    return db.query(Movie).filter(Movie.id == movie_id).first()
