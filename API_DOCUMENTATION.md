# Wyne Shop API Documentation

**Base URL**: `http://localhost:3000`
**Content-Type**: `application/json`

---

## Table of Contents

- [Authentication](#authentication)
  - [Admin Auth](#admin-auth)
  - [User Auth](#user-auth)
- [Admin Endpoints](#admin-endpoints)
  - [Admin Detail](#admin-detail)
  - [Suppliers](#suppliers)
  - [Customers](#customers)
  - [Purchase Items](#purchase-items)
  - [Orders](#orders)
  - [Order Items](#order-items)
- [User Endpoints](#user-endpoints)
- [Enums](#enums)
- [Error Responses](#error-responses)

---

## Authentication

The API uses two fully isolated authentication stacks for **Admin** and **User** roles. Each has its own session cookies with separate prefixes (`admin_` and `user_`).

Sessions are passed via cookies automatically after sign-in. All protected routes return `401` if the session is missing or invalid.

---

### Admin Auth

**Base Path**: `/api/admin/auth`

#### Sign Up

```
POST /api/admin/auth/sign-up/email
```

**Request**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response** `200 OK`
```json
{
  "user": {
    "id": "cm9abc123",
    "name": "Admin Name",
    "email": "admin@example.com",
    "createdAt": "2026-03-14T08:00:00.000Z",
    "updatedAt": "2026-03-14T08:00:00.000Z"
  },
  "session": {
    "id": "cm9sess456",
    "token": "eyJhbGci...",
    "expiresAt": "2026-04-14T08:00:00.000Z",
    "userId": "cm9abc123"
  }
}
```

---

#### Sign In

```
POST /api/admin/auth/sign-in/email
```

**Request**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response** `200 OK`
```json
{
  "user": {
    "id": "cm9abc123",
    "name": "Admin Name",
    "email": "admin@example.com",
    "createdAt": "2026-03-14T08:00:00.000Z",
    "updatedAt": "2026-03-14T08:00:00.000Z"
  },
  "session": {
    "id": "cm9sess456",
    "token": "eyJhbGci...",
    "expiresAt": "2026-04-14T08:00:00.000Z",
    "userId": "cm9abc123"
  }
}
```

Sets cookie: `admin_session_token=eyJhbGci...`

---

#### Sign Out

```
POST /api/admin/auth/sign-out
```

**Request**: No body required (session read from cookie)

**Response** `200 OK`
```json
{ "success": true }
```

---

### User Auth

**Base Path**: `/api/user/auth`

Identical endpoints to Admin Auth, replacing the base path:

| Endpoint | Path |
|---|---|
| Sign Up | `POST /api/user/auth/sign-up/email` |
| Sign In | `POST /api/user/auth/sign-in/email` |
| Sign Out | `POST /api/user/auth/sign-out` |

Sets cookie: `user_session_token=eyJhbGci...`

---

## Admin Endpoints

All admin endpoints require a valid admin session cookie (`admin_session_token`).

**Response on missing/invalid session**: `401 Unauthorized`
```json
{ "message": "Unauthorized" }
```

---

### Admin Detail

```
GET /api/admin/detail
```

**Response** `200 OK`
```json
{
  "id": "cm9abc123",
  "name": "Admin Name",
  "email": "admin@example.com",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

### Suppliers

**Base Path**: `/api/admin/suppliers`

#### List Suppliers

```
GET /api/admin/suppliers
```

**Response** `200 OK`
```json
[
  {
    "id": "cm9sup001",
    "name": "PT Sumber Makmur",
    "phone": "+6281234567890",
    "email": "contact@sumbermakmur.com",
    "createdAt": "2026-03-01T07:00:00.000Z",
    "updatedAt": "2026-03-01T07:00:00.000Z",
    "_count": {
      "purchaseItems": 12
    }
  },
  {
    "id": "cm9sup002",
    "name": "CV Berkah Jaya",
    "phone": "+6289876543210",
    "email": null,
    "createdAt": "2026-03-05T09:00:00.000Z",
    "updatedAt": "2026-03-05T09:00:00.000Z",
    "_count": {
      "purchaseItems": 5
    }
  }
]
```

---

#### Get Supplier

```
GET /api/admin/suppliers/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9sup001",
  "name": "PT Sumber Makmur",
  "phone": "+6281234567890",
  "email": "contact@sumbermakmur.com",
  "createdAt": "2026-03-01T07:00:00.000Z",
  "updatedAt": "2026-03-01T07:00:00.000Z"
}
```

**Response** `200 OK` (not found)
```json
null
```

---

#### Create Supplier

```
POST /api/admin/suppliers
```

**Request**
```json
{
  "name": "PT Sumber Makmur",
  "phone": "+6281234567890",
  "email": "contact@sumbermakmur.com"
}
```

> `phone` and `email` are optional.

**Response** `200 OK`
```json
{
  "id": "cm9sup001",
  "name": "PT Sumber Makmur",
  "phone": "+6281234567890",
  "email": "contact@sumbermakmur.com",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

#### Update Supplier

```
PUT /api/admin/suppliers/:id
```

**Request** (all fields optional)
```json
{
  "name": "PT Sumber Makmur Updated",
  "phone": "+6281111111111"
}
```

**Response** `200 OK`
```json
{
  "id": "cm9sup001",
  "name": "PT Sumber Makmur Updated",
  "phone": "+6281111111111",
  "email": "contact@sumbermakmur.com",
  "createdAt": "2026-03-01T07:00:00.000Z",
  "updatedAt": "2026-03-14T09:30:00.000Z"
}
```

---

#### Delete Supplier

```
DELETE /api/admin/suppliers/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9sup001",
  "name": "PT Sumber Makmur Updated",
  "phone": "+6281111111111",
  "email": "contact@sumbermakmur.com",
  "createdAt": "2026-03-01T07:00:00.000Z",
  "updatedAt": "2026-03-14T09:30:00.000Z"
}
```

---

### Customers

**Base Path**: `/api/admin/customers`

#### List Customers

```
GET /api/admin/customers
```

**Response** `200 OK`
```json
[
  {
    "id": "cm9cust001",
    "name": "Budi Santoso",
    "phone": "+6281234567890",
    "address": "Jl. Merdeka No. 10, Jakarta",
    "createdAt": "2026-03-10T08:00:00.000Z",
    "updatedAt": "2026-03-10T08:00:00.000Z"
  },
  {
    "id": "cm9cust002",
    "name": "Siti Rahayu",
    "phone": null,
    "address": null,
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z"
  }
]
```

---

#### Get Customer

```
GET /api/admin/customers/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9cust001",
  "name": "Budi Santoso",
  "phone": "+6281234567890",
  "address": "Jl. Merdeka No. 10, Jakarta",
  "createdAt": "2026-03-10T08:00:00.000Z",
  "updatedAt": "2026-03-10T08:00:00.000Z"
}
```

---

#### Create Customer

```
POST /api/admin/customers
```

**Request**
```json
{
  "name": "Budi Santoso",
  "phone": "+6281234567890",
  "address": "Jl. Merdeka No. 10, Jakarta"
}
```

> `phone` and `address` are optional.

**Response** `200 OK`
```json
{
  "id": "cm9cust001",
  "name": "Budi Santoso",
  "phone": "+6281234567890",
  "address": "Jl. Merdeka No. 10, Jakarta",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

#### Update Customer

```
PUT /api/admin/customers/:id
```

**Request** (all fields optional)
```json
{
  "address": "Jl. Sudirman No. 5, Jakarta"
}
```

**Response** `200 OK`
```json
{
  "id": "cm9cust001",
  "name": "Budi Santoso",
  "phone": "+6281234567890",
  "address": "Jl. Sudirman No. 5, Jakarta",
  "createdAt": "2026-03-10T08:00:00.000Z",
  "updatedAt": "2026-03-14T11:00:00.000Z"
}
```

---

#### Delete Customer

```
DELETE /api/admin/customers/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9cust001",
  "name": "Budi Santoso",
  "phone": "+6281234567890",
  "address": "Jl. Sudirman No. 5, Jakarta",
  "createdAt": "2026-03-10T08:00:00.000Z",
  "updatedAt": "2026-03-14T11:00:00.000Z"
}
```

---

### Purchase Items

**Base Path**: `/api/admin/purchase-items`

#### List Purchase Items

```
GET /api/admin/purchase-items
```

**Response** `200 OK`
```json
[
  {
    "id": "cm9pi001",
    "name": "Beras Premium 5kg",
    "totalPrice": "250000",
    "quantity": 100,
    "supplierId": "cm9sup001",
    "purchaseDate": "2026-03-10T00:00:00.000Z",
    "createdAt": "2026-03-10T08:00:00.000Z",
    "updatedAt": "2026-03-10T08:00:00.000Z",
    "supplier": {
      "id": "cm9sup001",
      "name": "PT Sumber Makmur"
    }
  },
  {
    "id": "cm9pi002",
    "name": "Minyak Goreng 2L",
    "totalPrice": "320000",
    "quantity": 50,
    "supplierId": "cm9sup002",
    "purchaseDate": "2026-03-12T00:00:00.000Z",
    "createdAt": "2026-03-12T09:00:00.000Z",
    "updatedAt": "2026-03-12T09:00:00.000Z",
    "supplier": {
      "id": "cm9sup002",
      "name": "CV Berkah Jaya"
    }
  }
]
```

---

#### Get Purchase Item

```
GET /api/admin/purchase-items/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9pi001",
  "name": "Beras Premium 5kg",
  "totalPrice": "250000",
  "quantity": 100,
  "supplierId": "cm9sup001",
  "purchaseDate": "2026-03-10T00:00:00.000Z",
  "createdAt": "2026-03-10T08:00:00.000Z",
  "updatedAt": "2026-03-10T08:00:00.000Z",
  "supplier": {
    "id": "cm9sup001",
    "name": "PT Sumber Makmur"
  }
}
```

---

#### Create Purchase Item

```
POST /api/admin/purchase-items
```

**Request**
```json
{
  "name": "Beras Premium 5kg",
  "totalPrice": 250000,
  "quantity": 100,
  "supplierId": "cm9sup001",
  "purchaseDate": "2026-03-10T00:00:00.000Z"
}
```

**Response** `200 OK`
```json
{
  "id": "cm9pi001",
  "name": "Beras Premium 5kg",
  "totalPrice": "250000",
  "quantity": 100,
  "supplierId": "cm9sup001",
  "purchaseDate": "2026-03-10T00:00:00.000Z",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

#### Update Purchase Item

```
PUT /api/admin/purchase-items/:id
```

**Request** (all fields optional)
```json
{
  "quantity": 120,
  "totalPrice": 280000
}
```

**Response** `200 OK`
```json
{
  "id": "cm9pi001",
  "name": "Beras Premium 5kg",
  "totalPrice": "280000",
  "quantity": 120,
  "supplierId": "cm9sup001",
  "purchaseDate": "2026-03-10T00:00:00.000Z",
  "createdAt": "2026-03-10T08:00:00.000Z",
  "updatedAt": "2026-03-14T10:00:00.000Z"
}
```

---

#### Delete Purchase Item

```
DELETE /api/admin/purchase-items/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9pi001",
  "name": "Beras Premium 5kg",
  "totalPrice": "280000",
  "quantity": 120,
  "supplierId": "cm9sup001",
  "purchaseDate": "2026-03-10T00:00:00.000Z",
  "createdAt": "2026-03-10T08:00:00.000Z",
  "updatedAt": "2026-03-14T10:00:00.000Z"
}
```

---

### Orders

**Base Path**: `/api/admin/orders`

#### List Orders

```
GET /api/admin/orders
```

**Response** `200 OK`
```json
[
  {
    "id": "cm9ord001",
    "customerId": "cm9cust001",
    "totalPrice": "45000",
    "status": "PROCESSING",
    "paymentStatus": "PAID",
    "createdAt": "2026-03-13T09:00:00.000Z",
    "updatedAt": "2026-03-13T10:00:00.000Z",
    "customer": {
      "id": "cm9cust001",
      "name": "Budi Santoso",
      "phone": "+6281234567890",
      "address": "Jl. Sudirman No. 5, Jakarta"
    },
    "orderItems": [
      {
        "id": "cm9oi001",
        "orderId": "cm9ord001",
        "purchaseItemId": "cm9pi001",
        "quantity": 2,
        "unitPrice": "15000",
        "createdAt": "2026-03-13T09:00:00.000Z",
        "updatedAt": "2026-03-13T09:00:00.000Z",
        "purchaseItem": {
          "id": "cm9pi001",
          "name": "Beras Premium 5kg"
        }
      }
    ]
  }
]
```

---

#### Get Order

```
GET /api/admin/orders/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9ord001",
  "customerId": "cm9cust001",
  "totalPrice": "45000",
  "status": "PROCESSING",
  "paymentStatus": "PAID",
  "createdAt": "2026-03-13T09:00:00.000Z",
  "updatedAt": "2026-03-13T10:00:00.000Z",
  "customer": {
    "id": "cm9cust001",
    "name": "Budi Santoso",
    "phone": "+6281234567890",
    "address": "Jl. Sudirman No. 5, Jakarta"
  },
  "orderItems": [
    {
      "id": "cm9oi001",
      "orderId": "cm9ord001",
      "purchaseItemId": "cm9pi001",
      "quantity": 2,
      "unitPrice": "15000",
      "createdAt": "2026-03-13T09:00:00.000Z",
      "updatedAt": "2026-03-13T09:00:00.000Z",
      "purchaseItem": {
        "id": "cm9pi001",
        "name": "Beras Premium 5kg"
      }
    }
  ]
}
```

---

#### Create Order

```
POST /api/admin/orders
```

**Request**
```json
{
  "customerId": "cm9cust001",
  "status": "PENDING",
  "paymentStatus": "UNPAID"
}
```

> `status` defaults to `PENDING`. `paymentStatus` defaults to `UNPAID`. Both are optional.

**Response** `200 OK`
```json
{
  "id": "cm9ord001",
  "customerId": "cm9cust001",
  "totalPrice": "0",
  "status": "PENDING",
  "paymentStatus": "UNPAID",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

#### Update Order

```
PUT /api/admin/orders/:id
```

**Request** (all fields optional)
```json
{
  "status": "COMPLETED",
  "paymentStatus": "PAID",
  "totalPrice": 45000
}
```

**Response** `200 OK`
```json
{
  "id": "cm9ord001",
  "customerId": "cm9cust001",
  "totalPrice": "45000",
  "status": "COMPLETED",
  "paymentStatus": "PAID",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T11:30:00.000Z"
}
```

---

#### Delete Order

```
DELETE /api/admin/orders/:id
```

> Deleting an order cascade-deletes all its order items.

**Response** `200 OK`
```json
{
  "id": "cm9ord001",
  "customerId": "cm9cust001",
  "totalPrice": "45000",
  "status": "COMPLETED",
  "paymentStatus": "PAID",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T11:30:00.000Z"
}
```

---

### Order Items

**Base Path**: `/api/admin/order-items`

#### List Order Items

```
GET /api/admin/order-items?orderId=<orderId>
```

> `orderId` query param is **required**.

**Response** `200 OK`
```json
[
  {
    "id": "cm9oi001",
    "orderId": "cm9ord001",
    "purchaseItemId": "cm9pi001",
    "quantity": 2,
    "unitPrice": "15000",
    "createdAt": "2026-03-13T09:00:00.000Z",
    "updatedAt": "2026-03-13T09:00:00.000Z",
    "purchaseItem": {
      "id": "cm9pi001",
      "name": "Beras Premium 5kg"
    }
  },
  {
    "id": "cm9oi002",
    "orderId": "cm9ord001",
    "purchaseItemId": "cm9pi002",
    "quantity": 1,
    "unitPrice": "16000",
    "createdAt": "2026-03-13T09:05:00.000Z",
    "updatedAt": "2026-03-13T09:05:00.000Z",
    "purchaseItem": {
      "id": "cm9pi002",
      "name": "Minyak Goreng 2L"
    }
  }
]
```

---

#### Get Order Item

```
GET /api/admin/order-items/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9oi001",
  "orderId": "cm9ord001",
  "purchaseItemId": "cm9pi001",
  "quantity": 2,
  "unitPrice": "15000",
  "createdAt": "2026-03-13T09:00:00.000Z",
  "updatedAt": "2026-03-13T09:00:00.000Z",
  "purchaseItem": {
    "id": "cm9pi001",
    "name": "Beras Premium 5kg"
  }
}
```

---

#### Create Order Item

```
POST /api/admin/order-items
```

**Request**
```json
{
  "orderId": "cm9ord001",
  "purchaseItemId": "cm9pi001",
  "quantity": 2,
  "unitPrice": 15000
}
```

**Response** `200 OK`
```json
{
  "id": "cm9oi001",
  "orderId": "cm9ord001",
  "purchaseItemId": "cm9pi001",
  "quantity": 2,
  "unitPrice": "15000",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

#### Update Order Item

```
PUT /api/admin/order-items/:id
```

**Request** (all fields optional)
```json
{
  "quantity": 3,
  "unitPrice": 14500
}
```

**Response** `200 OK`
```json
{
  "id": "cm9oi001",
  "orderId": "cm9ord001",
  "purchaseItemId": "cm9pi001",
  "quantity": 3,
  "unitPrice": "14500",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T09:00:00.000Z"
}
```

---

#### Delete Order Item

```
DELETE /api/admin/order-items/:id
```

**Response** `200 OK`
```json
{
  "id": "cm9oi001",
  "orderId": "cm9ord001",
  "purchaseItemId": "cm9pi001",
  "quantity": 3,
  "unitPrice": "14500",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T09:00:00.000Z"
}
```

---

## User Endpoints

### User Detail

```
GET /api/user/detail
```

Requires valid user session cookie (`user_session_token`).

**Response** `200 OK`
```json
{
  "id": "cm9usr001",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-03-14T08:00:00.000Z",
  "updatedAt": "2026-03-14T08:00:00.000Z"
}
```

---

## Enums

### OrderStatus

| Value | Description |
|---|---|
| `PENDING` | Order has been created but not yet processed |
| `PROCESSING` | Order is being prepared |
| `COMPLETED` | Order has been fulfilled |
| `CANCELLED` | Order has been cancelled |

### PaymentStatus

| Value | Description |
|---|---|
| `UNPAID` | Payment not yet received |
| `PAID` | Payment received |
| `REFUNDED` | Payment has been refunded |

---

## Error Responses

### 401 Unauthorized

Returned when a protected route is accessed without a valid session.

```json
{ "message": "Unauthorized" }
```

### 400 Bad Request / Validation Error

Returned when request body fails schema validation (Elysia `t` schema).

```json
{
  "type": "validation",
  "on": "body",
  "summary": "Property 'name' is missing",
  "errors": [
    {
      "type": 45,
      "schema": { "type": "string" },
      "path": "/name",
      "value": null,
      "message": "Expected string"
    }
  ]
}
```

---

## Root

```
GET /
```

**Response** `200 OK`
```json
{ "message": "Welcome to Wyne Shop API" }
```
