from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    surname = Column(String)  
    first_name = Column(String)
    home_address = Column(String)
    date_of_birth = Column(String)
    date_of_registration = Column(String)
    matric_number = Column(String)

    orders = relationship("OrderHistory", back_populates="customer", cascade="all, delete")


class OrderHistory(Base):
    __tablename__ = "order_history"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    order_date = Column(Date)
    menu_item = Column(String)
    special_instructions = Column(String)
    payment_method = Column(String)
    next_reservation_date = Column(Date)

    customer = relationship("Customer", back_populates="orders")
