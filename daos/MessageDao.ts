import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  };
  private constructor() {}

  createMessage = async (
    sender: string,
    receiver: string,
    message: Message
  ): Promise<Message> =>
    MessageModel.create({ sender, receiver, messageBody: message.messageBody });
  deleteMessage = async (sender: string, mid: string): Promise<any> =>
    MessageModel.deleteOne({ sender, _id: mid });
  findMessagesSentByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ sender: uid });
  findMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ receiver: uid });
  findRecentMessagesOfUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ receiver: uid }).sort({ sentOn: -1 }).limit(5);
  findAllMessages = async (): Promise<Message[]> => MessageModel.find();
}
