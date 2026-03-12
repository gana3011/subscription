from models.plan import Plan
from sqlalchemy.orm import Session

def get_plans(db: Session):
    return db.query(Plan).all()

def get_plan_by_id(db: Session, id: int):
    return db.query(Plan).filter(Plan.id == id).first()

def create_plan(db: Session, plan: Plan):
    db.add(plan)
    db.commit()
    db.refresh(plan)
    
    return plan

def save_plan(db: Session, plan: Plan):
    db.commit()
    db.refresh(plan)
    return plan
    
def delete_plan(db: Session, plan: Plan):
    db.delete(plan)
    db.commit()
