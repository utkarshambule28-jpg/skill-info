export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/skill-forage',
  jwtSecret: process.env.JWT_SECRET || 'da6a06e7d01046bf5cef005ea835d82d',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  openaiKey: process.env.OPENAI_API_KEY || "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",
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  corsOptions: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
};
