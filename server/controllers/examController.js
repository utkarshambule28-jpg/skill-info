// controllers/examController.js
import Exam from "../models/Exam.js";
import ExamResult from "../models/ExamResult.js";

// --------------------------------------------
// SAMPLE QUESTION BANK (no OpenAI needed)
// --------------------------------------------
const QUESTION_BANK = {
  "Natural Language Processing (NLP)": {
    Transformers: [
      {
        question: "What mechanism allows transformers to capture relationships between words?",
        options: ["Pooling", "Attention", "Encoding", "Batch Normalization"],
        correctAnswer: 1,
        explanation: "Transformers rely heavily on attention mechanisms."
      },
      {
        question: "Which model is commonly used for sequence-to-sequence NLP tasks?",
        options: ["CNN", "LSTM", "Decision Tree", "SVM"],
        correctAnswer: 1,
        explanation: "LSTMs are commonly used in sequence models."
      }
    ],
    "Sentiment Analysis": [
      {
        question: "What is the goal of sentiment analysis?",
        options: ["Summarizing text", "Classifying emotion", "Detecting objects", "Translating languages"],
        correctAnswer: 1,
        explanation: "Sentiment analysis classifies emotional tone."
      }
    ]
  },

  "Machine Learning Fundamentals": {
    "Supervised Learning": [
      {
        question: "Which algorithm is used for classification?",
        options: ["Linear Regression", "K-Means", "Decision Tree", "PCA"],
        correctAnswer: 2,
        explanation: "Decision trees are popular classification models."
      }
    ],
  },

  "Computer Vision": {
    CNNs: [
      {
        question: "What does a convolution layer do?",
        options: ["Extracts features", "Sorts images", "Encodes text", "Predicts sequences"],
        correctAnswer: 0,
        explanation: "Convolutions extract features like edges and shapes."
      }
    ]
  }
};

// Utility: randomly pick questions
function pickQuestions(skill, category, numQuestions) {
  const all = QUESTION_BANK[skill]?.[category] || [];
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numQuestions);
}

// --------------------------------------------------
// GET ALL EXAMS
// --------------------------------------------------
export const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, exams });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// GET EXAM BY ID
// --------------------------------------------------
export const getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    res.status(200).json({ success: true, exam });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// SIMPLE EXAM GENERATOR (NO AI)
// --------------------------------------------------
export const generateExam = async (req, res, next) => {
  try {
    const { skill, category, difficulty, numQuestions = 10, timeLimit = 30 } = req.body;

    if (!skill || !category || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "skill, category, difficulty are required"
      });
    }

    // Pick questions from our bank
    const questions = pickQuestions(skill, category, numQuestions);

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No questions available for this skill/category"
      });
    }

    // Create exam
    const exam = await Exam.create({
      title: `${skill} - ${difficulty} Assessment`,
      skillName: skill,
      category,
      difficulty,
      questions,
      timeLimit,
      passingScore: 70,
      creator: req.user?.id || null
    });

    res.status(201).json({ success: true, exam });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// SUBMIT EXAM
// --------------------------------------------------
export const submitExam = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { answers, timeSpent } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    let correct = 0;

    const processed = exam.questions.map((q, idx) => {
      const userAns = answers[idx]?.selectedAnswer;
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correct++;

      return {
        questionId: q._id,
        selectedAnswer: userAns,
        isCorrect
      };
    });

    const score = Math.round((correct / exam.questions.length) * 100);
    const passed = score >= exam.passingScore;

    const result = await ExamResult.create({
      user: req.user.id,
      exam: examId,
      answers: processed,
      score,
      correctAnswers: correct,
      totalQuestions: exam.questions.length,
      timeSpent,
      passed
    });

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    next(error);
  }
};

export const getExamResults = async (req, res, next) => {
  try {
    const { examId } = req.params;

    const results = await ExamResult.find({
      user: req.user.id,
      exam: examId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// GET USER'S RESULTS
// --------------------------------------------------
export const getUserExamResults = async (req, res, next) => {
  try {
    const results = await ExamResult.find({ user: req.user.id })
      .populate("exam", "title skillName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, results });
  } catch (error) {
    next(error);
  }
};
