import { User } from "./../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/userValidation.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = registerUserValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashPassword });

    res.status(201).json({
      success: true,
      message: "new user created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginUserValidation(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const isValid = await User.findOne({ email }).select("+password");

    if (!isValid) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, isValid.password);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    const token = jwt.sign({ id: isValid._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "login success",
      data: {
        email: isValid.email,
        id: isValid._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "logout success",
    });
  } catch (error) {
    console.log(error);
  }
};
