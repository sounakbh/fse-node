import { Request, Response } from "express";

export default interface BookmarkControllerI {
  //   findAllUsersThatLikedTuit(req: Request, res: Response): void;
  //   findAllTuitsLikedByUser(req: Request, res: Response): void;
  //   userLikesTuit(req: Request, res: Response): void;
  //   userUnlikesTuit(req: Request, res: Response): void;
  userCreatesBookmark(req: Request, res: Response): void;
  userDeletesBookmark(req: Request, res: Response): void;
  findAllBookmarksByUser(req: Request, res: Response): void;
}
