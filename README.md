# Task Manager Web Application

A full-stack **Task Manager Web Application** that allows users to register, login securely, and manage their daily tasks efficiently.

The application provides **JWT-based authentication**, **task CRUD operations**, and a **modern responsive frontend** for easy task management.

The frontend is deployed on **Netlify**, while the backend API is deployed on **Render**.

---

# Live Demo

Frontend:
https://managifytask.netlify.app

Backend API:
https://task-manager-api-1-ug7z.onrender.com

---

# Features

### User Authentication

• User Registration
• Secure Login with JWT
• Token stored in browser localStorage
• Protected API routes

### Task Management

• Create new tasks
• View all user tasks
• Update task details
• Delete tasks
• Mark tasks as completed

### Task Attributes

• Title
• Description
• Priority (Low / Medium / High)
• Due Date
• Completion Status

### Dashboard Features

• Total Tasks counter
• Pending Tasks counter
• Completed Tasks counter
• Task search functionality
• Filter by status
• Filter by priority

### Security

• Password hashing using bcrypt
• JWT authentication
• Protected routes with middleware

---

# Tech Stack

### Frontend

HTML
CSS
JavaScript
LocalStorage Authentication
Fetch API

### Backend

Node.js
Express.js

### Database

Firebase Firestore

### Authentication

JWT (jsonwebtoken)

### Security

bcryptjs

### Deployment

Frontend → Netlify
Backend → Render

---

# Project Structure

```
task-manager
│
├── frontend
│   ├── index.html          # Login & Register page
│   ├── dashboard.html      # Task dashboard
│   ├── task-detail.html    # Edit task page
│
├── backend
│   ├── server.js           # Express server
│   ├── routes
│   │     ├── auth.js
│   │     └── tasks.js
│   ├── middleware
│   │     └── authMiddleware.js
│   ├── config
│   │     └── firebase.js
│
├── package.json
└── README.md
```

---

# API Endpoints

## Authentication

### Register

POST /api/auth/register

Request Body

```
{
  "name": "Ananya",
  "email": "ananya@email.com",
  "password": "123456"
}
```

### Login

POST /api/auth/login

Response

```
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "Ananya",
    "email": "ananya@email.com"
  }
}
```

---

# Task Routes (Protected)

Authorization Header Required

```
Authorization: Bearer <JWT_TOKEN>
```

### Create Task

POST /api/tasks

### Get All Tasks

GET /api/tasks

### Get Single Task

GET /api/tasks/:id

### Update Task

PUT /api/tasks/:id

### Delete Task

DELETE /api/tasks/:id

---

# Environment Variables

Create a `.env` file in backend root:

```
PORT=5000
JWT_SECRET=your_secret_key
```

---

# Setup Instructions

## 1. Clone Repository

```
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

---

## 2. Install Dependencies

```
npm install
```

---

## 3. Configure Firebase

Add Firebase service account file:

```
config/serviceAccountKey.json
```

---

## 4. Run Backend

```
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

# Deployment

Frontend deployed on **Netlify**

```
https://managifytask.netlify.app
```

Backend deployed on **Render**

```
https://task-manager-api-1-ug7z.onrender.com
```

The frontend communicates with the backend using:

```
https://task-manager-api-1-ug7z.onrender.com/api
```

---

# Future Improvements

• Add drag-and-drop task board
• Add task categories
• Add reminders / notifications
• Add pagination for large task lists
• Add dark mode UI
• Convert frontend to React

---

# Author

Ananya Sharma

Computer Science Student
Full Stack Web Development Enthusiast
