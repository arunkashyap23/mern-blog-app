import UserModel from "../models/Users.js";
import jwt from "jsonwebtoken";

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //get user from userId
      req.user = await UserModel.findById(userId).select("-password");
      next();
    } catch (error) {
      res.status(500).send({ status: "error", message: "unauthorized user" });
    }
  }

  if (!token) {
    res.status(500).send({ status: "error", message: "no token" });
  }
};

export default checkUserAuth;
