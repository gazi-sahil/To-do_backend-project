# College Todo Full Stack Application

A full-stack todo application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design with Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React
- Vite
- Tailwind CSS
- Context API for state management

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. Set up environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Add your MongoDB URI and JWT_SECRET

4. Start the application:
   ```bash
   # For development (server + client)
   npm run dev
   
   # For production with Docker (if Docker is installed)
   npm start
   ```

### Environment Variables

In `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## API Endpoints

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Project Structure

```
Backend Project/
  client/          # React frontend
  server/          # Express backend
    models/        # Mongoose models
    routes/        # API routes
    middleware/    # Custom middleware
  docker-compose.yml
  package.json
```

## Authors

Shikhar - College Project
