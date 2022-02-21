import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface BookmarkDaoI {
  //   findAllUsersThatLikedTuit(tid: string): Promise<Bookmark[]>;
  //   findAllTuitsLikedByUser(uid: string): Promise<Bookmark[]>;
  //   userUnlikesTuit(tid: string, uid: string): Promise<any>;
  //   userLikesTuit(tid: string, uid: string): Promise<Bookmark>;

  userCreatesBookmark(tid: string, uid: string): Promise<Bookmark>;
  userDeletesBookmark(tid: string, uid: string): Promise<Bookmark>;
  findAllBookmarksByUser(uid: string): Promise<Bookmark[]>;
}
