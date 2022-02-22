import mongoose, { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    bookmarkedAt: { type: Date, default: Date.now },
  },
  { collection: "bookmarks" }
);
export default BookmarkSchema;
