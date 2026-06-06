const express = require("express");

const {
  createPaper,
  getMyPapers,
  getPaperById,
} = require("../controllers/paperController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPaper);
router.get("/my", protect, getMyPapers);
router.get("/:id", protect, getPaperById);

module.exports = router;