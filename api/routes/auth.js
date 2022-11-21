import express from "express";
import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkUserAuth from "./userAuth.js";

const authRouter = express.Router();

//Register
authRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //we need to encrypt our password by using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashPass,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await UserModel.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.username === username && isMatch) {
        try {
          //generate jwt token
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
          );
          res.status(200).json({
            status: "success",
            message: "login success",
            id: user._id,
            username: user.username,
            token: token,
            profilePic: user.profilePic,
          });
        } catch (error) {
          res
            .status(500)
            .send({ status: "error", message: "login process failed" });
        }
      } else {
        res
          .status(500)
          .send({ status: "error", message: "check your credentials again" });
      }
    } else {
      res
        .status(500)
        .send({ status: "error", message: "user is not registered" });
    }
  } else {
    res
      .status(500)
      .send({ status: "error", message: "all fields are required" });
  }
});

//get logged in user data
authRouter.get("/logged-in-user", checkUserAuth, async (req, res) => {
  res.send({ user: req.user });
});

export default authRouter;
