# FastAPI + React E-Commerce App

## Project Overview

This is a full-stack E-Commerce web application built using FastAPI, React, and PostgreSQL.

Users can:
- Register and login
- View products
- Add products to cart
- Update or remove cart items
- Place orders
- View order history

Admin users can:
- Create new products

This project demonstrates full-stack development with authentication, database integration, and frontend-backend connection.

---

## Tech Stack

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Passlib (Password hashing)

Frontend:
- React (Vite)
- Axios
- React Router
- Context API

Database:
- PostgreSQL

---

## Features

Authentication:
- User registration
- User login
- JWT-based authentication
- Role-based access (Admin and User)

Products:
- View all products
- Admin can create products

Cart:
- Add products to cart
- Update quantity
- Remove products
- View total amount

Orders:
- Place orders
- View order history

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/fastapi-react-ecommerce.git
cd fastapi-react-ecommerce
```

---

### 2. Setup PostgreSQL

Create a PostgreSQL database.

Example:

```
Database name: ecommerce_db
```

Update your database URL in your backend configuration file:

```
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
```

---

### 3. Run Backend (FastAPI)

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on:

```
http://127.0.0.1:8000
```

API docs:

```
http://127.0.0.1:8000/docs
```

---

### 4. Run Frontend (React)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## Project Structure

```
E-commerce/
│
├── app/              # FastAPI backend
├── frontend/         # React frontend
├── requirements.txt
└── README.md
```

---

## What I Learned

- Building REST APIs using FastAPI
- JWT authentication and authorization
- Connecting FastAPI with PostgreSQL
- Building frontend using React
- Connecting frontend and backend using Axios
- Managing authentication using Context API
- Full-stack application development

---

## Author

Abhishek  
Electronics and Communication Engineer  
Learning Full-Stack Development