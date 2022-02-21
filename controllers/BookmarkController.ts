/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {BookmarkDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return BookmarkController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();

      app.post(
        "api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userCreatesBookmark
      );
      app.delete(
        "api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userDeletesBookmark
      );
      app.get(
        "/api/users/:uid/bookmarks",
        BookmarkController.bookmarkController.findAllBookmarksByUser
      );

      // app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
      // app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
      // app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
      // app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
    }
    return BookmarkController.bookmarkController;
  };

  private constructor() {}
  userCreatesBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userCreatesBookmark(req.params.tid, req.params.uid)
      .then((bookmarks) => res.json(bookmarks))
      .catch((e) => console.log("Error!"));
  userDeletesBookmark = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .userDeletesBookmark(req.params.tid, req.params.uid)
      .then((bookmarks) => res.json(bookmarks));
  findAllBookmarksByUser = (req: Request, res: Response) =>
    BookmarkController.bookmarkDao
      .findAllBookmarksByUser(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));
  /**
   * Retrieves all users that liked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the liked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  // findAllUsersThatLikedTuit = (req: Request, res: Response) =>
  //     LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
  //         .then(likes => res.json(likes));

  /**
   * Retrieves all tuits liked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  // findAllTuitsLikedByUser = (req: Request, res: Response) =>
  //     LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
  //         .then(likes => res.json(likes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is liking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  // userLikesTuit = (req: Request, res: Response) =>
  //     LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
  //         .then(likes => res.json(likes));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is unliking
   * the tuit and the tuit being unliked
   * @param {Response} res Represents response to client, including status
   * on whether deleting the like was successful or not
   */
  // userUnlikesTuit = (req: Request, res: Response) =>
  //     LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
  //         .then(status => res.send(status));
}
