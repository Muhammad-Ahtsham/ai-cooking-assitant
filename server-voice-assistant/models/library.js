const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.ObjectId, ref: "Message", required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Library", librarySchema);
