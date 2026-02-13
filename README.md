# Task Manager API
A secure backend REST API for managing tasks with user authentication.
This project allows users to:
- Register
- Login using JWT authentication
- Create tasks
- View their own tasks
- Update tasks
- Delete tasks
Built using Node.js, Express, Firestore, and JWT.

##  Tech Stack
- Node.js
- Express.js
- Firebase Firestore
- JWT (Authentication)
- bcrypt (Password hashing)
- dotenv (Environment variables)

##  Features
- User Registration
- Secure Login with JWT
- Protected Routes using Middleware
- Task CRUD Operations
- Firestore Database Integration
- Password Hashing with bcrypt

## Project Structure
Task-manager/
│
├── config/
│ └── firebase.js
│
├── middleware/
│ └── authMiddleware.js
│
├── routes/
│ ├── auth.js
│ └── tasks.js
│
├── server.js
├── .gitignore
└── package.json

##  Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
2. Install dependencies
npm install
3. Create a `.env` file in root folder
PORT=5000
JWT_SECRET=your_secret_key
4. Add Firebase service account key inside:
config/serviceAccountKey.json
5. Run the server
node server.js
Server runs on:
http://localhost:5000

## API Endpoints

### Auth Routes
POST `/api/auth/register`  
POST `/api/auth/login`

### Task Routes (Protected)
POST `/api/tasks`  
GET `/api/tasks`  
PUT `/api/tasks/:id`  
DELETE `/api/tasks/:id`

##  Authentication
Pass JWT token in headers:
Authorization: Bearer <your_token>

##  Future Improvements
- Add frontend (React)
- Add due dates & priority
- Add pagination
- Deploy to Render / Railway

## Author
Ananya Sharma  
