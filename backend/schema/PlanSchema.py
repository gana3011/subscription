from typing import Optional

from pydantic import BaseModel


class PlanRequest(BaseModel):
    name: str
    description: str
    price: int
    duration_days: int