// import { logger } from '../utils/logger.js';

// const getHelpfulResponse = (userMessage) => {
//   const message = userMessage.toLowerCase();

//   if (message.includes('exam') || message.includes('test')) {
//     return 'I can help you with exams! You can generate exams based on specific skills, track your exam history, and view your results. Would you like to create a new exam or view your past exams?';
//   }

//   if (message.includes('skill') || message.includes('learn')) {
//     return 'Great question! Browse through our skill catalog to discover topics you want to master. You can track your progress, earn achievements, and see detailed analytics on your learning journey.';
//   }

//   if (message.includes('certificate')) {
//     return 'Certificates are earned by completing exams and demonstrating your knowledge. Once you pass an exam, your certificate is available for download and sharing. Check your certificates page to see all your achievements!';
//   }

//   if (message.includes('leaderboard') || message.includes('rank')) {
//     return 'The leaderboard shows the top learners in our community. You can compare your progress with others and see how you rank. Keep learning to climb the leaderboard!';
//   }

//   if (message.includes('profile') || message.includes('account')) {
//     return 'Your profile shows all your learning stats, skills, and achievements. You can update your information, track your progress, and see personalized recommendations for skills to learn next.';
//   }

//   if (message.includes('how') || message.includes('help') || message.includes('?')) {
//     return 'I\'m here to help! You can ask me about:\n• Taking exams\n• Learning new skills\n• Getting certificates\n• Checking leaderboards\n• Your profile and progress\n\nWhat would you like to know?';
//   }

//   return 'That\'s a great question! I\'m here to help you learn and succeed. Can you tell me more about what you\'re looking for? You can ask about exams, skills, certificates, or your progress.';
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { message, userId } = req.body;

//     if (!message || message.trim() === '') {
//       return res.status(400).json({
//         success: false,
//         error: 'Message cannot be empty',
//       });
//     }

//     logger.info('Chatbot message received', { userId, message });

//     const botResponse = getHelpfulResponse(message);

//     return res.status(200).json({
//       success: true,
//       data: {
//         message: botResponse,
//         timestamp: new Date(),
//       },
//     });
//   } catch (error) {
//     logger.error('Chatbot error', { error: error.message });
//     return res.status(500).json({
//       success: false,
//       error: 'Failed to process message',
//     });
//   }
// };

import OpenAI from "openai";
import { logger } from "../utils/logger.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Message cannot be empty",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OpenAI API key not configured",
      });
    }

    logger.info("Chatbot message received", { userId, message });

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Skillexa AI — an intelligent, friendly, guidance-focused assistant for the Skillexa learning platform.

Your goal is to help users:
- Understand how Skillexa works
- Navigate features like Skills, Exams, Certificates, Achievements, Leaderboard
- Provide learning guidance
- Explain exam generation, analytics, and personalized progress
- Troubleshoot simple errors and guide users clearly

ABOUT THE PLATFORM:
Skillexa is an AI-powered learning and exam platform offering:
1. Skills Library: Users explore skills, each with descriptions, complexity level, and learning paths. Users can generate exams from skills.
2. Exam Generator & Exam Interface: Auto-generates MCQ-based exams from selected skills, tracks score, difficulty, question patterns, ends with results & improvement feedback.
3. Certificates: Auto-generated after completing exams, includes name, exam title, date, instructor signature, download available.
4. Achievements System: Users unlock badges based on progress (Fast Learner, Consistent Streak, Skill Master).
5. Analytics Dashboard: Shows user performance, progress, accuracy, time spent, skill mastery.
6. Leaderboard: Shows top learners based on points, performance, and achievements.
7. User Roles: Student (takes exams, earns certificates & achievements), Instructor (creates exams, reviews performance), Admin (manages users, skills, exams, system analytics).

HOW YOU RESPOND:
- Be clear, helpful, positive, and conversational.
- When explaining features, ALWAYS relate them to actual Skillexa functionality.
- When users ask general questions (like AI, skills, certificates), give platform-specific answers.
- When users ask about errors, explain gently and provide steps to fix.
- Keep responses short unless user asks for details.
- Never hallucinate features that do not exist.
- If user asks something outside the platform (math, essays, normal questions), you may answer normally.

EXAMPLES OF GOOD RESPONSES:
User: “How do I generate an exam?”
Assistant: “Go to the Skills page → choose a skill → click ‘Generate Exam’. Skillexa will create a custom exam based on difficulty, learning level, and recent activity.”
User: “Where can I see my certificates?”
Assistant: “Open the Certificates page from your dashboard. All earned certificates can be viewed or downloaded there.”
User: “Why is my exam score low?”
Assistant: “You might have struggled with higher difficulty questions. Check your Analytics page for topic-wise accuracy and recommended skills to improve.”
User: “Who can access the Admin Panel?”
Assistant: “Only admin users can access it. They manage users, exams, and system configurations.”

PERSONALITY:
Friendly, encouraging, smart, structured, and proactive.
Your purpose: Help users learn, guide them through the platform, and make their experience smooth.`
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const botReply = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      data: {
        message: botReply,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    logger.error("Chatbot error", { error: error.message });

    return res.status(500).json({
      success: false,
      error: "Failed to process message",
    });
  }
};

