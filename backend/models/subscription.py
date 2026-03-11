from sqlalchemy import Column, Date, ForeignKey, Integer, Enum
from models.status import SubscriptionStatus
from database import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("plans.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.ACTIVE)