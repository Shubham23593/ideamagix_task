import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a course name'],
      trim: true,
    },
    level: {
      type: String,
      required: [true, 'Please provide a course level'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description'],
      trim: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Course+Image',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;