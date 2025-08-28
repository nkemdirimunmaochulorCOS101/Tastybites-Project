from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models import OrderHistory
from schemas import OrderHistoryCreate, OrderHistoryOut
from database import get_db

router = APIRouter()

# Create a new order
@router.post("/orders", response_model=OrderHistoryOut)
def create_order(order: OrderHistoryCreate, db: Session = Depends(get_db)):
    db_order = OrderHistory(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

# Get all orders
@router.get("/orders", response_model=List[OrderHistoryOut])
def get_orders(db: Session = Depends(get_db)):
    return db.query(OrderHistory).all()

# Optional: Get orders by customer
@router.get("/customers/{customer_id}/orders", response_model=List[OrderHistoryOut])
def get_orders_for_customer(customer_id: int, db: Session = Depends(get_db)):
    return db.query(OrderHistory).filter(OrderHistory.customer_id == customer_id).all()

# Update an order
@router.put("/orders/{order_id}", response_model=OrderHistoryOut)
def update_order(order_id: int, order: OrderHistoryCreate, db: Session = Depends(get_db)):
    db_order = db.query(OrderHistory).filter(OrderHistory.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    for key, value in order.dict().items():
        setattr(db_order, key, value)
    db.commit()
    db.refresh(db_order)
    return db_order

# Delete an order
@router.delete("/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = db.query(OrderHistory).filter(OrderHistory.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(db_order)
    db.commit()
    return {"detail": "Order deleted"}


# ✅ Export this so main.py can import it
order_router = router