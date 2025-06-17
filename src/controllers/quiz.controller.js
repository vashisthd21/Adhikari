// import Quiz from "../models/quiz.model.js";
// import User from "../models/user.model.js"; // Required for finding user
// import asyncHandler from "../utils/asyncHandler.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";

// // 1. Create Quiz
// const createQuiz = asyncHandler(async (req, res) => {
//   const { title, questions, description, username } = req.body;
//   console.log("Request body:", req.body);
//   console.log("Username:", username);

//   if (!title || !description || !questions || !Array.isArray(questions)) {
//     throw new ApiError(400, "Title, description, and questions are required");
//   }

//   const user = await User.findOne({ username });
//   console.log("User found:", user);
//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const quiz = await Quiz.create({
//     title,
//     description,
//     questions,
//     createdBy: user._id
//   });

//   return res.status(201).json(new ApiResponse(201, quiz, "Quiz created"));
// });

// // 2. List all quizzes
// const getAllQuizzes = asyncHandler(async (req, res) => {
//   const quizzes = await Quiz.find({}, "title _id");
//   return res.json(new ApiResponse(200, quizzes));
// });

// // 3. Get quiz by ID (without correct answers)
// const getQuizById = asyncHandler(async (req, res) => {
//   const quiz = await Quiz.findById(req.params.id).lean();

//   if (!quiz) throw new ApiError(404, "Quiz not found");

//   const sanitizedQuestions = quiz.questions.map(q => ({
//     question: q.question,
//     options: q.options
//   }));

//   return res.json(new ApiResponse(200, {
//     _id: quiz._id,
//     title: quiz.title,
//     description: quiz.description,
//     questions: sanitizedQuestions
//   }));
// });

// // 4. Submit quiz and calculate result
// const submitQuiz = asyncHandler(async (req, res) => {
//   const quiz = await Quiz.findById(req.params.id).lean();
//   const { answers } = req.body; // e.g., ["Option A", "Option B", ...]

//   if (!quiz || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
//     throw new ApiError(400, "Invalid quiz or answers submitted");
//   }

//   let score = 0;

//   quiz.questions.forEach((q, i) => {
//     if (q.correctAnswer === answers[i]) score++;
//   });

//   return res.json(
//     new ApiResponse(200, {
//       totalQuestions: quiz.questions.length,
//       correctAnswers: score,
//       scorePercent: ((score / quiz.questions.length) * 100).toFixed(2) + "%"
//     }, "Quiz submitted")
//   );
// });

// export {
//   createQuiz,
//   getAllQuizzes,
//   getQuizById,
//   submitQuiz
// };

import Quiz from "../models/quiz.model.js";
import User from "../models/user.model.js"; // Make sure you import User
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import e from "express";

const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, questions, username } = req.body;

  if (!title || !description || !questions || !Array.isArray(questions)) {
    throw new ApiError(400, "Title, description, and questions are required");
  }

  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Create quiz with user._id as createdBy
  const quiz = await Quiz.create({
    title,
    description,
    questions,
    createdBy: user._id
  });

  return res.status(201).json(new ApiResponse(201, quiz, "Quiz created successfully"));
});
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  // Hide correct answers
  const filteredQuiz = {
    _id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    questions: quiz.questions.map(q => ({
      question: q.question,
      options: q.options
      // no correctAnswer here
    }))
  };

  return res.json(new ApiResponse(200, filteredQuiz));
});

export {
  createQuiz,
  getQuizById
  // Add other functions like getAllQuizzes and submitQuiz as needed
};
