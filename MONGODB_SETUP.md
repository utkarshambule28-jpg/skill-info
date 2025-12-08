# MongoDB Setup Guide for Skill Forge

## Prerequisites
- MongoDB installed locally (version 4.4+)
- MongoDB Compass installed
- Node.js and npm installed

## Step 1: Start MongoDB Locally

### Windows
```bash
# Using MongoDB Community Server
mongod
```

### macOS (using Homebrew)
```bash
brew services start mongodb-community
```

### Linux (Ubuntu)
```bash
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
mongo --version
```

## Step 2: Configure Backend Environment

The `.env` file in `/server` directory is already configured:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skill-forage
JWT_SECRET=da6a06e7d01046bf5cef005ea835d82d
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Step 3: Seed the Database

Populate MongoDB with initial data:
```bash
npm run seed
```

Output will show:
```
Database seeded successfully!
Users created: 3
Skills created: 4
Sample credentials:
  Admin: admin@example.com / password123
  Instructor: instructor@example.com / password123
  User: user@example.com / password123
```

## Step 4: View Data in MongoDB Compass

1. **Open MongoDB Compass**
2. **Connect to Local Instance:**
   - Click "Connect" button
   - Default URI: `mongodb://localhost:27017`
   - Click "Connect"

3. **Browse Your Database:**
   - In the left sidebar, find database: `skill-forage`
   - Expand it to see all collections:
     - `users` - Contains user profiles with hashed passwords
     - `skills` - Learning skills with descriptions and difficulty
     - `exams` - Exams with questions and answers
     - `achievements` - Achievement badges and rewards
     - `userachievements` - User progress on achievements
     - `certificates` - Earned certificates
     - `examresults` - Exam attempt results
     - `leaderboards` - User rankings

4. **View User Credentials:**
   - Click on `users` collection
   - You'll see 3 documents with:
     - `_id` (MongoDB ID)
     - `name` (User name)
     - `email` (Login email)
     - `password` (Bcrypt hashed - not readable)
     - `role` (admin, instructor, user)
     - `stats` (exam stats and points)

## Sample User Data in MongoDB

### Admin User
```json
{
  "_id": ObjectId(...),
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$...", // Bcrypt hashed
  "role": "admin",
  "stats": {
    "examsCompleted": 25,
    "certificatesEarned": 8,
    "skillsLearned": 12,
    "totalPoints": 15000
  },
  "createdAt": ISODate("2024-...")
}
```

### Instructor User
```json
{
  "_id": ObjectId(...),
  "name": "John Instructor",
  "email": "instructor@example.com",
  "password": "$2a$10$...", // Bcrypt hashed
  "role": "instructor",
  "stats": {
    "examsCompleted": 18,
    "certificatesEarned": 6,
    "skillsLearned": 9,
    "totalPoints": 12000
  },
  "createdAt": ISODate("2024-...")
}
```

### Student User
```json
{
  "_id": ObjectId(...),
  "name": "Jane Student",
  "email": "user@example.com",
  "password": "$2a$10$...", // Bcrypt hashed
  "role": "user",
  "stats": {
    "examsCompleted": 12,
    "certificatesEarned": 4,
    "skillsLearned": 6,
    "totalPoints": 8500
  },
  "createdAt": ISODate("2024-...")
}
```

## Step 5: Start the Backend Server

```bash
npm run server
```

Output:
```
MongoDB Connected: localhost
[2024-...] [INFO] Server running on port 5000 {
  "environment": "development",
  "mongodbUri": "mongodb://localhost:27017/skill-forage",
  "clientUrl": "http://localhost:5173"
}
```

## Collection Structure

### Users Collection
- `name` - User full name
- `email` - Email address (unique)
- `password` - Bcrypt hashed password
- `role` - user, instructor, or admin
- `avatar` - Profile picture URL
- `bio` - User biography
- `stats` - Performance metrics
- `createdAt` - Registration timestamp

### Skills Collection
- `title` - Skill name
- `description` - Detailed description
- `category` - machine-learning, deep-learning, nlp, etc.
- `difficulty` - Novice, Intermediate, Expert, Master
- `topics` - Related topics
- `duration` - Estimated learning time
- `popularity` - Popularity score (0-100)
- `isActive` - Active status

### Exams Collection
- `title` - Exam name
- `skillName` - Associated skill
- `difficulty` - Exam difficulty level
- `questions` - Array of questions with options
- `timeLimit` - Minutes allowed
- `passingScore` - Required percentage to pass
- `creator` - Instructor who created exam
- `status` - active, draft, archived
- `attempts` - Total attempts count
- `averageScore` - Average score across attempts

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB service is running: `mongod`
- Check MONGODB_URI in `.env` is correct
- Verify MongoDB is listening on port 27017

**No Data in Compass**
- Run `npm run seed` to populate data
- Refresh MongoDB Compass after seeding

**Password Not Visible**
- Passwords are bcrypt hashed for security
- In Compass, passwords appear as long strings like `$2a$10$...`
- This is normal and secure

## Next Steps

1. Start the development server: `npm run dev`
2. Start the backend: `npm run server` (in another terminal)
3. Login with one of the test credentials
4. Monitor database changes in MongoDB Compass in real-time

