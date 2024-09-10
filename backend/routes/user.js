import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import userauth from "../middlewares/userauth.js";
router.post("/quiz/auto-save/:id", userauth, userController.userQuizAutoSave);
router.post("/quiz/:id", userController.userLogin);
router.get("/quiz/:id", userauth, userController.userQuiz);
router.post("/submit/:id", userauth, userController.quizSubmit);

export default router;
