from sqlalchemy.orm import Session

from models.status import SubscriptionStatus
from models.subscription import Subscription

def create_subscription(db: Session, subscription: Subscription):
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    
    return subscription

def get_active_subscription(db: Session, user_id: int):
    return db.query(Subscription).filter(Subscription.user_id == user_id ,Subscription.status == SubscriptionStatus.ACTIVE).first()

def get_subscription_by_id(db: Session, sub_id: int):
    return db.query(Subscription).filter(Subscription.id == sub_id).first()

def cancel_subscription(db: Session, subscription: Subscription):
    subscription.status = SubscriptionStatus.CANCELLED
    db.commit()
    db.refresh(subscription)

    return subscription