const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    audience: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      enum: ["draft", "sent", "deleted"],
      default: "draft",
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    sentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
