import Lecture from '../models/Lecture.js';
import User from '../models/User.js';

// @desc    Get all lectures
// @route   GET /api/lectures
// @access  Private
export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate('course', 'name level')
      .populate('instructor', 'name email expertise')
      .sort({ date: -1 });
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lectures by course
// @route   GET /api/lectures/course/:courseId
// @access  Private
export const getLecturesByCourse = async (req, res) => {
  try {
    const lectures = await Lecture.find({ course: req.params.courseId })
      .populate('instructor', 'name email expertise')
      . sort({ date: 1 });
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lectures by instructor
// @route   GET /api/lectures/instructor/:instructorId
// @access  Private
export const getLecturesByInstructor = async (req, res) => {
  try {
    const lectures = await Lecture. find({ instructor: req.params. instructorId })
      .populate('course', 'name level description image')
      .sort({ date: 1 });
    res. json(lectures);
  } catch (error) {
    res. status(500).json({ message: error.message });
  }
};

// @desc    Check instructor availability
// @route   POST /api/lectures/check-availability
// @access  Private/Admin
export const checkAvailability = async (req, res) => {
  try {
    const { instructorId, date } = req. body;

    // Parse the date to ensure we're comparing dates only (not times)
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(checkDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Check if instructor has any lecture on this date
    const existingLecture = await Lecture.findOne({
      instructor: instructorId,
      date: {
        $gte: checkDate,
        $lt: nextDay,
      },
    }). populate('course', 'name');

    if (existingLecture) {
      return res.json({
        available: false,
        message: `Instructor is already assigned to "${existingLecture.course.name}" on this date`,
        existingLecture,
      });
    }

    res.json({
      available: true,
      message: 'Instructor is available on this date',
    });
  } catch (error) {
    res.status(500). json({ message: error.message });
  }
};

// @desc    Create new lecture
// @route   POST /api/lectures
// @access  Private/Admin
export const createLecture = async (req, res) => {
  try {
    const { course, batchName, instructor, date, startTime, endTime, topic, notes } = req.body;

    // Check if instructor exists
    const instructorExists = await User.findById(instructor);
    if (!instructorExists || instructorExists.role !== 'instructor') {
      return res.status(400).json({ message: 'Invalid instructor' });
    }

    // Parse the date to ensure we're comparing dates only
    const lectureDate = new Date(date);
    lectureDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(lectureDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Check if instructor is already assigned on this date
    const existingLecture = await Lecture.findOne({
      instructor,
      date: {
        $gte: lectureDate,
        $lt: nextDay,
      },
    }).populate('course', 'name');

    if (existingLecture) {
      return res.status(400). json({
        message: `Instructor is already assigned to "${existingLecture.course.name}" on ${lectureDate.toDateString()}`,
      });
    }

    // Create lecture
    const lecture = await Lecture.create({
      course,
      batchName,
      instructor,
      date: lectureDate,
      startTime,
      endTime,
      topic,
      notes,
    });

    const populatedLecture = await Lecture. findById(lecture._id)
      .populate('course', 'name level')
      .populate('instructor', 'name email expertise');

    res.status(201).json(populatedLecture);
  } catch (error) {
    res. status(500).json({ message: error.message });
  }
};

// @desc    Update lecture
// @route   PUT /api/lectures/:id
// @access  Private/Admin
export const updateLecture = async (req, res) => {
  try {
    const { batchName, instructor, date, startTime, endTime, topic, notes } = req.body;

    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404). json({ message: 'Lecture not found' });
    }

    // If instructor or date is being changed, check availability
    if (instructor && date) {
      const lectureDate = new Date(date);
      lectureDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(lectureDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const existingLecture = await Lecture. findOne({
        _id: { $ne: req.params.id }, // Exclude current lecture
        instructor,
        date: {
          $gte: lectureDate,
          $lt: nextDay,
        },
      }).populate('course', 'name');

      if (existingLecture) {
        return res.status(400).json({
          message: `Instructor is already assigned to "${existingLecture.course.name}" on ${lectureDate.toDateString()}`,
        });
      }

      lecture.date = lectureDate;
    }

    lecture.batchName = batchName || lecture.batchName;
    lecture.instructor = instructor || lecture.instructor;
    lecture.startTime = startTime || lecture.startTime;
    lecture.endTime = endTime || lecture.endTime;
    lecture.topic = topic || lecture.topic;
    lecture.notes = notes || lecture.notes;

    const updatedLecture = await lecture.save();

    const populatedLecture = await Lecture.findById(updatedLecture._id)
      .populate('course', 'name level')
      .populate('instructor', 'name email expertise');

    res. json(populatedLecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lecture
// @route   DELETE /api/lectures/:id
// @access  Private/Admin
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req. params.id);

    if (! lecture) {
      return res. status(404).json({ message: 'Lecture not found' });
    }

    await lecture.deleteOne();

    res.json({ message: 'Lecture removed' });
  } catch (error) {
    res. status(500).json({ message: error.message });
  }
};