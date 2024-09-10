import mongoose from "mongoose";
import { questionSchema } from "./QuizAutosave.js";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  questionStates: [
    {
      selectedOption: { type: Number, defaultValue: null },
    },
  ],
  score: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

const quizSchema = new mongoose.Schema({
  adminId: { type: String },
  quizId: { type: String },
  title: { type: String },

  users: [userSchema],
});

const User = mongoose.model("User", quizSchema);
export default User;
