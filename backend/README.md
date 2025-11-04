# Palestine Real Estate Platform - Backend API

A comprehensive backend API for a smart real estate investing platform focused on Palestine.

## Features

- **User Authentication**: Register, login, password management with JWT
- **Investor Profiles**: Personalized investment preferences and profiles
- **Smart Recommendations**: AI-powered property recommendations based on user preferences
- **Content Management**: Articles, videos, guides, and market reports
- **Advisor System**: Connect with real estate advisors
- **Real-time Chat**: WebSocket-based messaging between users and advisors
- **Admin Dashboard**: User and content management
- **Consent Management**: GDPR-compliant consent tracking

## Tech Stack

- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **bcrypt** for password hashing
- **Winston** for logging
- **Joi** for validation

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business logic
│   ├── socket/         # Socket.io handlers
│   ├── utils/          # Helper functions
│   └── server.ts       # Entry point
├── logs/               # Application logs
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/palestine-real-estate
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Palestine Real Estate <noreply@palestine-realestate.com>
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset

### Investor Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `DELETE /api/profile` - Delete user profile

### Content
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get single content
- `POST /api/content` - Create content (Advisor/Admin)
- `PUT /api/content/:id` - Update content (Advisor/Admin)
- `DELETE /api/content/:id` - Delete content (Admin)

### Advisors
- `GET /api/advisors` - Get all advisors
- `GET /api/advisors/:id` - Get single advisor
- `POST /api/advisors` - Create advisor profile (Admin)
- `PUT /api/advisors/:id` - Update advisor profile (Advisor/Admin)
- `DELETE /api/advisors/:id` - Delete advisor profile (Admin)

### Recommendations
- `GET /api/recommendations` - Get user recommendations
- `GET /api/recommendations/:id` - Get single recommendation
- `POST /api/recommendations/generate` - Generate new recommendations
- `PUT /api/recommendations/:id` - Update recommendation status
- `DELETE /api/recommendations/:id` - Delete recommendation

### Conversations
- `GET /api/conversations` - Get all conversations
- `GET /api/conversations/:id` - Get single conversation
- `POST /api/conversations` - Create conversation
- `POST /api/conversations/:id/messages` - Add message to conversation
- `PUT /api/conversations/:id/archive` - Archive conversation

### Consent
- `GET /api/consent` - Get user consent
- `PUT /api/consent` - Update user consent

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## WebSocket Events

### Client to Server
- `join-conversation` - Join a conversation room
- `leave-conversation` - Leave a conversation room
- `typing-start` - Notify typing started
- `typing-stop` - Notify typing stopped

### Server to Client
- `new-message` - New message received
- `user-typing` - User is typing
- `user-stopped-typing` - User stopped typing

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/palestine-real-estate |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| LOG_LEVEL | Logging level | info |

## Error Handling

All errors are handled by the global error handler middleware. Errors return the following format:

```json
{
  "success": false,
  "message": "Error message",
  "stack": "Stack trace (development only)"
}
```

## Logging

Logs are written to:
- Console (colored output)
- `logs/combined.log` (all logs)
- `logs/error.log` (error logs only)

## Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting
- Password hashing with bcrypt
- JWT authentication
- Input validation with Joi

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License.

