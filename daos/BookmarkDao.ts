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
    BookmarkModel.find({ bookmarkedBy: uid });

  findAllBookmarks = async (): Promise<any> => BookmarkModel.find();

  findLatestBookmarksByUser = async (uid: String): Promise<Bookmark[]> =>
    BookmarkModel.find({ bookmarkedBy: uid }).sort({ bookmarkedAt: -1 });
}
