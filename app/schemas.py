from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItem(CartItemBase):
    id: int
    product: Product
    class Config:
        from_attributes = True

class Cart(BaseModel):
    id: int
    items: list[CartItem] = []
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItem(OrderItemBase):
    id: int
    product: Product
    class Config:
        from_attributes = True

class Order(BaseModel):
    id: int
    total_amount: float
    items: list[OrderItem] = []
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: str
    password: str

class CartUpdate(BaseModel):
    quantity: int