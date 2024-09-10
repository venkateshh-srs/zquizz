import mongoose from "mongoose";
import { questionSchema } from "./QuizAutosave.js";

const QuizesSchema = new mongoose.Schema({
  adminId: { type: String },
  quizId: { type: String },
  title: { type: String },
  questions: [questionSchema],
});
const Quizes = mongoose.model("Quizes", QuizesSchema);
export default Quizes;
