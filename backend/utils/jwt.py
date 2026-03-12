from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from repository.auth_repository import get_user_by_email
from utils.config import ALGORITHM, SECRET_KEY
from fastapi.security import OAuth2PasswordBearer

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")

def create_access_token(user_id: str, role: str, expires_delta: timedelta):
    encode = {'user_id': user_id, 'role': role}
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

def get_user(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized"
        )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id = payload.get('user_id')
        role = payload.get('role')

        if id is None or role is None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Could not authorize user')
        
        return {'user_id':id, 'role': role}
        
    except JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Could not authorize user')

def admin_user(user: dict = Depends(get_user)):
    print(user)
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return user