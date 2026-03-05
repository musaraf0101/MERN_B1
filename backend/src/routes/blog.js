import express from "express";
import {
  createBlogs,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.js";
import { verifyToken } from "./../middleware/verifyToken.js";

export const blogRouter = express.Router();

blogRouter.get("/", verifyToken, getAllBlogs);
blogRouter.get("/:id", verifyToken, getBlogById);
blogRouter.post("/", verifyToken, createBlogs);
blogRouter.put("/:id", verifyToken, updateBlog);
blogRouter.delete("/:id", verifyToken, deleteBlog);
