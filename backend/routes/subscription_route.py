from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from services import subscription_service
from schema.SubscriptionSchema import SubscriptionRequest
from utils.jwt import get_user
from database import get_db


router = APIRouter(prefix="/subscriptions")

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_user)]

@router.post("/create")
def create_subscription(user: user_dependency, db: db_dependency, sub_req: SubscriptionRequest):
    return subscription_service.create_subscription(db, user["user_id"], sub_req.plan_id)

@router.post("/{sub_id}/cancel")
def cancel_subcription(sub_id:int, user: user_dependency, db: db_dependency):
    return subscription_service.cancel_subscription(db, sub_id)

@router.post("/change/{plan_id}")
def change_subscription(plan_id, user: user_dependency, db: db_dependency):
    return subscription_service.change_subscription(db, user["user_id"], plan_id)
