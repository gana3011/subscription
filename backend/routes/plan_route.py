from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from utils.jwt import admin_user
from database import get_db
from services import plan_service
from schema.PlanSchema import PlanRequest
from sqlalchemy.orm import Session

router = APIRouter(prefix="/plans")

db_dependency = Annotated[Session, Depends(get_db)]
admin_dependecy = Annotated[dict, Depends(admin_user)]


@router.get("/get-plans")
def get_all_plans(db: db_dependency):
    return plan_service.get_all_plans(db)

@router.put("/update/{id}")
def update_plan(id: int, admin: admin_dependecy, db: db_dependency, plan_req: PlanRequest):
    return plan_service.update_plan(db, plan_req, id)

@router.delete("/delete/{id}")
def update_plan(id: int, admin: admin_dependecy, db: db_dependency):
    plan_service.delete_plan(db, id)
    return {"message": "Plan deleted successfully"}

@router.get("/get-movies")
def get_movies(db: db_dependency):
    return plan_service.get_movies(db)

@router.get("/movies/{movie_id}")
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    return plan_service.get_movie_by_id(db, movie_id)