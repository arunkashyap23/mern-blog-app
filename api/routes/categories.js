import express from "express";
import CategoryModel from "../models/Category.js";

const catRouter = express.Router();

catRouter.post("/", async (req, res) => {
  const newCat = new CategoryModel(req.body);
  try {
    const savedcat = await newCat.save();
    res.status(201).json(savedcat);
  } catch (error) {
    res.status(500).json(error);
  }
});

catRouter.get("/", async (req, res) => {
  try {
    const cats = await CategoryModel.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default catRouter;
