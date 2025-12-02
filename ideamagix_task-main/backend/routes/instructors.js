import express from 'express';
import {
  getInstructors,
  getInstructor,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from '../controllers/instructorController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getInstructors)
  .post(protect, admin, createInstructor);

router.route('/:id')
  .get(protect, getInstructor)
  .put(protect, admin, updateInstructor)
  .delete(protect, admin, deleteInstructor);

export default router;