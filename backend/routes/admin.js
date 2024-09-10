import express from "express";
const router = express.Router();
import authenticate from "../middlewares/auth.js";

import * as adminController from "../controllers/adminController.js";
router.post("/signup", adminController.signup);
router.post("/login", adminController.login);
router.get("/isAuthenticated", authenticate, adminController.isAuthenticated);
router.get("/logout", adminController.logout);
router.get("/auto-save", authenticate, adminController.getAutoSave);
router.post("/auto-save", authenticate, adminController.postAutoSave);
router.post("/publish", authenticate, adminController.publishQuiz);
router.get("/quiz-report", authenticate, adminController.quizReport);
export default router;
