import mongoose, { Schema } from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>(
  {
    sender: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
    receiver: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
    messageBody: {
      type: String,
      required: true,
      default: `Test Message sent at ${Date.now}`,
    },
    sentOn: { type: Date, required: true, default: Date.now() },
  },
  { collection: "messages" }
);
export default MessageSchema;
