import { Blog } from "../models/Blog.js";
import {
  createBlogsValidation,
  updateBlogsValidation,
} from "../validation/blogValidation.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (blogs.length < 0) {
      return res.status(200).json({
        message: "no blogs here",
      });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: blog._id,
        title: blog.title,
        description: blog.description,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBlogs = async (req, res) => {
  try {
    const { title, description } = req.body;

    const { error } = createBlogsValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const blogs = await Blog.create({ title, description });

    res.status(201).json({
      success: true,
      message: "new blog created",
      data: {
        title: blogs.title,
        description: blogs.description,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const { error } = updateBlogsValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const updatedBlogs = {};

    if (title !== undefined) updatedBlogs.title = title;
    if (description !== undefined) updatedBlogs.description = description;

    // if(req.body.title !== undefined) updatedBlogs.title = req.body.title

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogs, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "update success",
      data: {
        title: updatedBlog.title,
        description: updatedBlog.description,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blogs = await Blog.findByIdAndDelete(id);

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "delete success",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
