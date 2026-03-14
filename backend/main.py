from contextlib import asynccontextmanager

from fastapi import FastAPI
from utils.config import FRONTEND_URL
from utils.scheduler import scheduler
from database import Base, engine
from routes import auth_route, plan_route, subscription_route
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    print("Scheduler started")

    yield

    scheduler.shutdown()
    print("Scheduler stopped")

app = FastAPI(lifespan=lifespan)

origins = [
    FRONTEND_URL
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