import { logger } from '../utils/logger.js';

const getHelpfulResponse = (userMessage) => {
  const message = userMessage.toLowerCase();

  if (message.includes('exam') || message.includes('test')) {
    return 'I can help you with exams! You can generate exams based on specific skills, track your exam history, and view your results. Would you like to create a new exam or view your past exams?';
  }

  if (message.includes('skill') || message.includes('learn')) {
    return 'Great question! Browse through our skill catalog to discover topics you want to master. You can track your progress, earn achievements, and see detailed analytics on your learning journey.';
  }

  if (message.includes('certificate')) {
    return 'Certificates are earned by completing exams and demonstrating your knowledge. Once you pass an exam, your certificate is available for download and sharing. Check your certificates page to see all your achievements!';
  }

  if (message.includes('leaderboard') || message.includes('rank')) {
    return 'The leaderboard shows the top learners in our community. You can compare your progress with others and see how you rank. Keep learning to climb the leaderboard!';
  }

  if (message.includes('profile') || message.includes('account')) {
    return 'Your profile shows all your learning stats, skills, and achievements. You can update your information, track your progress, and see personalized recommendations for skills to learn next.';
  }

  if (message.includes('how') || message.includes('help') || message.includes('?')) {
    return 'I\'m here to help! You can ask me about:\n• Taking exams\n• Learning new skills\n• Getting certificates\n• Checking leaderboards\n• Your profile and progress\n\nWhat would you like to know?';
  }

  return 'That\'s a great question! I\'m here to help you learn and succeed. Can you tell me more about what you\'re looking for? You can ask about exams, skills, certificates, or your progress.';
};

export const sendMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
    }

    logger.info('Chatbot message received', { userId, message });

    const botResponse = getHelpfulResponse(message);

    return res.status(200).json({
      success: true,
      data: {
        message: botResponse,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    logger.error('Chatbot error', { error: error.message });
    return res.status(500).json({
      success: false,
      error: 'Failed to process message',
    });
  }
};
