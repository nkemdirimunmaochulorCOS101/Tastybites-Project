from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional

class CustomerCreate(BaseModel):
    first_name: str
    surname: str
    home_address: str
    date_of_birth: date
    date_of_registration: date
    matric_number: str

class CustomerOut(BaseModel):
    id: int
    first_name: str
    surname: str
    home_address: str
    date_of_birth: date
    date_of_registration: date
    matric_number: str

    class Config:
        orm_mode = True

class OrderHistoryCreate(BaseModel):
    customer_id: int
    order_date: date
    menu_item: str
    special_instructions: Optional[str] = None
    payment_method: str
    next_reservation_date: Optional[date] = None

class OrderHistoryOut(OrderHistoryCreate):
    id: int

    class Config:
        orm_mode = True  # For compatibility with SQLAlchemy models
