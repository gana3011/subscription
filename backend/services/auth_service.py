from datetime import timedelta

from fastapi import HTTPException, status
from utils.jwt import authenticate_user, create_access_token
from models.user import User
from repository import auth_repository
from repository.auth_repository import get_user_by_email
from schema.UserSchema import CreateUser, LoginUser
from sqlalchemy.orm import Session
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

def create_user(db: Session, user_req: CreateUser):
    existing_user = get_user_by_email(db, user_req.email)

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    hashed_pass = pwd_context.hash(user_req.password)

    user = User(
        name = user_req.name, 
        email = user_req.email,
        hashed_pass = hashed_pass,
        role = "user"
    )

    return auth_repository.create_user(db, user)


def login_user(db: Session, user_req: LoginUser):
    user = authenticate_user(user_req.email, user_req.password, db, pwd_context)
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User creditionals wrong")
    
    token = create_access_token(user_req.email, user.id, timedelta(minutes=30))

    return {"access_token": token}
