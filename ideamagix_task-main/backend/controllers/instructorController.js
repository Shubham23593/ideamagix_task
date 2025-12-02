import User from '../models/User.js';

// @desc    Get all instructors
// @route   GET /api/instructors
// @access  Private
export const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }). select('-password');
    res. json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single instructor
// @route   GET /api/instructors/:id
// @access  Private
export const getInstructor = async (req, res) => {
  try {
    const instructor = await User. findById(req.params.id).select('-password');

    if (!instructor || instructor.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create instructor
// @route   POST /api/instructors
// @access  Private/Admin
export const createInstructor = async (req, res) => {
  try {
    const { name, email, password, phone, expertise } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400). json({ message: 'User already exists' });
    }

    const instructor = await User.create({
      name,
      email,
      password,
      phone,
      expertise,
      role: 'instructor',
    });

    res.status(201).json({
      _id: instructor._id,
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      expertise: instructor.expertise,
      role: instructor.role,
      profilePicture: instructor.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update instructor
// @route   PUT /api/instructors/:id
// @access  Private (Admin or Own Profile)
export const updateInstructor = async (req, res) => {
  try {
    const { name, phone, expertise, profilePicture } = req. body;

    const instructor = await User.findById(req.params.id);

    if (!instructor || instructor.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    // ✅ Authorization Check: Allow if user is admin OR updating their own profile
    const isAdmin = req.user.role === 'admin';
    const isOwnProfile = req.user._id.toString() === req.params. id;

    if (! isAdmin && !isOwnProfile) {
      return res.status(403).json({ 
        message: 'Not authorized to update this profile' 
      });
    }

    // Update fields
    instructor.name = name || instructor.name;
    instructor. phone = phone || instructor.phone;
    instructor.expertise = expertise || instructor.expertise;
    
    if (profilePicture) {
      instructor.profilePicture = profilePicture;
    }

    const updatedInstructor = await instructor.save();

    res.json({
      _id: updatedInstructor._id,
      name: updatedInstructor.name,
      email: updatedInstructor.email,
      phone: updatedInstructor.phone,
      expertise: updatedInstructor.expertise,
      role: updatedInstructor.role,
      profilePicture: updatedInstructor.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
};

// @desc    Delete instructor
// @route   DELETE /api/instructors/:id
// @access  Private/Admin
export const deleteInstructor = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);

    if (!instructor || instructor.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    await instructor.deleteOne();

    res.json({ message: 'Instructor removed' });
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
};