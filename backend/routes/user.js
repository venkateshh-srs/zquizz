import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
// import userauth from "../middlewares/userauth.js";
router.get("/quiz/:id", userController.userQuiz);
router.post("/submit/:id", userController.quizSubmit);

export default router;
