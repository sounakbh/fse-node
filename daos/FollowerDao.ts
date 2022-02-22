import FollowerDaoI from "../interfaces/FollowerDaoI";
import FollowerModel from "../mongoose/followers/FollowerModel";
import Follower from "../models/followers/Follower";
export default class FollowerDao implements FollowerDaoI {
  private static followerDao: FollowerDao | null = null;
  public static getInstance = (): FollowerDao => {
    if (FollowerDao.followerDao === null) {
      FollowerDao.followerDao = new FollowerDao();
    }
    return FollowerDao.followerDao;
  };
  private constructor() {}

  followUser = async (follower: string, followee: string): Promise<Follower> =>
    FollowerModel.create({ followee: followee, follower: follower });
  unfollowUser = async (follower: string, followee: string): Promise<any> =>
    FollowerModel.deleteOne({ followee: followee, follower: follower });
  findFolloweesOfUser = async (uid: string): Promise<Follower[]> =>
    FollowerModel.find({ follower: uid });

  findFollowersOfUser = async (uid: string): Promise<Follower[]> =>
    FollowerModel.find({ followee: uid });
  findTopFollowedUsers = async (): Promise<Follower[]> => {
    return FollowerModel.aggregate([
      { $group: { _id: "$followee", count: { $sum: 1 } } },
    ])
      .sort({ count: -1 })
      .limit(5);
  };
  findAllFollowers = async (): Promise<Follower[]> => FollowerModel.find();
}
