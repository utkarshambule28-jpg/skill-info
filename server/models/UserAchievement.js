import mongoose from 'mongoose';

const userAchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
  },
  unlockedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['locked', 'in_progress', 'unlocked'],
    default: 'in_progress'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userAchievementSchema.index({ user: 1, achievement: 1 }, { unique: true });

export default mongoose.model('UserAchievement', userAchievementSchema);
