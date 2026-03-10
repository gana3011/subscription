from typing import Annotated

from fastapi import APIRouter, Depends
from database import get_db
from services import auth_service
from schema.UserSchema import CreateUser, LoginUser
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth")

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/create")
def create_user(db: db_dependency, user_req: CreateUser):
    return auth_service.create_user(db, user_req)

@router.post("/login")
def login_user(db: db_dependency, user_req: LoginUser):
    return auth_service.login_user(db, user_req)