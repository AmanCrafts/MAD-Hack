import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Programming", "Aptitude", "General", "Other"],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    estimatedReadTime: {
      type: Number,
      required: true,
    },
    contentBody: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
