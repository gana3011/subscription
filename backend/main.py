from fastapi import FastAPI
from models import movie
from database import Base, engine
from routes import auth_route, plan_route, subscription_route
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_route.router)
app.include_router(plan_route.router)
app.include_router(subscription_route.router)