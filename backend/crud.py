from sqlalchemy.orm import Session
import models, schemas

def get_customers(db: Session):
    return db.query(models.Customer).all()

def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def update_customer(db: Session, customer_id: int, updated_data: schemas.CustomerCreate):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    for key, value in updated_data.dict().items():
        setattr(customer, key, value)
    db.commit()
    db.refresh(customer)
    return customer

def delete_customer(db: Session, customer_id: int):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    db.delete(customer)
    db.commit()
    return customer
