# 💰 Role-Based Financial Records Management Backend

---

## 📌 Overview

This project is a backend system built using Node.js, Express.js, and MongoDB that manages financial records with role-based access control (RBAC). Different types of users can perform operations based on their assigned roles, ensuring secure and structured data handling.

---

## 🚀 Features

- Role-based access control (Admin, Analyst, Viewer)
- CRUD operations for financial records
- User creation and fetching users
- Dashboard analytics (total income, total expense, net balance, category-wise spending)
- Filter, search, and sort functionality for records
- Soft delete implementation using `isDeleted`
- Data ownership enforced via `createdBy`
- Clean architecture using **Routes → Controllers → Services → Models**

---

## 🧠 Roles & Permissions

### 🟢 Admin

- Create, update, and delete records
- View own records
- View own dashboard
- View all users

### 🔵 Analyst

- View all records across users
- Access complete dashboard analytics

### 🔴 Viewer

- Cannot access records or users
- Can view dashboard of a specific admin

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 API Endpoints

### 👤 Users

- **POST** `/users` → Create new user
- **GET** `/users` → Fetch all users (admin only)

### 📊 Records

- **POST** `/records` → Create new record (admin only)
- **GET** `/records` → Fetch records (RBAC applied + filter/search/sort)
- **PUT** `/records/:id` → Update record (admin only)
- **DELETE** `/records/:id` → Soft delete record (admin only)

### 📈 Dashboard

- **GET** `/dashboard` → Fetch dashboard summary

---

## 🔍 Query Features (Records)

### 🔸 Filter

- `/records?category=food`
- `/records?type=expense`

### 🔸 Search

- `/records?search=medical`

### 🔸 Sort

- `/records?sort=amount`
- `/records?sort=date`

---

## ⚙️ How to Run

```bash
npm install
npm run dev
```

---

## 🔑 Headers

- `userid` → Required for all requests
- `adminid` → Required only for viewer dashboard access

---

## 📌 Notes

- Role is not passed in headers; it is securely fetched from the database
- Authorization logic is handled in the service layer
- Soft delete is used instead of permanently removing data

---

## 🎯 Project Purpose

This project demonstrates backend development concepts including API design, role-based access control (RBAC), data ownership, scalable architecture, and efficient data querying.

---

## 📈 Future Improvements (Optional)

- Pagination for large datasets
- JWT-based authentication
 Frontend integration
