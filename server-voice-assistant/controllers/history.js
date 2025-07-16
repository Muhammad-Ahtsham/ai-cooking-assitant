const Chat = require("../models/history");
const Message = require("../models/message");
exports.getHistory = async (req, res) => {
  try {
    const chat = await Chat.find({ userId: req.user.userId });
    if (!chat) {
      return res.status(404).json({
        message: "No chat find",
      });
    }
    res.status(200).json({
      message: chat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createHistory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    if (!name) {
      res.status(401).json({
        message: "please provide the chat name",
      });
    }
    const chat = await Chat.create({
      name,
      userId,
    });
    res.status(201).json({
      message: "chat is created",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.historyDelete = async (req, res) => {
  const historyId = req.params.id;
  if (!historyId) {
    return res.status(400).json({
      message: "History ID is required",
    });
  }
  const message = await Message.find({ historyId });
  message.forEach(async (msg) => {
    await Message.findByIdAndDelete(msg._id);
  });
  const chat = await Chat.findById(historyId);
  if (!chat) {
    return res.status(404).json({
      message: "History not found",
    });
  }
  await Chat.findByIdAndDelete(historyId);
  res.status(200).json({
    message: "History deleted successfully",
  });
};
