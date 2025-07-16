const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Chat", ChatSchema);
