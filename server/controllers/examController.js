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
      },
      {
        question: "What is the self-attention mechanism?",
        options: ["Attention to past inputs", "Computing relevance between words", "Random sampling", "Matrix multiplication"],
        correctAnswer: 1,
        explanation: "Self-attention computes relevance between different positions."
      },
      {
        question: "How many attention heads does BERT use?",
        options: ["4", "8", "12", "16"],
        correctAnswer: 2,
        explanation: "BERT uses 12 attention heads."
      }
    ],
    Embeddings: [
      {
        question: "What is word embedding?",
        options: ["Converting words to vectors", "Storing words in memory", "Organizing vocabulary", "Translating text"],
        correctAnswer: 0,
        explanation: "Word embeddings represent words as numerical vectors."
      },
      {
        question: "Which embedding technique is most commonly used?",
        options: ["One-hot encoding", "Word2Vec", "Count vectorization", "TF-IDF"],
        correctAnswer: 1,
        explanation: "Word2Vec is widely used for generating embeddings."
      },
      {
        question: "What is the dimension of word2vec embeddings typically?",
        options: ["50", "100", "200", "All of the above"],
        correctAnswer: 3,
        explanation: "Word2Vec can use various dimensions, typically 100-300."
      }
    ],
    "Sentiment Analysis": [
      {
        question: "What is the goal of sentiment analysis?",
        options: ["Summarizing text", "Classifying emotion", "Detecting objects", "Translating languages"],
        correctAnswer: 1,
        explanation: "Sentiment analysis classifies emotional tone."
      },
      {
        question: "What are the common sentiment classes?",
        options: ["Good and Bad", "Positive, Negative, Neutral", "Happy and Sad", "Like and Dislike"],
        correctAnswer: 1,
        explanation: "Typical sentiment classes are Positive, Negative, and Neutral."
      },
      {
        question: "Which model performed best on sentiment tasks initially?",
        options: ["Naive Bayes", "SVM", "BERT", "Linear Regression"],
        correctAnswer: 2,
        explanation: "BERT achieved state-of-the-art results on sentiment tasks."
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
      },
      {
        question: "What is the difference between classification and regression?",
        options: ["Time complexity", "Output type (categorical vs continuous)", "Input features", "Training data size"],
        correctAnswer: 1,
        explanation: "Classification predicts categories, regression predicts continuous values."
      },
      {
        question: "What is overfitting in ML?",
        options: ["Model memorizing training data", "Model ignoring features", "Too many features", "Large dataset"],
        correctAnswer: 0,
        explanation: "Overfitting occurs when a model learns noise instead of patterns."
      }
    ],
    "Model Evaluation": [
      {
        question: "What is accuracy?",
        options: ["Correct predictions / Total predictions", "True positives / All positives", "True negatives / All negatives", "Precision + Recall"],
        correctAnswer: 0,
        explanation: "Accuracy is the ratio of correct predictions to total predictions."
      },
      {
        question: "When is F1-score preferred over accuracy?",
        options: ["Always", "With imbalanced datasets", "With regression tasks", "Never"],
        correctAnswer: 1,
        explanation: "F1-score is useful for imbalanced datasets."
      },
      {
        question: "What does a confusion matrix show?",
        options: ["Feature importance", "Prediction errors categorized", "Training time", "Learning curves"],
        correctAnswer: 1,
        explanation: "Confusion matrix shows true/false positives and negatives."
      }
    ],
    Algorithms: [
      {
        question: "Which algorithm is used for clustering?",
        options: ["Linear Regression", "K-Means", "Logistic Regression", "Decision Tree"],
        correctAnswer: 1,
        explanation: "K-Means is a popular clustering algorithm."
      },
      {
        question: "What is cross-validation used for?",
        options: ["Training models", "Evaluating model generalization", "Data preprocessing", "Feature scaling"],
        correctAnswer: 1,
        explanation: "Cross-validation helps estimate model performance."
      }
    ]
  },

  "Computer Vision": {
    CNNs: [
      {
        question: "What does a convolution layer do?",
        options: ["Extracts features", "Sorts images", "Encodes text", "Predicts sequences"],
        correctAnswer: 0,
        explanation: "Convolutions extract features like edges and shapes."
      },
      {
        question: "What is a pooling layer?",
        options: ["Combines multiple models", "Reduces spatial dimensions", "Increases features", "Normalizes inputs"],
        correctAnswer: 1,
        explanation: "Pooling reduces dimensions while retaining important features."
      },
      {
        question: "How many layers does AlexNet have?",
        options: ["5", "8", "11", "16"],
        correctAnswer: 0,
        explanation: "AlexNet has 8 layers (5 convolutional, 3 fully connected)."
      }
    ],
    "Object Detection": [
      {
        question: "What does object detection involve?",
        options: ["Classifying images", "Locating and identifying objects", "Counting pixels", "Measuring colors"],
        correctAnswer: 1,
        explanation: "Object detection finds and labels objects in images."
      },
      {
        question: "Which algorithm is used for object detection?",
        options: ["YOLO", "SVM", "K-Means", "PCA"],
        correctAnswer: 0,
        explanation: "YOLO is a popular real-time object detection algorithm."
      },
      {
        question: "What is the advantage of single-stage detectors like YOLO?",
        options: ["Higher accuracy", "Faster inference", "Smaller model size", "Less training data needed"],
        correctAnswer: 1,
        explanation: "Single-stage detectors are faster than two-stage detectors."
      }
    ],
    "Image Classification": [
      {
        question: "What is ImageNet?",
        options: ["An image database", "A classification algorithm", "A GPU", "An image format"],
        correctAnswer: 0,
        explanation: "ImageNet is a large-scale visual database used for training."
      },
      {
        question: "What is transfer learning?",
        options: ["Moving data between computers", "Reusing pre-trained models", "Translating images", "Scaling images"],
        correctAnswer: 1,
        explanation: "Transfer learning reuses knowledge from pre-trained models."
      }
    ]
  },

  "Deep Learning": {
    "Neural Networks": [
      {
        question: "What is a neuron in neural networks?",
        options: ["A biological cell", "A computing unit with weights and bias", "A processing chip", "A memory unit"],
        correctAnswer: 1,
        explanation: "A neuron is a computational unit that performs weighted sum + activation."
      },
      {
        question: "What is an activation function?",
        options: ["Initializes weights", "Introduces non-linearity", "Prevents overfitting", "Normalizes inputs"],
        correctAnswer: 1,
        explanation: "Activation functions add non-linearity to networks."
      },
      {
        question: "What does ReLU activation do?",
        options: ["Squares inputs", "Returns max(0, x)", "Applies sigmoid", "Normalizes values"],
        correctAnswer: 1,
        explanation: "ReLU returns the maximum of 0 and the input."
      }
    ],
    Backpropagation: [
      {
        question: "What is backpropagation?",
        options: ["Forward pass in network", "Algorithm to compute gradients", "Storing previous states", "Reversing network"],
        correctAnswer: 1,
        explanation: "Backpropagation computes gradients for weight updates."
      },
      {
        question: "What is the gradient descent algorithm used for?",
        options: ["Forward computation", "Minimizing loss function", "Data preprocessing", "Feature extraction"],
        correctAnswer: 1,
        explanation: "Gradient descent minimizes the loss function by updating weights."
      },
      {
        question: "What is the learning rate?",
        options: ["Speed of data loading", "Step size for weight updates", "Number of epochs", "Batch size"],
        correctAnswer: 1,
        explanation: "Learning rate controls how much weights change per update."
      }
    ],
    Optimization: [
      {
        question: "What is a local minima problem?",
        options: ["Small dataset", "Stuck at suboptimal solution", "Slow training", "High loss"],
        correctAnswer: 1,
        explanation: "Local minima can trap optimization algorithms."
      },
      {
        question: "What does Adam optimizer do?",
        options: ["Averages gradients", "Adapts learning rate per parameter", "Reduces batch size", "Increases epochs"],
        correctAnswer: 1,
        explanation: "Adam adaptively adjusts learning rates for each parameter."
      },
      {
        question: "What is batch normalization?",
        options: ["Normalizing batch size", "Standardizing layer inputs", "Grouping data", "Reducing memory"],
        correctAnswer: 1,
        explanation: "Batch normalization standardizes inputs to each layer."
      }
    ],
    Regularization: [
      {
        question: "What is regularization used for?",
        options: ["Speed up training", "Prevent overfitting", "Increase accuracy", "Reduce memory"],
        correctAnswer: 1,
        explanation: "Regularization prevents overfitting by penalizing complex models."
      },
      {
        question: "What does L1 regularization do?",
        options: ["Squares weights", "Sums absolute weights", "Multiplies by learning rate", "Averages errors"],
        correctAnswer: 1,
        explanation: "L1 adds the sum of absolute weights to the loss function."
      },
      {
        question: "What is dropout?",
        options: ["Removing layers", "Randomly disabling neurons during training", "Deleting outliers", "Reducing dataset"],
        correctAnswer: 1,
        explanation: "Dropout randomly disables neurons to prevent co-adaptation."
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
