// import axios from "axios";

// const API_URL = "http://localhost:5000";

// // ----------------------------------------
// // CREATE EXAM (AI generated)
// // ----------------------------------------
// export const createExam = async (data, token) => {
//   return axios.post(
//     `${API_URL}/api/exam/generate`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

// // ----------------------------------------
// // SUBMIT EXAM
// // ----------------------------------------
// export const submitExamResult = async (examId, data, token) => {
//   return axios.post(
//     `${API_URL}/api/exam/${examId}/submit`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

// // ----------------------------------------
// // USER RECENT RESULTS
// // ----------------------------------------
// export const getUserExamResults = async (token) => {
//   return axios.get(
//     `${API_URL}/api/exam/user/results`,
//     {
//       headers: { Authorization: `Bearer ${token}` }
//     }
//   );
// };

// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // or process.env.VITE_API_URL
  withCredentials: true
});

export const createExam = (data, token) => {
  // Use /api/exams/generate for AI generation
  return api.post('/api/exams/generate', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const submitExamResult = (examId, data, token) => {
  return api.post(`/api/exams/${examId}/submit`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const getUserExamResults = (token) => {
  return api.get('/api/exams/user/results', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default api;

