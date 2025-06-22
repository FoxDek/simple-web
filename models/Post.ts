import mongoose, { Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  createdAt: Date;
  author: mongoose.Types.ObjectId;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
