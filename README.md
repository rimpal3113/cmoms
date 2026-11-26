# Cafe Ordering System

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/rimpal3113/cmoms.git
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL= https://cmoms-rnzc.vercel.app/

```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=https://cmoms-alpha.vercel.app/api
```

## Execution Instructions

### Start Backend Locally

```bash
cd backend
npm run dev
```

### Start Frontend Locally

```bash
cd frontend
npm run dev
```

### Live Application

Frontend: https://cmoms-rnzc.vercel.app/

Backend API:

Menu API: https://cmoms-alpha.vercel.app/api/menu

This API returns the cafe menu items stored in MongoDB.

Swagger:
API Documentation: https://cmoms-alpha.vercel.app/api/docs

