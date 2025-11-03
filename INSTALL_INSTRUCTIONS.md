# Installation Instructions

## Step 1: Install Backend Dependencies

```batch
cd backend
npm install
cd ..
```

## Step 2: Install Frontend Dependencies

```batch
cd frontend
npm install
cd ..
```

## Step 3: Set Up Environment Files

### Backend Environment

Create `backend\.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/palestine-realestate
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret-min-32-chars
REFRESH_TOKEN_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment

Create `frontend\.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Step 4: Build Backend

```batch
cd backend
npm run build
cd ..
```

## Step 5: Run the Application

### Option A: Run Both Together
```batch
npm run dev
```

### Option B: Run Separately

Terminal 1 - Backend:
```batch
cd backend
npm run dev
```

Terminal 2 - Frontend:
```batch
cd frontend
npm run dev
```

## Step 6: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## Notes

- MongoDB must be running (local or use MongoDB Atlas)
- Node.js version 18 or higher required
- All package.json files have been fixed and should work now

## If You Get Errors

1. Delete all `node_modules` folders
2. Delete all `package-lock.json` files  
3. Run installations again from Step 1

