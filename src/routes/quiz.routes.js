import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
// import 
//   createQuiz
//   // getAllQuizzes,
//   // getQuizById,
//   // submitQuiz
// } from "../controllers/quiz.controller.js";
import {createQuiz,getQuizById} from "../controllers/quiz.controller.js";

const router = Router();

// Static routes
router.post("/create", verifyJWT, createQuiz);
router.get("/:id", verifyJWT, getQuizById);

// router.get("/", verifyJWT, getAllQuizzes);

// // More specific dynamic route first
// router.post("/:id/submit", verifyJWT, submitQuiz); // ✅ must come before ":id"
// router.get("/:id", verifyJWT, getQuizById);

export default router;
