import User from "../models/User.js";
import Quizes from "../models/Quizes.js";
import jwt from "jsonwebtoken";
export const userLogin = async (req, res) => {
  //   const {}
  // console.log("Logging in...");

  const quizId = req.params.id;
  const { email, userName } = req.body;
  if (!email || !userName) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail)
    return res
      .status(400)
      .json({ message: "Hmm...that doesn't look like a valid 'Email' " });

  // search quiz id
  // const users = await User.findOne({ quizId });
  // console.log(users);
  const quiz = await Quizes.findOne({ quizId });

  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  const token = jwt.sign({ email }, process.env.JWT_USER_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    sameSite: "None",
  });
  // console.log("Token is given");

  const existingUsers = await User.findOne({ quizId });
  // console.log(existingUsers);

  const questionStates = quiz.questions.map((q, ind) => {
    return { selectedOption: null };
  });
  const userIndex = existingUsers.users.findIndex(
    (user) => user.email === email
  );
  if (userIndex !== -1) {
    //user email already exists,so just check if the username matches or not
    if (existingUsers.users[userIndex].userName !== userName) {
      return res.status(400).json({ message: "Incorrect username" });
    }
  }
  //new usr
  existingUsers.users.push({ userName, email, questionStates });
  await existingUsers.save();
  return res
    .status(200)
    .json({ message: "User inserted and not the first user" });
  // }

  //  if user is there in that quiz ,give quiz current state from user

  // if not give from quiz table and start storing it in user table
};
export const userQuizAutoSave = async (req, res) => {
  // console.log("Autosave start...");
  const selectedOptions = req.body;
  const quizId = req.params.id;
  let existingUsers;
  // console.log(selectedOptions);
  try {
    const exu = await User.findOne({ quizId });
    existingUsers = exu;
  } catch (err) {
    console.log(err.message);
  }
  const token = req.cookies?.jwt;

  const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);

  const email = decoded.email;
  existingUsers?.users.forEach((user) => {
    if (user.email === email) {
      for (let i = 0; i < selectedOptions.length; i++) {
        user.questionStates[i].selectedOption = selectedOptions[i];
      }
    }
  });
  await existingUsers?.save();
  // console.log("Autosave succesfull");

  return res.status(200).json({ message: "user quiz auto saved successfully" });
};
export const userQuiz = async (req, res) => {
  // console.log("Getting saved quiz details..");

  const quizId = req.params.id;
  const quiz = await Quizes.findOne({ quizId });
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  //get email from jwt

  const existingUsers = await User.findOne({ quizId });
  const token = req.cookies?.jwt;
  // console.log(token);

  const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
  const email = decoded.email;
  // console.log(email);
  const userIndex = existingUsers.users.findIndex(
    (user) => user.email === email
  );

  if (userIndex === -1) {
    //user is authenticated but he dosent belong to this quiz
    //send him to login page with this quiz id
    return res.status(403).json({ message: "Unauthorized" });
  }
  //give user his current state
  let currState = [];
  for (let i = 0; i < quiz.questions.length; i++) {
    currState.push({
      question: quiz.questions[i].question,
      options: quiz.questions[i].options,
      selectedOption:
        existingUsers.users[userIndex].questionStates[i].selectedOption,
    });
  }
  // console.log("Successfully given saved quiz details..");
  return res.status(200).json({
    title: quiz.title,
    message: currState,
    completed: existingUsers.users[userIndex].completed,
    score: existingUsers.users[userIndex].score,
    userName: existingUsers.users[userIndex].userName,
    email: existingUsers.users[userIndex].email,
  });
};
export const quizSubmit = async (req, res) => {
  // console.log(req.body);
  //put in User table
  // console.log("Quiz submit initalized..");

  const quizId = req.params.id;
  let score = 0;
  //if no quizId return 404

  //else
  // console.log(req.body);

  let selectedOptions = req.body;

  const quiz = await Quizes.findOne({ quizId });
  const existingUsers = await User.findOne({ quizId });
  const token = req.cookies?.jwt;
  const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
  const email = decoded.email;
  const userIndex = existingUsers.users.findIndex(
    (user) => user.email === email
  );
  if (userIndex === -1) {
    //no such user exist
  } else {
    // console.log(existingUsers);
    for (let i = 0; i < selectedOptions.length; i++) {
      score += selectedOptions[i] === quiz.questions[i].correctOption;
    }

    existingUsers.users[userIndex].score = score;
    existingUsers.users[userIndex].completed = true;
  }
  await existingUsers.save();
  console.log("Submitted successfully");

  res.status(200).json({
    message: score,
  });
};
