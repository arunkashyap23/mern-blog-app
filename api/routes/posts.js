import express from "express";
import PostModel from "../models/Post.js";
import checkUserAuth from "./userAuth.js";

const postRouter = express.Router();

//create post
postRouter.post("/", checkUserAuth, async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res
      .status(200)
      .json({ status: "success", message: "Post has been created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update post
postRouter.put("/:id", checkUserAuth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res
          .status(200)
          .json({ status: "success", message: "Post has been updated" });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete post
postRouter.delete("/:id", checkUserAuth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    console.log(post);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res
          .status(200)
          .json({ status: "success", message: "Post has been deleted" });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all post
postRouter.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await PostModel.find({ username });
    } else if (catName) {
      posts = await PostModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await PostModel.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default postRouter;
