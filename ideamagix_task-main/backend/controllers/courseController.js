import Course from '../models/Course.js';
import Lecture from '../models/Lecture.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find(). populate('createdBy', 'name email'). sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Private
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get lectures for this course
    const lectures = await Lecture.find({ course: course._id })
      .populate('instructor', 'name email expertise')
      .sort({ date: 1 });

    res.json({ course, lectures });
  } catch (error) {
    res. status(500).json({ message: error.message });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    const course = await Course.create({
      name,
      level,
      description,
      image,
      createdBy: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.name = name || course.name;
    course.level = level || course.level;
    course.description = description || course.description;
    course.image = image || course.image;

    const updatedCourse = await course. save();

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course. findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete all lectures associated with this course
    await Lecture.deleteMany({ course: course._id });

    await course.deleteOne();

    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
};