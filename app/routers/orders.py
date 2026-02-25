from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth, database

router = APIRouter()

@router.post("/", response_model=schemas.Order)
def place_order(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=400, detail="Cart is empty")
    cart_items = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = 0
    order_items = []
    for item in cart_items:
        product = item.product
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")
        total += product.price * item.quantity
        order_item = models.OrderItem(product_id=product.id, quantity=item.quantity)
        order_items.append(order_item)
        product.stock -= item.quantity
    order = models.Order(user_id=current_user.id, total_amount=total)
    db.add(order)
    db.commit()
    db.refresh(order)
    for oi in order_items:
        oi.order_id = order.id
        db.add(oi)
    db.commit()
    # Clear cart
    for item in cart_items:
        db.delete(item)
    db.commit()
    order.items = order_items
    return order

@router.get("/", response_model=list[schemas.Order])
def get_orders(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).all()
    for order in orders:
        order.items = db.query(models.OrderItem).filter(models.OrderItem.order_id == order.id).all()
    return orders