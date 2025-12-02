import express from 'express';
import {
  getLectures,
  getLecturesByCourse,
  getLecturesByInstructor,
  checkAvailability,
  createLecture,
  updateLecture,
  deleteLecture,
} from '../controllers/lectureController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router. route('/')
  .get(protect, getLectures)
  .post(protect, admin, createLecture);

router.post('/check-availability', protect, admin, checkAvailability);

router.route('/:id')
  .put(protect, admin, updateLecture)
  .delete(protect, admin, deleteLecture);

router.get('/course/:courseId', protect, getLecturesByCourse);
router.get('/instructor/:instructorId', protect, getLecturesByInstructor);

export default router;