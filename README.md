# MentrixOS Backend

This repository contains the backend service for **MentrixOS**, a multi-tenant authentication and management platform. It provides the core API foundation for managing institutes, roles, and contextual user access using a modern Node.js and Express architecture.

## 🚀 Technologies Used

- **Node.js** & **Express.js**: Core server framework.
- **PostgreSQL (`pg`)**: Relational database for scalable multi-tenant architecture.
- **JWT (`jsonwebtoken`)**: Secure, stateless authentication and session management.
- **Bcrypt**: Robust password hashing.
- **UUID**: Unique identifier generation for distributed systems.
- **Cors & Morgan**: Security policies and HTTP request logging.

## 📂 Project Structure

```
backend/
├── config/           # Environment and database configuration
├── controllers/      # Route handlers and business logic
├── db/               # Database connection logic
├── middleware/       # Express middleware (Auth guards, error handling)
├── routes/           # API route definitions
├── services/         # Complex data processing and external services
├── utils/            # Helper functions and utilities
├── app.js            # Express application setup
└── server.js         # Entry point and server initialization
```

## 🛠️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database server

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/mentrix_db
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Start the Server
For local development with hot-reloading:
```bash
npm run dev
```

To run the production build:
```bash
npm start
```

## 🔐 Architecture Notes
The backend is designed for a **multi-tenant** environment where a single user can belong to multiple institutes and hold varying roles (e.g., Admin, Teacher, Student). 

The authentication flow utilizes a two-step context exchange:
1. **Login**: Exchanges credentials for a `pre_context_token`.
2. **Context Selection**: Exchanges the `pre_context_token`, alongside an `institute_id` and `role_id`, to mint a fully scoped `access_token` for the requested dashboard view.