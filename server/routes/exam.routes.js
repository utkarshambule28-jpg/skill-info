import express from 'express';
import {
  getAllExams,
  getExamById,
  generateExam,
  submitExam,
  getExamResults,
  getUserExamResults
} from '../controllers/examController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Fetch all exams
router.get('/', getAllExams);

// Auto-generate exam
router.post('/generate', protect, generateExam);

// Submit exam answers
router.post('/:examId/submit', protect, submitExam);

// Fetch exam details
router.get('/:id', protect, getExamById);

// Fetch result of a specific exam
router.get('/:examId/results', protect, getExamResults);

// User exam history
router.get('/user/results', protect, getUserExamResults);

export default router;
