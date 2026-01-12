# 💳 PayCore (Razorpay API, ShadCN, React, Node.js, MongoDB)

PayCore is a modern, full-stack fintech application that allows users to send and receive money instantly. It is designed with a minimalist **Swiss Design** philosophy, real-time payment integration, and bank-grade security practices.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://paycore-bay.vercel.app)
[![Deployed on Render](https://img.shields.io/badge/Backend_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://paycore.onrender.com)

> **[ Click here to try the Live Demo](https://paycore-bay.vercel.app)**

---

## ✨ Features

* **Add Funds (Razorpay)**: Securely add funds using Razorpay (Cards, NetBanking, UPI – test mode)
* **P2P Transfers**: Instantly send money to other users using name or username
* **ACID Transactions**: MongoDB sessions ensure atomic money transfers (no partial failures)
* **Idempotent APIs**:  Prevents duplicate or double-spend transactions during retries or network failures.
* **Transaction History**: Ledger-style history with incoming/outgoing transactions
* **Optimized User Search**: Debounced search to reduce DB load
* **Secure Authentication**: JWT-based auth with Zod validation & Bcrypt hashing
* **API Rate Limiting**: Implemented Express middleware–based rate limiting to prevent brute-force attacks and ensure service availability
* **Modern UI**: Tailwind CSS + ShadCN/UI
* **Smart Notifications**: Real-time toast alerts using `sonner`

---

## HLD

<img width="3874" height="2039" alt="Paycore" src="https://github.com/user-attachments/assets/4c0492ea-528e-4a82-9902-52ca9a1b794a" />

---
## 🛠️ Tech Stack

| Layer        | Technologies                                              |
| ------------ | --------------------------------------------------------- |
| **Client**   | React + Vite, TailwindCSS, ShadCN/UI, Axios, Lucide Icons |
| **Server**   | Node.js, Express.js, Razorpay SDK                         |
| **Database** | MongoDB (Mongoose ORM)                                    |
| **Security** | JWT, Bcrypt, Zod, HMAC Verification, Idempotency Keys, CORS, API Rate Limiting (Express  Middleware)                                                                |

---

## 🧩 API Modules Overview

This project exposes REST APIs grouped into **User & Auth**, **Accounts**, and **Payments (Razorpay)**.

---

## 👤 User & Auth APIs

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| POST   | `/api/v1/users/signup` | Register a new user                    |
| POST   | `/api/v1/users/login`  | Login and receive JWT                  |
| GET    | `/api/v1/users/bulk`   | Search users (supports `?filter=name`) |

---

## 🏦 Accounts APIs

| Method | Endpoint                   | Description                           |
| ------ | -------------------------- | ------------------------------------- |
| GET    | `/api/v1/account/balance`  | Get current balance & user details    |
| POST   | `/api/v1/account/transfer` | Transfer money to another user (ACID) |
| GET    | `/api/v1/account/history`  | Fetch last 10 transactions            |

---

## 💸 Payments (Razorpay) APIs

| Method | Endpoint                       | Description                     |
| ------ | ------------------------------ | ------------------------------- |
| POST   | `/api/v1/payment/create-order` | Initialize Razorpay order       |
| POST   | `/api/v1/payment/verify`       | Verify payment & credit balance |

---

## ❤️ Health Check

```http
GET /api/v1/healthcheck
```

Used to verify server availability.

---

## 🔐 Authentication Details

* JWT token generated on **signup/login**
* Token must be sent via header:

```http
Authorization: Bearer <token>
```

---

## 📌 API Reference (Detailed)

### Signup

```http
POST /api/v1/users/signup
```

| Field    | Type   | Required |
| -------- | ------ | -------- |
| username | string | ✅        |
| email    | string | ✅        |
| password | string | ✅        |
| fullname | string | ✅        |

---

### Login

```http
POST /api/v1/users/login
```

| Field    | Type   | Required |
| -------- | ------ | -------- |
| username | string | ✅        |
| password | string | ✅        |

---

### Transfer Money

```http
POST /api/v1/account/transfer
```

| Field         | Type         | Description     |
| ------------- | ------------ | --------------- |
| amount        | number       | Amount to send  |
| to            | string       | Receiver userId |
| Authorization | Bearer token | JWT token       |

---

### Update User Details

```http
POST /api/v1/users/updateDetails
```

| Field    | Type   | Notes    |
| -------- | ------ | -------- |
| password | string | Optional |
| fullname | string | Optional |

---

### Get Balance

```http
GET /api/v1/account/balance
```

Returns logged-in user's balance.

---

### Search Users

```http
GET /api/v1/users/bulk
```

Supports debounced search using query params.

---

## ⚙️ Installation Guide

### Server Setup

```bash
npm install
# configure MONGO_URI, Redis_URL in .env
npm run dev
```

### Client Setup

```bash
npm install
npm run dev
```

---

## 📦 Libraries Used

### Server Side

* Zod – input validation
* JWT – authentication
* Bcrypt – password hashing
* Mongoose – MongoDB ORM

### Client Side

* React Router DOM
* Axios
* Dotenv

---

## 📘 Notes

* Razorpay runs in **test mode**
* MongoDB transactions ensure **zero money loss**
* Designed with scalability and production-readiness in mind

---

🚀 **PayCore** – A clean, secure, production-grade fintech system.
