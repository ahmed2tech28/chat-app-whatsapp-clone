import mongoose, { Model } from "mongoose";

interface IMessage {
  from: string;
  to: string | null;
  message: string;
}

const schema = new mongoose.Schema<IMessage>(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
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
