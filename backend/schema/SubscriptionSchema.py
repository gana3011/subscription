from datetime import date

from pydantic import BaseModel


class SubscriptionRequest(BaseModel):
    plan_id: int

class SubscriptionResponse(BaseModel):
    id: int
    plan_id: int
    user_id: int
    name: str
    price: int
    start_date: date
    end_date: date
