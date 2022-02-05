import TuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * Implements Data Access Object managing data storage
 * of Tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}

  createTuit = async (tuit: Tuit): Promise<Tuit> => TuitModel.create(tuit);
  findAllTuits = async (): Promise<Tuit[]> => TuitModel.find();
  findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid });
  findTuitById = async (tid: string): Promise<any> => TuitModel.findById(tid);
  updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: uid }, { $set: tuit });
  deleteTuit = async (uid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: uid });
}
