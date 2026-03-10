from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from jose import jwt
from repository.auth_repository import get_user_by_email
from utils.config import ALGORITHM, SECRET_KEY

def create_access_token(email:str, user_id: str, expires_delta: timedelta):
    encode = {'sub': email, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, ALGORITHM)

def authenticate_user(email:str, password: str, db: Session, pwd_context):
    user = get_user_by_email(db, email)

    if not user:
        return False
    
    if not pwd_context.verify(password, user.hashed_pass):
        return False
    
    return user