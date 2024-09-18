import User from "../models/User.js";
import Quizes from "../models/Quizes.js";
import jwt from "jsonwebtoken";

export const userQuiz = async (req, res) => {
  // console.log("Getting saved quiz details..");

  const quizId = req.params.id;
  const quiz = await Quizes.findOne({ quizId });
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  let currState = [];
  for (let i = 0; i < quiz.questions.length; i++) {
    currState.push({
      question: quiz.questions[i].question,
      options: quiz.questions[i].options,
    });
  }
  // console.log("Successfully given saved quiz details..");
  return res.status(200).json({
    title: quiz.title,
    message: currState,
  });
};
export const quizSubmit = async (req, res) => {
  // console.log(req.body);
  //put in User table
  // console.log("Quiz submit initalized..");

  const quizId = req.params.id;
  let score = 0;

  let selectedOptions = req.body;
  console.log(selectedOptions);

  const quiz = await Quizes.findOne({ quizId });

  // console.log(existingUsers);
  let correctOptions = [];
  for (let i = 0; i < selectedOptions.length; i++) {
    score += selectedOptions[i] === quiz.questions[i].correctOption;
    correctOptions.push(quiz.questions[i].correctOption);
  }

  res.status(200).json({
    score,
    selectedOptions,
    correctOptions,
  });
};
