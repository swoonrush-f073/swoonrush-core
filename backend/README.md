# SwoonRush Backend API

Production-ready e-commerce backend for the SwoonRush drama-inspired fashion brand.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22 LTS |
| Language | TypeScript (strict) |
| Framework | Express.js |
| Database | PostgreSQL 16 |
| ORM | TypeORM |
| Auth | JWT (access + refresh tokens) |
| Payments | Razorpay |
| Docs | Swagger/OpenAPI |
| Container | Docker + Docker Compose |

## Quick Start

### Prerequisites

- Node.js ≥ 20
- Docker & Docker Compose (for PostgreSQL)
- OR a local PostgreSQL 16 instance

### 1. Setup Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start PostgreSQL (Docker)

```bash
docker-compose up -d postgres
```

### 4. Run Development Server

```bash
npm run dev
```

Server starts at `http://localhost:5001`

### 5. Seed Database

```bash
npm run seed
```

### 6. Access API Docs

Open `http://localhost:5001/api/docs` for Swagger UI.

---

## Docker (Full Stack)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Stop and remove data
docker-compose down -v
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | - | Register |
| POST | `/api/auth/login` | - | Login |
| POST | `/api/auth/refresh-token` | - | Refresh JWT |
| GET | `/api/auth/profile` | JWT | Get profile |
| PUT | `/api/auth/profile` | JWT | Update profile |
| POST | `/api/auth/logout` | JWT | Logout |

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | - | List (paginated) |
| GET | `/api/products/:id` | - | Get by ID |
| GET | `/api/products/slug/:slug` | - | Get by slug |
| POST | `/api/products` | Admin | Create |
| PUT | `/api/products/:id` | Admin | Update |
| DELETE | `/api/products/:id` | Admin | Soft delete |

**Query Params:** `page`, `limit`, `search`, `category`, `minPrice`, `maxPrice`, `featured`, `inStock`, `sort`

### Cart

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cart` | JWT | Get cart |
| POST | `/api/cart/add` | JWT | Add item |
| PUT | `/api/cart/update` | JWT | Update item |
| DELETE | `/api/cart/item/:itemId` | JWT | Remove item |
| DELETE | `/api/cart/clear` | JWT | Clear cart |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | JWT | Create from cart |
| GET | `/api/orders` | JWT | List user orders |
| GET | `/api/orders/:id` | JWT | Get order |
| PATCH | `/api/orders/:id/status` | Admin | Update status |
| GET | `/api/admin/orders` | Admin | List all orders |

### Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payments/create-order` | JWT | Create Razorpay order |
| POST | `/api/payments/verify` | JWT | Verify payment |
| POST | `/api/payments/webhook` | - | Razorpay webhook |

---

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database, Cloudinary, Razorpay
│   ├── entities/        # TypeORM entities (DB models)
│   ├── middleware/       # Auth, roles, error handling, rate limiting
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # Express routes with Swagger docs
│   ├── validators/      # express-validator rules
│   ├── utils/           # ApiError, ApiResponse, asyncHandler, tokens
│   ├── constants/       # Enums, sizes, roles
│   ├── types/           # TypeScript types & Express augmentation
│   ├── docs/            # Swagger config
│   └── app.ts           # Express app setup
├── scripts/
│   └── seed.ts          # Database seeder
├── server.ts            # Entry point
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## Scripts

```bash
npm run dev              # Development server (hot reload)
npm run build            # Compile TypeScript
npm run start            # Production server
npm run seed             # Seed database
npm run migration:generate  # Generate migration
npm run migration:run       # Run migrations
npm run migration:revert    # Revert last migration
```

---

## Default Admin Credentials

| Field | Value |
|---|---|
| Email | `swoonrush@gmail.com` |
| Password | `admin_password_123` |
| Role | `admin` |
