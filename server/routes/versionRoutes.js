const express = require("express");

const {
  createVersion,
  uploadPaperFile,
  getVersionsByPaper,
} = require("../controllers/versionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

// Public
router.get(
  "/paper/:paperId",
  getVersionsByPaper
);

// Protected
router.post(
  "/:paperId",
  protect,
  createVersion
);

router.post(
  "/upload/:versionId",
  protect,
  upload.single("paper"),
  uploadPaperFile
);

module.exports = router;