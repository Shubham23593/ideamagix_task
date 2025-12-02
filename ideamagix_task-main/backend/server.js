import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import. meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import lectureRoutes from './routes/lectures.js';
import instructorRoutes from './routes/instructors.js';

const app = express();

// Body parser
app.use(express. json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enable CORS with proper configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
      'https://ideamagixtask.netlify.app'
    ];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (! origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
}));

// Handle preflight requests
app.options('*', cors());

// Serve static files (profile pictures)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/instructors', instructorRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Lecture Scheduling API is running.. .' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err. stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 CORS enabled for: http://localhost:5173`);
});