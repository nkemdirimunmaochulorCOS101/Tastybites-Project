from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.CustomerOut)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db, customer)

@router.get("/", response_model=list[schemas.CustomerOut])
def list_customers(db: Session = Depends(get_db)):
    return crud.get_customers(db)

@router.get("/{cid}", response_model=schemas.CustomerOut)
def get_customer(cid: int, db: Session = Depends(get_db)):
    return crud.read_customer(db, cid)

@router.put("/{cid}", response_model=schemas.CustomerOut)
def update_customer(cid: int, customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.update_customer(db, cid, customer)

@router.delete("/{cid}")
def delete_customer(cid: int, db: Session = Depends(get_db)):
    crud.delete_customer(db, cid)
    return {"detail": "deleted"}

customer_router = router

