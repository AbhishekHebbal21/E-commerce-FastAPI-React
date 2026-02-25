from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth, database

router = APIRouter()

@router.get("/", response_model=schemas.Cart)
def get_cart(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == current_user.id).first()
    if not cart:
        cart = models.Cart(user_id=current_user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    cart_items = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id).all()
    cart.items = cart_items
    return cart

@router.post("/add")
def add_to_cart(item: schemas.CartItemBase, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == current_user.id).first()
    if not cart:
        cart = models.Cart(user_id=current_user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
    if not product or product.stock < item.quantity:
        raise HTTPException(status_code=400, detail="Product not available")
    existing_item = db.query(models.CartItem).filter(models.CartItem.cart_id == cart.id, models.CartItem.product_id == item.product_id).first()
    if existing_item:
        existing_item.quantity += item.quantity
    else:
        cart_item = models.CartItem(cart_id=cart.id, product_id=item.product_id, quantity=item.quantity)
        db.add(cart_item)
    db.commit()
    return {"message": "Added to cart"}

@router.put("/update/{item_id}")
def update_cart_item(
    item_id: int,
    request: schemas.CartUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    cart = db.query(models.Cart).filter(models.Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    item = db.query(models.CartItem).filter(
        models.CartItem.id == item_id,
        models.CartItem.cart_id == cart.id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if request.quantity <= 0:
        db.delete(item)
    else:
        item.quantity = request.quantity

    db.commit()
    return {"message": "Updated"}

@router.delete("/remove/{item_id}")
def remove_from_cart(item_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    cart = db.query(models.Cart).filter(models.Cart.user_id == current_user.id).first()
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    item = db.query(models.CartItem).filter(models.CartItem.id == item_id, models.CartItem.cart_id == cart.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Removed"}