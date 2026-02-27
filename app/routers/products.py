
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from .. import models, schemas, auth, database

router = APIRouter()


@router.get("/", response_model=list[schemas.Product])
def get_products(
    db: Session = Depends(database.get_db),
    search: str = Query(None, description="Search by product name"),
    min_price: float = Query(None, description="Minimum price"),
    max_price: float = Query(None, description="Maximum price")
):
    query = db.query(models.Product)
    filters = []
    if search:
        filters.append(models.Product.name.ilike(f"%{search}%"))
    if min_price is not None:
        filters.append(models.Product.price >= min_price)
    if max_price is not None:
        filters.append(models.Product.price <= max_price)
    if filters:
        query = query.filter(and_(*filters))
    products = query.all()
    return products

@router.get("/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(database.get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product: schemas.ProductCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in product.dict().items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted"}