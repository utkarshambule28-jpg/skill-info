import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['machine-learning', 'deep-learning', 'nlp', 'computer-vision', 'reinforcement-learning'],
    default: 'machine-learning'
  },
  difficulty: {
    type: String,
    enum: ['Novice', 'Intermediate', 'Expert', 'Master'],
    default: 'Intermediate'
  },
  topics: [String],
  duration: String,
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Skill', skillSchema);
