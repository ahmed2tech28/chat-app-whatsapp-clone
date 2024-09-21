import mongoose, { Model } from "mongoose";

interface IMessage {
  sender: mongoose.Schema.Types.ObjectId;
  reciever: mongoose.Schema.Types.ObjectId | null;
  message: string;
}

const schema = new mongoose.Schema<IMessage>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", schema);

export default MessageModel;
