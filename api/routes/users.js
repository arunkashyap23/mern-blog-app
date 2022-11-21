import express from "express";
import UserModel from "../models/Users.js";
import bcrypt from "bcrypt";
import PostModel from "../models/Post.js";
import checkUserAuth from "./userAuth.js";

const userRouter = express.Router();

//update
userRouter.put("/:id", checkUserAuth, async (req, res) => {
  if (req.user.id === req.params.id) {
    //if there is a password in the req body then we should encrypt it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        message: "user updated successfully",
        id: updatedUser._id,
        username: updatedUser.username,
        profilePic: updatedUser.profilePic,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("you can update only your account");
  }
});

//delete
userRouter.delete("/:id", checkUserAuth, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      try {
        await PostModel.deleteMany({ userId: user._id });
        await UserModel.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({ status: "success", message: "user updated successfully" });
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("user not found");
    }
  } else {
    res.status(401).json("you can delete only your account");
  }
});

//get user
userRouter.get("/:id", checkUserAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default userRouter;
