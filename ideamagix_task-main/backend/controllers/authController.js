import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt. sign({ id }, process.env. JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new instructor (Signup) - ⭐ NEW FUNCTION
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, expertise } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400). json({ message: 'User already exists with this email' });
    }

    // Get profile picture path if uploaded
    const profilePicture = req.file ?  `/uploads/profiles/${req.file. filename}` : '';

    // Create instructor
    const user = await User.create({
      name,
      email,
      password,
      role: 'instructor', // Only instructors can sign up
      phone,
      expertise,
      profilePicture,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        expertise: user.expertise,
        profilePicture: user.profilePicture,  // ⭐ NEW FIELD
        token: generateToken(user._id),
      });
    } else {
      res. status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register new user (Admin creates instructor)
// @route   POST /api/auth/register
// @access  Private/Admin
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, expertise } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      expertise,
    });

    if (user) {
      res.status(201). json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        expertise: user.expertise,
        profilePicture: user.profilePicture,  // ⭐ NEW FIELD
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res. status(500).json({ message: error.message });
  }
};

// @desc    Login user (Admin or Instructor)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log('🔐 Login attempt:', { email, requestedRole: role });

    // Check for user email
    const user = await User. findOne({ email }). select('+password');

    if (!user) {
      console.log('❌ User not found');
      return res. status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ User found:', { email: user.email, userRole: user.role });

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (! isPasswordValid) {
      console.log('❌ Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ Password valid');

    // If role is specified, validate it matches
    if (role && user. role !== role) {
      console.log('❌ Role mismatch:', { expected: role, actual: user.role });
      return res.status(403).json({ 
        message: `Access denied!  ${role === 'admin' ? 'Admin' : 'Instructor'} credentials required. ` 
      });
    }

    console.log('✅ Login successful');

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      expertise: user.expertise,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500). json({ message: error.message });
  }
};
// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User. findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
};