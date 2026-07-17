const Paper = require("../models/Paper");

const getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(papers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createPaper = async (req, res) => {
  try {
    const { title, abstract, keywords, authors } = req.body;

    const paper = await Paper.create({
      title,
      abstract,
      keywords,
      authors,
      owner: req.user._id,
    });

    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyPapers = async (req, res) => {
  try {
    const papers = await Paper.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllPapers,
  createPaper,
  getMyPapers,
  getPaperById,
};