from datetime import date, timedelta
from operator import sub
from tkinter import S
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from schema.SubscriptionSchema import SubscriptionResponse
from models.subscription import Subscription
from repository import plan_repository, subscription_repository

def create_subscription(db: Session, user_id: int, plan_id: int):
    plan = plan_repository.get_plan_by_id(db, plan_id)

    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")
    
    active_subscription = subscription_repository.get_active_subscription(db, user_id)

    if active_subscription:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user already has active subscription")
    
    start_date = date.today()
    end_date = start_date + timedelta(days=plan.duration_days)
    
    sub = Subscription(
        user_id = user_id,
        plan_id = plan_id,
        start_date = start_date,
        end_date = end_date
    )
    
    return subscription_repository.create_subscription(db, sub)
    

def cancel_subscription(db: Session, sub_id: int):
    subscription = subscription_repository.get_subscription_by_id(db, sub_id)

    if not subscription:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")
    
    return subscription_repository.cancel_subscription(db, subscription)


def change_subscription(db: Session, user_id: int, plan_id: int):
    active_subscription = subscription_repository.get_active_subscription(db, user_id)

    if active_subscription:
        subscription_repository.cancel_subscription(db, active_subscription)

    return create_subscription(db, user_id, plan_id)

def active_subscription(db: Session, user_id: int):
    subscription = subscription_repository.get_active_subscription(db, user_id)

    if not subscription:
        return None

    plan = plan_repository.get_plan_by_id(db, subscription.plan_id)

    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan associated with subscription not found"
        )

    return SubscriptionResponse(
        id=subscription.id,
        plan_id=plan.id,
        user_id=subscription.user_id,
        name=plan.name,
        price=plan.price,
        start_date=subscription.start_date,
        end_date=subscription.end_date
    )
    
def revenue_report(db: Session):
    return subscription_repository.revenue_summary(db)