/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>followers</li>
 *     <li>messages</li>
 *
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, { Request, Response } from "express";
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowerController from "./controllers/FollowerController";
import MessageController from "./controllers/MessageController";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://sounak:newpassword@cluster0.pnwbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((_) => console.log("Connected Successfully!"))
  .catch((_) => console.log("Auth Failed!"));

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Welcome!"));

app.get("/add/:a/:b", (req: Request, res: Response) =>
  res.send(req.params.a + req.params.b)
);

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const followerController = FollowerController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
