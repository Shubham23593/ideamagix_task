import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';                          // ⭐ NEW IMPORT
import { fileURLToPath } from 'url';              // ⭐ NEW IMPORT
import connectDB from './config/db.js';

// ⭐ Get __dirname in ES modules
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
app.use(express. json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// ⭐ Serve static files (profile pictures)
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
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});