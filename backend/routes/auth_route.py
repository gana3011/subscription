from typing import Annotated

from fastapi import APIRouter, Depends, Request, Response
from utils import jwt
from database import get_db
from services import auth_service
from schema.UserSchema import CreateUser, LoginUser
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth")

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/signup")
def create_user(db: db_dependency, user_req: CreateUser):
    return auth_service.create_user(db, user_req)

@router.post("/login")
def login_user(response: Response, db: db_dependency, user_req: LoginUser):
    token = auth_service.login_user(db, user_req)
    
    response.set_cookie(
        key="access_token",
        value=token["access_token"],
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=1800 
    )

    return {"message": "Login successfull"}

@router.post("/logout")
def logout_user(response: Response):
    auth_service.logout_user(response)

@router.get("/me")
def get_user(request: Request):
    return jwt.get_user(request)
