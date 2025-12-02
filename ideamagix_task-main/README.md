# IDEAMAGIX TASK - Online Lecture Scheduling System

![React](https://img.shields.io/badge/React-19. x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields. io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields. io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A comprehensive, enterprise-grade lecture scheduling and management platform built with React 19, JavaScript, Express, and MongoDB. This full-stack solution delivers seamless course management experiences with advanced features including role-based access control, real-time lecture scheduling, intelligent admin dashboard, instructor profile management with image upload, batch management, and automated date-based filtering for modern educational institutions.

## Live Preview

**Experience the application live:** 

- **Frontend:** https://ideamagixtask.netlify.app
- **Backend API:** https://ideatest-in0m.onrender.com
- **Admin Dashboard:** https://ideamagixtask.netlify.app/admin/instructors

![Live Demo](https://img.shields.io/badge/Live%20Demo-Active-brightgreen?style=for-the-badge&logo=netlify&logoColor=white)

## Core Features

**Intelligent Course Management** - Comprehensive course catalog with batch management, lecture scheduling, instructor assignment, and dynamic filtering.  Support for multiple course levels (Beginner, Intermediate, Advanced), detailed descriptions, base64 image uploads, and automated date-based batch filtering with drag-and-drop image upload functionality.

**Role-Based Access Control** - Secure authentication system with distinct user roles (Admin, Instructor) featuring role-specific dashboards, protected routes, JWT-based authentication with 30-day token expiration, and granular permission management for enhanced security.

**Instructor Profile Management** - Complete instructor profile system with profile picture upload, expertise tracking, phone number management, and personalized dashboards. Instructors can sign up independently and manage their profiles with custom avatars. 

**Smart Lecture Scheduling** - Real-time lecture scheduling with instructor assignment, date-based filtering, duration tracking, and automated status management. Lectures automatically move to "Completed" status the day after they're scheduled with intelligent date logic.

**Batch Management System** - Organize courses into batches with start dates, instructor assignments, and automatic filtering. Admin panel displays only current and upcoming batches, while past batches are automatically hidden based on current date.

**Advanced Admin Dashboard** - Powerful administrative interface with real-time statistics, course management, instructor oversight at `/admin/instructors`, batch control, lecture scheduling, and comprehensive analytics for total courses, instructors, and upcoming lectures.

**Instructor Dashboard** - Dedicated instructor portal displaying assigned lectures, upcoming schedules, completed lectures with smart date-based filtering, personal lecture management with clear separation between upcoming and completed sessions, and profile information display.

**Date-Based Intelligence** - Sophisticated date filtering logic ensuring lectures appear in "Upcoming" only if scheduled for future dates (excluding today), and automatically move to "Completed" the next day.  Batch visibility based on current date with automatic hiding of past batches.

**Responsive Design Excellence** - Mobile-first responsive architecture with Tailwind CSS 4.x ensuring optimal viewing across desktop, tablet, and mobile devices.  Smooth animations, mobile hamburger menu, and intuitive user interface with React Icons (FiIcons). 

**Image Upload System** - Secure course and profile image upload functionality with base64 encoding for database storage, drag-and-drop support, image preview functionality, file type validation, and automatic compression for optimal performance.

**Secure Authentication System** - Enterprise-grade JWT-based authentication with bcrypt password hashing, automatic token refresh, secure session management with 30-day token expiration, protected API endpoints, and role-specific access control middleware.

**CORS Security** - Advanced CORS configuration supporting multiple origins including localhost development environments and production Netlify deployment, with credentials support and comprehensive HTTP methods handling.

## Technology Stack

| Technology | Version | Purpose | Implementation |
|------------|---------|----------|----------------|
| React | 19.x | Frontend UI framework with modern hooks | Functional components with Context API for state management |
| JavaScript | ES6+ | Primary programming language for full-stack | Modern syntax with async/await, arrow functions, and ES modules |
| Express | 4. x | Backend API server for RESTful operations | Comprehensive middleware stack with error handling and validation |
| MongoDB | 8. x | NoSQL database for flexible data storage | Document-based storage with Mongoose ODM and schema validation |
| Mongoose | 8.x | MongoDB object modeling and validation | Schema design with pre-save hooks, password comparison methods |
| Node.js | 18+ | JavaScript runtime for server-side execution | Asynchronous event-driven architecture with ES6+ module support |
| Vite | 7.x (Rolldown) | Next-generation frontend build tool | Lightning-fast HMR, optimized bundling, and development server |
| Tailwind CSS | 4.x | Utility-first CSS framework | Responsive design, custom theming, and component styling |
| JWT | 9.x | Secure token-based authentication | Stateless authentication with 30-day expiration |
| Bcrypt. js | 2.x | Password hashing and security | Secure password encryption with salt rounds and comparison |
| React Router | 7.x | Client-side routing and navigation | Protected routes, nested routing, and dynamic navigation |
| React Icons | 5.x | Feather Icons library for React | Consistent Fi* iconography across the application |
| React Toastify | 11.x | Toast notification system | User feedback for actions and errors with customizable styling |
| Axios | 1.x | HTTP client for API requests | Promise-based requests with interceptors for auth tokens |
| Multer | 1.4.5 | File upload middleware | Image upload handling and multipart form data processing |

## Application Architecture & Flow

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Layer (React 19 + Vite)              │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        │
│  │  Auth Pages   │  │ Admin Panel   │  │ Instructor    │        │
│  │  - AdminLogin │  │  - Dashboard  │  │  - Dashboard  │        │
│  │  - InstrLogin │  │  - CourseList │  │  - MyLectures │        │
│  │  - Signup     │  │  - AddCourse  │  │  - Profile    │        │
│  │               │  │  - EditCourse │  │               │        │
│  │               │  │  - Instructors│  │               │        │
│  └───────────────┘  └───────────────┘  └───────────────┘        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │     Components (Shared UI + Layouts)                     │   │
│  │  - Navbar       - DashboardLayout    - Sidebar          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │     Context API + Axios State Management                 │   │
│  │  - AuthContext (user, token, login, logout)              │   │
│  │  - API Service (axios instance with interceptors)        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ▼ HTTPS/REST API ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Application Layer (Express. js)                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Middleware Stack                        │  │
│  │  - CORS (multiple origins)  - Body Parser (50MB limit)   │  │
│  │  - JWT Auth (protect)       - Role Check (admin/instr)   │  │
│  │  - Multer Upload            - Error Handler              │  │
│  │  - Static File Serving      - Request Logging            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Controllers  │  │  Middleware  │  │    Routes    │           │
│  │ authCtrl     │  │  auth. js     │  │  auth. js     │           │  
│  │ courseCtrl   │  │  (protect)   │  │  courses.js  │           │
│  │ lectureCtrl  │  │  (admin)     │  │  lectures. js │           │
│  │ instrCtrl    │  │  (instructor)│  │  instructors │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                            ▼ Mongoose ODM ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Data Layer (MongoDB Atlas)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  User Model  │  │ Course Model │  │Lecture Model │           │
│  │  - name      │  │  - name      │  │  - title     │           │
│  │  - email     │  │  - level     │  │  - date      │           │
│  │  - password  │  │  - desc      │  │  - duration  │           │
│  │  - role      │  │  - image     │  │  - courseId  │           │
│  │  - phone     │  │  - batches[] │  │  - instrId   │           │
│  │  - expertise │  │              │  │              │           │
│  │  - profile   │  │              │  │              │           │
│  │    Picture   │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Schema Features:                                       │    │
│  │  - Pre-save password hashing with bcrypt                │    │
│  │  - Password comparison method                           │    │  
│  │  - Timestamps (createdAt, updatedAt)                    │    │
│  │  - Role-based enum validation                           │    │  
│  │  - Embedded batches in Course schema                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Application Flow

#### 1. **Authentication Flow**

```
User (Browser)
    │
    ├─→ Admin Login (/admin-login)
    │   └─→ POST /api/auth/login { email, password, role: 'admin' }
    │       └─→ JWT Token Generated (30 days)
    │           └─→ Redirect to /admin/dashboard
    │
    ├─→ Instructor Login (/instructor-login)
    │   └─→ POST /api/auth/login { email, password, role: 'instructor' }
    │       └─→ JWT Token Generated (30 days)
    │           └─→ Redirect to /instructor/dashboard
    │
    └─→ Instructor Signup (/signup)
        └─→ POST /api/auth/signup { name, email, password, phone, expertise, profilePicture }
            └─→ User Created with role: 'instructor'
                └─→ JWT Token Generated
                    └─→ Auto-login to /instructor/dashboard
```

#### 2. **Admin Dashboard Flow**

```
Admin Dashboard (/admin)
    │
    ├─→ View Statistics
    │   └─→ GET /api/courses (count)
    │   └─→ GET /api/instructors (count)
    │   └─→ GET /api/lectures? upcoming=true
    │
    ├─→ Manage Courses (/admin/courses)
    │   ├─→ View All: GET /api/courses
    │   ├─→ Add New: POST /api/courses { name, level, description, image }
    │   ├─→ Edit: PUT /api/courses/:id
    │   └─→ Delete: DELETE /api/courses/:id
    │
    ├─→ Manage Batches (/admin/courses/:id/batches)
    │   ├─→ View Batches: GET /api/courses/:id
    │   ├─→ Add Batch: POST /api/courses/:id/batches { startDate, instructorId }
    │   ├─→ Edit Batch: PUT /api/courses/:id/batches/:batchId
    │   └─→ Delete Batch: DELETE /api/courses/:id/batches/:batchId
    │
    ├─→ Manage Lectures (/admin/courses/:id/lectures)
    │   ├─→ Schedule: POST /api/lectures { courseId, batchId, title, date, duration, instructorId }
    │   ├─→ Edit: PUT /api/lectures/:id
    │   └─→ Delete: DELETE /api/lectures/:id
    │
    └─→ View Instructors (/admin/instructors)
        └─→ GET /api/instructors
            └─→ Display: name, email, phone, expertise, profilePicture
```

#### 3. **Instructor Dashboard Flow**

```
Instructor Dashboard (/instructor)
    │
    ├─→ View Profile Info
    │   └─→ Display: name, email, role, profilePicture from AuthContext
    │
    ├─→ View Statistics
    │   └─→ GET /api/lectures?instructorId=${userId}
    │       ├─→ Count upcoming lectures (date > today)
    │       └─→ Count total lectures
    │
    ├─→ View My Lectures (/instructor/lectures)
    │   └─→ GET /api/lectures?instructorId=${userId}
    │       ├─→ Filter: Upcoming (date > today)
    │       ├─→ Filter: Completed (date <= today)
    │       └─→ Display: course name, lecture title, date, duration
    │
    └─→ Profile Management
        └─→ View/Edit profile picture, expertise, phone
```

#### 4. **Image Upload Flow**

```
Image Upload (Course/Profile)
    │
    ├─→ User selects image file OR drags & drops
    │   └─→ JavaScript FileReader API
    │       └─→ Convert to Base64 string
    │           └─→ Preview image in browser
    │               └─→ Store base64 in formData. image
    │
    └─→ Form Submit
        └─→ POST request with base64 image
            └─→ Backend receives base64 string
                └─→ Store in MongoDB (no file system needed)
                    └─→ Retrieve and display: <img src={base64String} />
```

#### 5. **Date-Based Filtering Logic**

```javascript
// Backend Logic (lectureController.js)
const today = new Date();
today.setHours(0, 0, 0, 0);

// Upcoming Lectures
const upcomingLectures = lectures.filter(lecture => {
  const lectureDate = new Date(lecture.date);
  return lectureDate > today; // Future dates only (excluding today)
});

// Completed Lectures
const completedLectures = lectures.filter(lecture => {
  const lectureDate = new Date(lecture.date);
  return lectureDate <= today; // Today and past dates
});

// Batch Filtering (Admin Panel)
const currentBatches = batches.filter(batch => {
  const batchDate = new Date(batch. startDate);
  return batchDate >= today; // Today and future dates
});
```

#### 6. **Protected Routes Flow**

```
Request to Protected Endpoint
    │
    ├─→ Axios Interceptor adds: Authorization: Bearer <token>
    │
    └─→ Backend Middleware: protect(req, res, next)
        ├─→ Extract token from header
        ├─→ Verify JWT with JWT_SECRET
        ├─→ Decode userId from token
        ├─→ Find user in database
        │   ├─→ User found: req.user = user → next()
        │   └─→ User not found: 401 Unauthorized
        │
        └─→ Role-Based Middleware: admin(req, res, next)
            ├─→ Check: req.user.role === 'admin'
            │   ├─→ True: next()
            │   └─→ False: 403 Forbidden
            └─→ instructor(req, res, next)
                ├─→ Check: req.user.role === 'instructor'
                    ├─→ True: next()
                    └─→ False: 403 Forbidden
```

## Quick Start

### Prerequisites

![Node.js](https://img. shields.io/badge/Node. js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9%2B-CB3837? style=flat-square&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8%2B-47A248? style=flat-square&logo=mongodb&logoColor=white)

Before you begin, make sure you have the following installed:

- **Node.js 18. 0 or higher** - JavaScript runtime
  - Download from: [https://nodejs.org/](https://nodejs.org/)
  - Choose the LTS (Long Term Support) version
  
- **MongoDB Atlas Account** - Cloud database
  - Go to: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb. com/cloud/atlas/register)
  - Create a free account and cluster
  
- **Git** - Version control
  - Download from: [https://git-scm.com/downloads](https://git-scm. com/downloads)

### Installation Guide

#### Step 1: Clone the Repository

```bash
git clone https://github. com/Shubham23593/ideamagix_task.git
cd ideamagix_task
cd ideamagix_task-main
```

#### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
```

#### Step 3: Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key-min-32-characters
NODE_ENV=development
```

**⚠️ Security Note:** Replace `your-mongodb-connection-string` and `your-secret-key-min-32-characters` with your actual credentials. Never commit `. env` to version control.

#### Step 4: Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend/my-app

# Install dependencies
npm install
```

#### Step 5: Frontend Environment Variables

Create a `.env` file in the `frontend/my-app` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

For production deployment on Netlify:
```env
VITE_API_URL=https://ideatest-in0m.onrender.com/api
```

### Running the Application

#### Start Backend Server

```bash
# From backend folder
cd backend
npm run dev
```

You should see:
```
✅ Server running in development mode on port 5000
📡 CORS enabled for: http://localhost:5173
MongoDB Connected: cluster0-xxxxx. mongodb.net
```

#### Start Frontend Server

Open a new terminal:

```bash
# From frontend/my-app folder
cd frontend/my-app
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

#### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Admin Login:** http://localhost:5173/admin-login
- **Instructor Login:** http://localhost:5173/instructor-login

### Database Setup & Seeding

```bash
# From backend folder
npm run seed
```

**Default Credentials Created:**

```
👨‍💼 Admin:
📧 Email: ideamagix@admin
🔑 Password: admin@123

👨‍🏫 Instructor 1:
📧 Email: instructor1@gmail.com
🔑 Password: instructor1

👨‍🏫 Instructor 2:
📧 Email: instructor2@gmail. com
🔑 Password: instructor2
```

## Project Structure

```
ideamagix_task/
└── ideamagix_task-main/
    ├── backend/
    │   ├── server.js                          # Express app entry point
    │   ├── config/
    │   │   └── db.js                          # MongoDB connection
    │   ├── controllers/
    │   │   └── authController.js              # Auth logic (login, signup, register)
    │   ├── models/
    │   │   └── User.js                        # User schema with profilePicture
    │   ├── middleware/
    │   │   └── auth.js                        # JWT verification (protect, admin, instructor)
    │   ├── routes/
    │   │   ├── auth.js                        # Auth routes
    │   │   ├── courses.js                     # Course routes
    │   │   ├── lectures.js                    # Lecture routes
    │   │   └── instructors.js                 # Instructor routes
    │   ├── scripts/
    │   │   └── setupDatabase.js               # Database seeding script
    │   ├── uploads/
    │   │   └── profiles/                      # Uploaded profile pictures
    │   ├── package.json                       # Backend dependencies
    │   └── .env                               # Environment variables
    │
    └── frontend/
        └── my-app/
            ├── index.html
            ├── vite.config.js                 # Vite configuration
            ├── tailwind.config.js             # Tailwind CSS config
            ├── src/
            │   ├── main.jsx                   # React entry point
            │   ├── App.jsx                    # Root component with routes
            │   │
            │   ├── pages/
            │   │   ├── AdminLogin.jsx         # Admin login page
            │   │   ├── InstructorLogin.jsx    # Instructor login page
            │   │   ├── Signup.jsx             # Instructor signup page
            │   │   ├── AdminDashboard. jsx     # Admin dashboard
            │   │   ├── CourseList.jsx         # View all courses
            │   │   ├── AddCourse.jsx          # Add new course
            │   │   ├── EditCourse.jsx         # Edit course
            │   │   ├── InstructorDashboard.jsx # Instructor dashboard
            │   │   └── MyLectures.jsx         # Instructor lectures page
            │   │
            │   ├── components/
            │   │   ├── Navbar.jsx             # Navigation with profile display
            │   │   ├── Sidebar.jsx            # Sidebar navigation
            │   │   └── DashboardLayout.jsx    # Dashboard wrapper
            │   │
            │   ├── context/
            │   │   └── AuthContext.jsx        # Auth state management
            │   │
            │   ├── utils/
            │   │   └── api.js                 # Axios instance with interceptors
            │   │
            │   ├── package.json               # Frontend dependencies
            │   └── .env                       # Environment variables
            │
            └── dist/                          # Production build output
```

## API Documentation

### Authentication Endpoints

| Endpoint | Method | Description | Auth | Request Body |
|----------|--------|-------------|------|--------------|
| `/api/auth/login` | POST | Login admin or instructor | None | `{ email, password, role }` |
| `/api/auth/signup` | POST | Register new instructor | None | `{ name, email, password, phone, expertise, profilePicture }` |
| `/api/auth/register` | POST | Admin creates instructor | Admin | `{ name, email, password, role, phone, expertise }` |

### Course Endpoints

| Endpoint | Method | Description | Auth | Request Body |
|----------|--------|-------------|------|--------------|
| `/api/courses` | GET | Get all courses | None | - |
| `/api/courses/:id` | GET | Get single course | None | - |
| `/api/courses` | POST | Create course | Admin | `{ name, level, description, image }` |
| `/api/courses/:id` | PUT | Update course | Admin | `{ name, level, description, image }` |
| `/api/courses/:id` | DELETE | Delete course | Admin | - |

### Lecture Endpoints

| Endpoint | Method | Description | Auth | Query/Body |
|----------|--------|-------------|------|-----------|
| `/api/lectures` | GET | Get lectures | Required | `? instructorId=xxx` |
| `/api/lectures/:id` | GET | Get single lecture | Required | - |
| `/api/lectures` | POST | Create lecture | Admin | `{ courseId, batchId, title, date, duration, instructorId }` |
| `/api/lectures/:id` | PUT | Update lecture | Admin | Same as POST |
| `/api/lectures/:id` | DELETE | Delete lecture | Admin | - |

### Instructor Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/instructors` | GET | Get all instructors | Admin |

## Key Features Implementation

### 1. Profile Picture Upload

**User Model Enhancement:**
```javascript
profilePicture: {
  type: String,
  default: '',
}
```

**Upload Flow:**
- Drag & drop or file selection
- Base64 conversion with FileReader API
- Store base64 string in MongoDB
- Display with `<img src={base64String} />`

### 2. Role-Based Authentication

**Middleware Chain:**
```javascript
// Protected route example
router.post('/courses', protect, admin, createCourse);

// protect: Verifies JWT token
// admin: Checks user. role === 'admin'
```

**Roles:**
- `admin`: Full access to all features
- `instructor`: View assigned lectures only

### 3.  CORS Configuration

**Multiple Origins Support:**
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'https://ideamagixtask.netlify.app'
];
```

### 4. Date-Based Filtering

**Upcoming Lectures:**
```javascript
const today = new Date();
today.setHours(0, 0, 0, 0);
lectures. filter(l => new Date(l.date) > today);
```

**Completed Lectures:**
```javascript
lectures.filter(l => new Date(l.date) <= today);
```

## Deployment

### Frontend (Netlify)

**Build Settings:**
```
Base directory: frontend/my-app
Build command: npm run build
Publish directory: frontend/my-app/dist
```

**Environment Variables:**
```
VITE_API_URL=https://ideatest-in0m.onrender.com/api
```

### Backend (Render)

**Build Settings:**
```
Root directory: backend
Build command: npm install
Start command: npm start
```

**Environment Variables:**
```
PORT=5000
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret
```

## Contributing

1. Fork the repository
2.  Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security Best Practices

✅ **JWT tokens** with 30-day expiration
✅ **Bcrypt password hashing** with salt rounds
✅ **CORS** configured for specific origins
✅ **Protected routes** with middleware
✅ **Input validation** on all endpoints
✅ **Environment variables** for sensitive data
✅ **HTTPS** enforcement in production

## Troubleshooting

**MongoDB Connection Failed:**
- Verify `MONGO_URI` in `.env`
- Check IP whitelist in MongoDB Atlas (use 0.0.0.0/0 for development)

**CORS Errors:**
- Ensure frontend URL is in `allowedOrigins` array in `server.js`
- Check `VITE_API_URL` matches backend URL

**Image Upload Issues:**
- Verify 50MB body parser limit in `server.js`
- Check base64 encoding in frontend

**Token Expired:**
- Tokens expire after 30 days
- Re-login to generate new token

## Contact & Support

**Developer:** Shubham Dalvi  
**GitHub:** [@Shubham23593](https://github.com/Shubham23593)  
**Repository:** [ideamagix_task](https://github.com/Shubham23593/ideamagix_task)  
**Live Demo:** [https://ideamagixtask.netlify.app](https://ideamagixtask.netlify.app)  

## License

This project is open source and available under the MIT License. 

---

**🌐 Try it live:** [IDEAMAGIX TASK](https://ideamagixtask. netlify.app)

**⭐ Star this repository** if you find it helpful!

**Developed with ❤️ by Shubham Dalvi**