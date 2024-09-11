import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import QuizAutosave from "../models/QuizAutosave.js";
import Quizes from "../models/Quizes.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
function getAdminId(req) {
  const token = req.cookies?.adminJwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const adminId = decoded.adminId;
  return adminId;
}
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail)
    return res
      .status(400)
      .json({ message: "Hmm...that doesn't look like a valid email " });

  if (password.length < 4)
    return res
      .status(400)
      .json({ message: "Password must be at least 4 characters" });
  //if already exists
  const admin = await Admin.findOne({ email });
  if (admin) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    res.sendStatus(201);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail)
    return res
      .status(400)
      .json({ message: "Hmm...that doesn't look like a valid 'Email' " });

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json({ message: "No such user found" });
  } else {
    const isPasswordMatched = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatched) {
      return res.status(404).json({ message: "Incorrect credentials" });
    } else {
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("adminJwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        sameSite: "None",
      });

      res.status(200).json({ message: "Logged in successfully" });
    }
  }
};
export const isAuthenticated = (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
};

export const getAutoSave = async (req, res) => {
  const adminId = getAdminId(req);

  const savedData = await QuizAutosave.findOne({ adminId });

  if (!savedData) {
    const questions = [
      {
        question: "",
        options: [""],
        correctOption: 0,
      },
    ];
    const title = "";
    const data = { title, questions };
    return res.status(200).json({ message: data });
  }
  const title = savedData.title;
  const data = { title, questions: savedData.questions };
  return res.status(200).json({ message: data });
};
export const postAutoSave = async (req, res) => {
  const data = req.body;
  const adminId = getAdminId(req);

  const qas = await QuizAutosave.findOneAndUpdate(
    { adminId },
    { questions: data.questions, title: data.title },
    { upsert: true }
  );

  res.status(201).json({ message: "savde successfully" });
};
export const publishQuiz = async (req, res) => {
  // create unique link
  const data = req.body;

  const uniqueId = uuidv4();
  const adminId = getAdminId(req);
  const newQuiz = new Quizes({
    adminId,
    quizId: uniqueId,
    title: data.title,
    questions: data.questions,
  });

  await newQuiz.save();

  //remove the session from "auto-save" table
  await QuizAutosave.deleteOne({ adminId });
  const newUser = new User({
    adminId,
    quizId: uniqueId,
    title: data.title,
    users: [],
  });
  await newUser.save();
  res.status(201).json({ message: uniqueId });
};
export const quizReport = async (req, res) => {
  const adminId = getAdminId(req);
  //get all the users who have completed the test with given admin and quizid's
  const users = await User.find({ adminId });
  //get the total questions and total correct answers
  // console.log(users);
  let userData;
  let quizData;
  let totalData = [];
  users.forEach((user) => {
    const title = user.title;
    const quizId = user.quizId;
    quizData = {
      title,
      quizId,
    };
    let completedUsers = [];
    user.users.forEach((u) => {
      if (u.completed) {
        userData = {
          email: u.email,
          score: u.score,
          userName: u.userName,
        };
        completedUsers.push(userData);
      }
    });
    totalData.push({ quizData, completedUsers });
  });
  //get all the quiz ids,title,users who completd the quiz from User collection
  res.status(200).json({ totalData });
};
export const logout = (req, res) => {};
