const Chat = require("../models/history");
const Message = require("../models/message");

exports.createMessage = async (req, res) => {
  try {
    const { userContent, responseContent, historyId } = req.body;
    const userId = req.user.userId;

    if (!userContent || responseContent === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let finalHistoryId = historyId;
    let contentType = "text";
    let processedContent = responseContent;

    if (
      typeof responseContent === "object" &&
      responseContent.type === "recipe"
    ) {
      contentType = "recipe";

      if (
        !responseContent.name ||
        !Array.isArray(responseContent.ingredients)
      ) {
        return res.status(400).json({ message: "Invalid recipe format" });
      }
    }

    if (!finalHistoryId) {
      const historyName =
        userContent.length > 30
          ? userContent.substring(0, 30) + "..."
          : userContent;

      const newHistory = await Chat.create({
        name: historyName,
        userId,
      });
      finalHistoryId = newHistory._id;
    }

    const message = await Message.create({
      userContent,
      responseContent: processedContent,
      contentType,
      userId,
      historyId: finalHistoryId,
    });

    res.status(201).json({
      message: "Message created successfully",
      data: {
        message,
        historyId: finalHistoryId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMessages = async (req, res) => {
  try {
    const { historyId } = req.params;
    if (!historyId) {
      return res.status(400).json({
        message: "ID is required",
      });
    }

    const messages = await Message.find({
      historyId,
    }).populate("userId", "name email");
    if (!messages || messages.length === 0) {
      return res.status(404).json({
        message: "No messages found",
      });
    }
    res.status(200).json({
      message: "messages fetched succesfully",
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
