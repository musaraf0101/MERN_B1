import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DBConnection from "./src/config/db.js";
import { blogRouter } from "./src/routes/blog.js";
import { userRouter } from "./src/routes/user.js";

// const express = require("express");
// const dotenv = require("dotenv").config()

dotenv.config();

DBConnection();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/blog", blogRouter);
app.use("/api/auth", userRouter);

app.listen(3001, () => {
  console.log("server is running");
});
