import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import catRouter from "./routes/categories.js";
import multer from "multer";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

//configuring dotenv file
dotenv.config();

const app = express();
const port = process.env.PORT;
const db = process.env.DATABASE_URL;

//config json file
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors
app.use(cors());

//make image folder public
app.use("/images", express.static(path.join(__dirname, "/images")));

//connect db
connectDB(db);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

//load routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/category", catRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
