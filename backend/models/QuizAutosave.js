import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
  question: { type: String },
  options: { type: [String] },
  correctOption: { type: Number },
});

const quizAutosaveSchema = new mongoose.Schema({
  adminId: { type: String },
  title: { type: String },
  questions: [questionSchema],
});
const QuizAutosave = mongoose.model("QuizAutosave", quizAutosaveSchema);
export default QuizAutosave;
