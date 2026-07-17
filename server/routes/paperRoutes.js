const express = require("express");

const {
  createPaper,
  getMyPapers,
  getPaperById,
  getAllPapers,
} = require("../controllers/paperController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getAllPapers);

// Protected
router.post("/", protect, createPaper);
router.get("/my", protect, getMyPapers);

// Public
router.get("/:id", getPaperById);

module.exports = router;