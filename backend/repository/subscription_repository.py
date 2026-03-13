from sqlalchemy.orm import Session
from models.plan import Plan
from models.status import SubscriptionStatus
from models.subscription import Subscription
from sqlalchemy import func

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

def revenue_summary(db: Session):
    total_revenue = db.query(func.sum(Plan.price)).join(Subscription, Subscription.plan_id == Plan.id).scalar() or 0

    active_count = db.query(Subscription).filter(Subscription.status == SubscriptionStatus.ACTIVE).count()
    expired_count = db.query(Subscription).filter(Subscription.status == SubscriptionStatus.EXPIRED).count()
    cancelled_count = db.query(Subscription).filter(Subscription.status == SubscriptionStatus.CANCELLED).count()
    total_count = db.query(Subscription).count()

    revenue_per_plan = db.query(Plan.name, func.sum(Plan.price))\
    .join(Subscription, Subscription.plan_id == Plan.id)\
     .group_by(Plan.name)\
     .all()
    
    return {
        "total_revenue": total_revenue,
        "active_subscriptions": active_count,
        "expired_subscriptions": expired_count,
        "cancelled_subscriptions": cancelled_count,
        "total_subscriptions": total_count,
        "revenue_per_plan": [
        {"plan_name": name, "revenue": revenue}
        for name, revenue in revenue_per_plan
    ]
    }