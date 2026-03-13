from fastapi import HTTPException

from repository import plan_repository
from models.plan import Plan
from schema.PlanSchema import PlanRequest
from sqlalchemy.orm import Session

def get_all_plans(db: Session):
    return plan_repository.get_plans(db)


def create_plan(db: Session, plan_req: PlanRequest):
    plan = Plan(
        name = plan_req.name, 
        description = plan_req.description,
        price = plan_req.price,
        duration_days = plan_req.duration_days
    )

    return plan_repository.create_plan(db, plan)


def update_plan(db: Session, plan_req: PlanRequest, id: int):
    plan = plan_repository.get_plan_by_id(db, id)
    
    if plan is None:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    plan.name =plan_req.name
    plan.description = plan_req.description
    plan.price = plan_req.price
    plan.duration_days = plan_req.duration_days

    return plan_repository.save_plan(db, plan)


def delete_plan(db: Session, id: int):
    plan = plan_repository.get_plan_by_id(db, id)

    if plan is None:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    plan_repository.delete_plan(db, plan)

def get_movies(db: Session):
    return plan_repository.get_movies(db)

def get_movie_by_id(db: Session, movie_id: int):
    return plan_repository.get_movie_by_id(db, movie_id)