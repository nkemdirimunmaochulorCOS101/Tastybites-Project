from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import crud, models, schemas
from fastapi.middleware.cors import CORSMiddleware
from routers import customer_router, order_router # adjust based on your project structure

app = FastAPI(title="TastyBites API")

app.include_router(customer_router, prefix="/customers", tags=["Customers"])
app.include_router(order_router, prefix="/orders", tags=["Orders"])

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DATABASE (fake for now)
customers = []
orders = []

class Customer(BaseModel):
    first_name: str
    middle_name: str
    surname: str
    home_address: str
    date_of_birth: str
    date_of_registration: str
    matric_number: str

class CustomerResponse(Customer):
    id: int

class Order(BaseModel):
    customer_id: int
    order_date: str
    menu_item: str
    special_instructions: str
    payment_method: str
    next_reservation_date: str

@app.post("/customers", response_model=CustomerResponse)
def create_customer(customer: Customer):
    new_id = len(customers) + 1
    customer_data = customer.dict()
    customer_data["id"] = new_id
    customers.append(customer_data)
    return customer_data

@app.get("/customers", response_model=List[CustomerResponse])
def get_customers():
    return customers

@app.post("/orders")
def create_order(order: Order):
    orders.append(order)
    return {"message": "Order created"}
