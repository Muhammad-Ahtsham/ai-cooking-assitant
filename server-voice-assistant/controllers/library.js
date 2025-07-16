const Library = require("../models/library");

exports.getLibraryitem = async (req, res) => {
  try {
    const library = await Library.find({ userId: req.user.userId }).populate("itemId")

    res.status(200).json({
      message: library,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.addTolibrary = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({
        message: "item id is required",
      });
    }
    await Library.create({
      itemId,
      userId: req.user.userId,
    });
    res.status(201).json({
      message: "library item created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteLibrary = async (req, res) => {};
