import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  };
  private constructor() {}

  userCreatesBookmark = async (tid: string, uid: string): Promise<any> =>
    BookmarkModel.create({ tuit: tid, bookmarkedBy: uid });
  userDeletesBookmark = async (tid: string, uid: string): Promise<any> =>
    BookmarkModel.deleteOne({ tuit: tid, bookmarkedBy: uid });
  findAllBookmarksByUser = async (uid: string): Promise<Bookmark[]> =>
    BookmarkModel.find({ uid: uid });

  //   findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
  //     LikeModel.find({ likedBy: uid }).populate("tuit").exec();
  //   userLikesTuit = async (uid: string, tid: string): Promise<any> =>
  //     LikeModel.create({ tuit: tid, likedBy: uid });
  //   userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
  //     LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
