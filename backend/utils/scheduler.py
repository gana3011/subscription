from apscheduler.schedulers.background import BackgroundScheduler

from repository import subscription_repository
from database import SessionLocal

scheduler = BackgroundScheduler()

def check_expired():
    db = SessionLocal()
    
    try:
        subscription_repository.update_expired_subscription(db)

    finally:
        db.close()

scheduler.add_job(check_expired, "interval", minutes = 2)