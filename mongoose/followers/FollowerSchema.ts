import mongoose, { Schema } from "mongoose";
import Follower from "../../models/followers/Follower";

const FollowerSchema = new mongoose.Schema<Follower>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "UserModel" },
    followee: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "followers" }
);
export default FollowerSchema;
