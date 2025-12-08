import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Skill from './models/Skill.js';
import Exam from './models/Exam.js';
import Achievement from './models/Achievement.js';

dotenv.config({ path: './server/.env' });

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB at:', process.env.MONGODB_URI);

    console.log('\nClearing existing data...');
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Exam.deleteMany({});
    await Achievement.deleteMany({});

    console.log('Creating users...');
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        stats: {
          examsCompleted: 25,
          certificatesEarned: 8,
          skillsLearned: 12,
          totalPoints: 15000
        }
      },
      {
        name: 'John Instructor',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor',
        stats: {
          examsCompleted: 18,
          certificatesEarned: 6,
          skillsLearned: 9,
          totalPoints: 12000
        }
      },
      {
        name: 'Jane Student',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
        stats: {
          examsCompleted: 12,
          certificatesEarned: 4,
          skillsLearned: 6,
          totalPoints: 8500
        }
      }
    ]);

    console.log('Creating skills...');
    const skills = await Skill.create([
      {
        title: 'Machine Learning Fundamentals',
        description: 'Master the core concepts of supervised and unsupervised learning',
        category: 'machine-learning',
        difficulty: 'Intermediate',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
        duration: '2-3 hours',
        popularity: 95
      },
      {
        title: 'Deep Neural Networks',
        description: 'Dive deep into neural network architectures and backpropagation',
        category: 'deep-learning',
        difficulty: 'Expert',
        topics: ['Neural Networks', 'Backpropagation', 'CNN', 'RNN'],
        duration: '4-5 hours',
        popularity: 88
      },
      {
        title: 'Natural Language Processing',
        description: 'Learn text processing, sentiment analysis, and language models',
        category: 'nlp',
        difficulty: 'Expert',
        topics: ['Text Processing', 'Transformers', 'BERT', 'GPT'],
        duration: '3-4 hours',
        popularity: 92
      },
      {
        title: 'Computer Vision Essentials',
        description: 'Explore image processing and object detection',
        category: 'computer-vision',
        difficulty: 'Intermediate',
        topics: ['Image Processing', 'Object Detection', 'CNN', 'OpenCV'],
        duration: '3-4 hours',
        popularity: 85
      }
    ]);

    console.log('Creating exams...');
    await Exam.create([
      {
        title: 'Machine Learning Fundamentals - Intermediate',
        skillName: 'Machine Learning',
        skill: skills[0]._id,
        category: 'Supervised Learning',
        difficulty: 'Intermediate',
        timeLimit: 45,
        passingScore: 70,
        creator: users[1]._id,
        questions: [
          {
            question: 'What is supervised learning?',
            options: [
              'Learning without labeled data',
              'Learning with labeled data',
              'Learning through trial and error',
              'Learning through clustering'
            ],
            correctAnswer: 1,
            explanation: 'Supervised learning uses labeled data to train models.'
          },
          {
            question: 'Which metric is best for imbalanced datasets?',
            options: [
              'Accuracy',
              'F1-Score',
              'Mean Squared Error',
              'R-squared'
            ],
            correctAnswer: 1,
            explanation: 'F1-Score balances precision and recall, making it ideal for imbalanced datasets.'
          }
        ]
      },
      {
        title: 'Deep Learning Neural Networks - Expert',
        skillName: 'Deep Learning',
        skill: skills[1]._id,
        category: 'Neural Networks',
        difficulty: 'Expert',
        timeLimit: 60,
        passingScore: 75,
        creator: users[1]._id,
        questions: [
          {
            question: 'What is backpropagation?',
            options: [
              'Forward pass through network',
              'Algorithm for training neural networks',
              'Data preprocessing technique',
              'Model evaluation method'
            ],
            correctAnswer: 1,
            explanation: 'Backpropagation is an algorithm used to train neural networks by computing gradients.'
          }
        ]
      }
    ]);

    console.log('Creating achievements...');
    await Achievement.create([
      {
        title: 'First Steps',
        description: 'Complete your first exam',
        category: 'milestone',
        points: 100,
        rarity: 'common',
        requirement: 'Complete 1 exam'
      },
      {
        title: 'Quick Learner',
        description: 'Score 90% or higher on your first exam',
        category: 'performance',
        points: 250,
        rarity: 'uncommon',
        requirement: 'Score 90%+ on first exam'
      },
      {
        title: 'ML Novice',
        description: 'Complete 5 Machine Learning exams',
        category: 'skill',
        points: 500,
        rarity: 'rare',
        requirement: 'Complete 5 ML exams'
      }
    ]);

    console.log('\n✓ Database seeded successfully!\n');
    console.log('Created:');
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Skills: ${skills.length}`);
    console.log('  - Exams: 2');
    console.log('  - Achievements: 3');

    console.log('\nTest Credentials:');
    console.log('  Admin: admin@example.com / password123');
    console.log('  Instructor: instructor@example.com / password123');
    console.log('  User: user@example.com / password123');

    console.log('\nNext steps:');
    console.log('  1. Open MongoDB Compass');
    console.log('  2. Connect to: mongodb://localhost:27017');
    console.log('  3. Select database: skill-forage');
    console.log('  4. Browse collections to see seeded data\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
