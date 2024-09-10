import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
dotenv.config({ path: "./.env" });
const dbString = process.env.DB_URL;

mongoose.connect(dbString);
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb atlas");
});
const app = express();
const port = 3000;
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
// app.get("/quiz/:id", async (req, res) => {
//   //if admin show preview
//   const quizId = req.params.id;
//   const quiz = await Quizes.findOne({ quizId });
//   if (!quiz) {
//     return res.status(404).json({ message: "Quiz not found" });
//   }
//   const questions = quiz.questions;
//   res.status(200).json({ message: questions });
// });

app.listen(port, () => {
  console.log("Listening on port " + port);
});
