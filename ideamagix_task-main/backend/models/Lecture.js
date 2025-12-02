import mongoose from 'mongoose';

const lectureSchema = new mongoose. Schema(
  {
    course: {
      type: mongoose. Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    batchName: {
      type: String,
      required: [true, 'Please provide a batch name'],
      trim: true,
    },
    instructor: {
      type: mongoose. Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide a lecture date'],
    },
    startTime: {
      type: String,
      required: [true, 'Please provide start time'],
    },
    endTime: {
      type: String,
      required: [true, 'Please provide end time'],
    },
    topic: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
lectureSchema.index({ instructor: 1, date: 1 });

const Lecture = mongoose.model('Lecture', lectureSchema);

export default Lecture;