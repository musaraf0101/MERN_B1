import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies?.token ||
      (authHeader ? authHeader.replace("Bearer ", "") : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "no token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
  }
};
