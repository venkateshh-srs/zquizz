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

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const port = 3000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("hello world...");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
